import { useEffect, useMemo, useState } from "react";
import { apiRequest } from "../services/api";
import LeaderboardSidebar from "../components/LeaderBoardSidebar";
import DashboardHeader from "../components/DashboardHeader";
import DashboardFilters from "../components/DashboardFilters";
import ApplicationsTable from "../components/ApplicationsTable";
import EvaluationModal from "../components/EvaluationModal";

const EmployerDashboardPage = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState("");
  const [applications, setApplications] = useState([]);
  const [topCandidates, setTopCandidates] = useState([]);
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("highest");
  const [search, setSearch] = useState("");
  const [selectedReasoning, setSelectedReasoning] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const handleInjectTestData = () => {
    if (jobs.length === 0) {
      setJobs([{ id: "dummy-id", title: "Backend Developer (Demo Mode)" }]);
    }
    setSelectedJobId("dummy-id");

    const mockApplications = [
      {
        id: "mock-1",
        candidate_name: "Melat Tesfaye",
        candidate_email: "melat@example.com",
        skills_score: 95,
        experience_score: 88,
        github_score: 92,
        final_score: 93,
        status: "Pending",
        ai_reasoning:
          "Excellent matching technical profile. Extensive experience building production-ready UIs with React, Next.js, and Tailwind CSS.",
        github_reasoning:
          "High code quality across repositories. Active development stream with highly detailed documentation.",
      },
      {
        id: "mock-2",
        candidate_name: "John Doe",
        candidate_email: "john@dev.com",
        skills_score: 74,
        experience_score: 80,
        github_score: 65,
        final_score: 71,
        status: "Accepted",
        ai_reasoning:
          "Solid foundational knowledge in core engineering paradigms, but lacks deeper complexity in framework execution.",
        github_reasoning:
          "Basic repository layouts present. Commits are bundled in single blocks.",
      },
      {
        id: "mock-3",
        candidate_name: "Yonas Alemu",
        candidate_email: "yonas@example.com",
        skills_score: 89,
        experience_score: 90,
        github_score: 85,
        final_score: 88,
        status: "Pending",
        ai_reasoning:
          "Strong background in Node.js backend systems and API design. Clean MVC structuring.",
        github_reasoning:
          "Consistently pushes well-documented backend microservices tests.",
      },
      {
        id: "mock-4",
        candidate_name: "Sarah Jenkins",
        candidate_email: "sarah.j@tech.io",
        skills_score: 91,
        experience_score: 85,
        github_score: 88,
        final_score: 88,
        status: "Accepted",
        ai_reasoning:
          "Exceptional frontend optimization skills. Great understanding of browser rendering paths.",
        github_reasoning:
          "Impeccable commit history and highly organized modular CSS structure.",
      },
      {
        id: "mock-5",
        candidate_name: "Michael Chang",
        candidate_email: "m.chang@dev.net",
        skills_score: 82,
        experience_score: 78,
        github_score: 80,
        final_score: 80,
        status: "Rejected",
        ai_reasoning:
          "Good intermediate skills but failed to handle complex state management edge cases.",
        github_reasoning:
          "Active profile but many repositories are incomplete or forks.",
      },
      {
        id: "mock-6",
        candidate_name: "Fatima Omar",
        candidate_email: "fatima@domain.com",
        skills_score: 96,
        experience_score: 94,
        github_score: 95,
        final_score: 95,
        status: "Pending",
        ai_reasoning:
          "Top tier fullstack engineer. Expert level proficiency in cloud deployments and PostgreSQL tuning.",
        github_reasoning:
          "Maintains several highly popular open source utility packages.",
      },
      {
        id: "mock-7",
        candidate_name: "David Smith",
        candidate_email: "david.s@design.com",
        skills_score: 68,
        experience_score: 72,
        github_score: 60,
        final_score: 67,
        status: "Pending",
        ai_reasoning:
          "Needs improvement in modern framework paradigms. Relies heavily on legacy code patterns.",
        github_reasoning: "Low activity with single-commit project uploads.",
      },
      {
        id: "mock-8",
        candidate_name: "Elena Rostova",
        candidate_email: "elena@code.org",
        skills_score: 88,
        experience_score: 82,
        github_score: 84,
        final_score: 85,
        status: "Accepted",
        ai_reasoning:
          "Solid type-safety practices with TypeScript. Clean interface definitions.",
        github_reasoning:
          "Strong automated test coverage built into workflows.",
      },
      {
        id: "mock-9",
        candidate_name: "Abebe Kebede",
        candidate_email: "abebe@company.et",
        skills_score: 85,
        experience_score: 87,
        github_score: 80,
        final_score: 84,
        status: "Pending",
        ai_reasoning:
          "Proficient in Docker and orchestration tools. Excellent continuous integration setup skills.",
        github_reasoning:
          "Clear pipeline configurations found across primary repos.",
      },
      {
        id: "mock-10",
        candidate_name: "Chloe Dupont",
        candidate_email: "chloe@web.fr",
        skills_score: 79,
        experience_score: 81,
        github_score: 75,
        final_score: 78,
        status: "Rejected",
        ai_reasoning:
          "Decent styling competencies but struggles with asynchronous data fetching logic.",
        github_reasoning:
          "Mainly personal portfolio sites with limited logical complexity.",
      },
      {
        id: "mock-11",
        candidate_name: "Carlos Mendez",
        candidate_email: "carlos@tech.es",
        skills_score: 93,
        experience_score: 89,
        github_score: 91,
        final_score: 91,
        status: "Accepted",
        ai_reasoning:
          "Advanced backend system design. Seamlessly implements Redis caching layers.",
        github_reasoning:
          "Excellent tracking of feature requests via issues and clean PR closures.",
      },
      {
        id: "mock-12",
        candidate_name: "Amara Diallo",
        candidate_email: "amara@dev.co",
        skills_score: 90,
        experience_score: 92,
        github_score: 89,
        final_score: 90,
        status: "Pending",
        ai_reasoning:
          "Outstanding team leadership potential. Highly secure authorization workflows implemented.",
        github_reasoning:
          "Highly collaborative profile with massive contribution history.",
      },
      {
        id: "mock-13",
        candidate_name: "Liam Wilson",
        candidate_email: "liam@studio.net",
        skills_score: 72,
        experience_score: 70,
        github_score: 68,
        final_score: 70,
        status: "Pending",
        ai_reasoning:
          "Requires mentoring on data structures. Good semantic HTML foundations.",
        github_reasoning:
          "Standard boot-camp style repos without custom expansion.",
      },
    ];

    setApplications(mockApplications);

    const mappedLeaderboard = mockApplications
      .map((app) => ({
        candidateName: app.candidate_name,
        finalScore: app.final_score,
        status: app.status,
      }))
      .sort((a, b) => b.finalScore - a.finalScore);

    setTopCandidates(mappedLeaderboard);
    setLoading(false);
  };

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await apiRequest("/api/jobs/mine");
        setJobs(data.jobs || []);

        if (!data.jobs || data.jobs.length === 0) {
          setJobs([{ id: "dummy-id", title: "Backend Developer (Demo Mode)" }]);
          setSelectedJobId("dummy-id");
        } else {
          setSelectedJobId(data.jobs[0]?.id || "");
        }
      } catch (error) {
        setJobs([{ id: "dummy-id", title: " Backend Developer (Demo Mode)" }]);
        setSelectedJobId("dummy-id");
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  useEffect(() => {
    if (!selectedJobId || selectedJobId === "dummy-id") return;

    const loadDashboard = async () => {
      setLoading(true);
      setErrorMsg("");
      try {
        const params = new URLSearchParams({
          status,
          sort,
          ...(search ? { search } : {}),
        });
        const [applicationData, topData] = await Promise.all([
          apiRequest(`/api/jobs/${selectedJobId}/applications?${params}`),
          apiRequest(`/api/jobs/${selectedJobId}/top-candidates`),
        ]);
        setApplications(applicationData.applications || []);
        setTopCandidates(topData || []);
      } catch (error) {
        setErrorMsg(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [selectedJobId, status, sort, search]);

  const selectedJob = useMemo(
    () => jobs.find((job) => job.id === selectedJobId),
    [jobs, selectedJobId],
  );
  const filteredApplications = useMemo(() => {
    if (!search.trim()) return applications;

    return applications.filter((app) =>
      app.candidate_name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [applications, search]);

  return (
    <section className="min-h-screen bg-page-bg dark:bg-page-bg px-4 py-12 text-text-primary md:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <DashboardHeader
          jobs={jobs}
          selectedJobId={selectedJobId}
          setSelectedJobId={setSelectedJobId}
          onInjectClick={handleInjectTestData}
        />

        {errorMsg && (
          <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
            {errorMsg}
          </div>
        )}

        {selectedJob && (
          <>
            <DashboardFilters
              search={search}
              setSearch={setSearch}
              sort={sort}
              setSort={setSort}
              status={status}
              setStatus={setStatus}
            />

            <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px]">
              <ApplicationsTable
                selectedJob={selectedJob}
                loading={loading}
                applications={filteredApplications}
                onViewReport={setSelectedReasoning}
              />

              <LeaderboardSidebar topCandidates={topCandidates} />
            </div>
          </>
        )}
      </div>

      <EvaluationModal
        report={selectedReasoning}
        onClose={() => setSelectedReasoning(null)}
      />
    </section>
  );
};

export default EmployerDashboardPage;
