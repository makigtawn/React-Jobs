import { env } from "../config/env.js";

const githubHeaders = () => ({
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  ...(env.githubToken ? { Authorization: `Bearer ${env.githubToken}` } : {}),
});

const parseGithubUsername = (url) => {
  if (!url) return "";
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.includes("github.com")) return "";
    return parsed.pathname.split("/").filter(Boolean)[0] || "";
  } catch {
    return "";
  }
};

const getJson = async (url) => {
  const response = await fetch(url, { headers: githubHeaders() });
  if (!response.ok) return null;
  return response.json();
};

const getReadmeText = async (owner, repo) => {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/readme`,
    { headers: githubHeaders() },
  );
  if (!response.ok) return "";
  const data = await response.json();
  if (!data.content) return "";
  return Buffer.from(data.content, "base64").toString("utf8").slice(0, 2000);
};

const calculateHeuristicScore = (profile, repos) => {
  const publicRepos = repos.length;
  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const languageCount = new Set(repos.map((repo) => repo.language).filter(Boolean))
    .size;
  const recentRepos = repos.filter((repo) => {
    const pushedAt = new Date(repo.pushed_at).getTime();
    return Date.now() - pushedAt < 1000 * 60 * 60 * 24 * 365;
  }).length;
  const describedRepos = repos.filter((repo) => repo.description).length;

  const repoScore = Math.min(30, publicRepos * 3);
  const starScore = Math.min(20, totalStars * 2);
  const diversityScore = Math.min(20, languageCount * 5);
  const activityScore = Math.min(20, recentRepos * 4);
  const qualityScore = Math.min(10, describedRepos * 2);
  const profileScore = profile.bio || profile.company || profile.blog ? 5 : 0;

  return Math.min(
    100,
    Math.round(repoScore + starScore + diversityScore + activityScore + qualityScore + profileScore),
  );
};

export const analyzeGithubProfile = async (githubUrl) => {
  const username = parseGithubUsername(githubUrl);
  if (!username) {
    return {
      githubScore: 0,
      githubReasoning: "No valid GitHub profile URL was provided.",
      summary: null,
    };
  }

  const profile = await getJson(`https://api.github.com/users/${username}`);
  const repos =
    (await getJson(
      `https://api.github.com/users/${username}/repos?per_page=20&sort=pushed`,
    )) || [];

  if (!profile) {
    return {
      githubScore: 0,
      githubReasoning: "GitHub profile could not be fetched.",
      summary: null,
    };
  }

  const topRepos = repos
    .filter((repo) => !repo.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5);

  const readmes = await Promise.all(
    topRepos.slice(0, 3).map(async (repo) => ({
      name: repo.name,
      readme: await getReadmeText(username, repo.name),
    })),
  );

  const summary = {
    username,
    profile: {
      name: profile.name,
      bio: profile.bio,
      publicRepos: profile.public_repos,
      followers: profile.followers,
      createdAt: profile.created_at,
    },
    repositories: topRepos.map((repo) => ({
      name: repo.name,
      description: repo.description,
      stars: repo.stargazers_count,
      language: repo.language,
      forks: repo.forks_count,
      pushedAt: repo.pushed_at,
      topics: repo.topics || [],
    })),
    readmes,
  };

  return {
    githubScore: calculateHeuristicScore(profile, repos.filter((repo) => !repo.fork)),
    githubReasoning: `GitHub profile includes ${profile.public_repos} public repositories, ${topRepos.length} notable non-fork repositories, and ${new Set(repos.map((repo) => repo.language).filter(Boolean)).size} primary languages.`,
    summary,
  };
};
