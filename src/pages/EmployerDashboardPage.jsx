import { useEffect, useMemo, useState } from "react";
import { apiRequest } from "../services/api";
import Spinner from "../components/Spinner";
import Button from "../components/Button";

const statusOptions = ["All", "Pending", "Accepted", "Rejected"];

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
      setJobs([{ id: "dummy-id", title: "React Developer (Demo Mode)" }]);
    }
    setSelectedJobId("dummy-id");

    setApplications([
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
          "Excellent matching technical profile. Extensive experience building production-ready UIs with React, Next.js, and Tailwind CSS. Demonstrates architectural understanding of efficient state layouts.",
        github_reasoning:
          "High code quality across repositories. Active development stream with highly detailed documentation, clean branching habits, and solid structural patterns.",
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
          "Solid foundational knowledge in core engineering paradigms, but lacks deeper complexity in mid-to-senior framework execution.",
        github_reasoning:
          "Basic repository layouts present. Commits are bundled in single blocks rather than distributed cleanly across feature timelines.",
      },
    ]);

    setTopCandidates([
      { candidateName: "Melat Tesfaye", finalScore: 93, status: "Pending" },
      { candidateName: "John Doe", finalScore: 71, status: "Accepted" },
    ]);

    setLoading(false);
  };

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await apiRequest("/api/jobs/mine");
        setJobs(data.jobs || []);

        if (!data.jobs || data.jobs.length === 0) {
          setJobs([{ id: "dummy-id", title: "React Developer (Demo Mode)" }]);
          setSelectedJobId("dummy-id");
        } else {
          setSelectedJobId(data.jobs[0]?.id || "");
        }
      } catch (error) {
        setJobs([{ id: "dummy-id", title: "React Developer (Demo Mode)" }]);
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

  const ScoreBar = ({ label, score }) => (
    <div className="flex flex-col gap-1 w-24">
      <div className="flex justify-between text-[11px] text-white/60">
        <span>{label}</span>
        <span className="font-semibold text-white">{score}</span>
      </div>
      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#21b8b2] rounded-full"
          style={{ width: `${Math.min(Math.max(score, 0), 100)}%` }}
        />
      </div>
    </div>
  );

  return (
    <section className="min-h-screen bg-[#152a31] dark:bg-slate-900/60 px-4 py-12 text-white md:px-8">
      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-white/10 pb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#21b8b2] font-semibold">
              Employer Dashboard
            </p>
            <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              Rankings
            </h1>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button
              type="button"
              onClick={handleInjectTestData}
              className="bg-[#21b8b2] hover:bg-green-100 text-slate-950 font-bold text-xs rounded-xl shadow-md whitespace-nowrap"
              style={{ padding: "12px 16px" }}>
              Inject Test Data
            </Button>
            <select
              value={selectedJobId}
              onChange={(e) => setSelectedJobId(e.target.value)}
              className="w-full rounded-xl border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-[#21b8b2] md:w-72 transition cursor-pointer">
              {jobs.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {errorMsg && (
          <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
            {errorMsg}
          </div>
        )}

        {selectedJob && (
          <>
            {/* Filters */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search candidate name..."
                className="rounded-xl border border-white/10 bg-[#0d1f25] px-4 py-3 text-sm text-white outline-none focus:border-[#21b8b2] md:col-span-2 placeholder:text-white/40"
              />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-xl border border-white/10 bg-[#0d1f25] px-4 py-3 text-sm text-white outline-none focus:border-[#21b8b2] transition cursor-pointer">
                <option value="highest">Highest Score</option>
                <option value="lowest">Lowest Score</option>
              </select>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="rounded-xl border border-white/10 bg-[#0d1f25] px-4 py-3 text-sm text-white outline-none focus:border-[#21b8b2] transition cursor-pointer">
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option} Status
                  </option>
                ))}
              </select>
            </div>

            {/* Main Content Layout */}
            <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px]">
              {/* Applications Table */}
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d1f25] shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-6 py-5">
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-[#21b8b2]">
                      {selectedJob.title}
                    </h2>
                    <p className="mt-1 text-xs text-white/50">
                      Required Passing Threshold:{" "}
                      <span className="text-white font-medium">
                        {selectedJob.minimum_score_threshold ?? 50}%
                      </span>
                    </p>
                  </div>
                </div>

                {loading ? (
                  <div className="flex min-h-[350px] items-center justify-center">
                    <Spinner loading={loading} />
                  </div>
                ) : applications.length === 0 ? (
                  <div className="flex min-h-[250px] items-center justify-center px-4 py-8">
                    <p className="text-sm text-white/40 text-center">
                      No applications. Click the orange "Inject Test Data"
                      button above to populate layout!
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-white/10 bg-white/[0.01] text-xs font-semibold uppercase tracking-wider text-white/40">
                          <th className="px-6 py-4">Candidate Information</th>
                          <th className="px-6 py-4">
                            AI Score Metrics Breakdown
                          </th>
                          <th className="px-6 py-4 text-center">Match</th>
                          <th className="px-6 py-4 text-center">Status</th>
                          <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {applications.map((application) => (
                          <tr
                            key={application.id}
                            className="hover:bg-white/[0.02] transition-colors group">
                            <td className="px-6 py-5">
                              <div className="font-bold text-white group-hover:text-[#21b8b2] transition-colors">
                                {application.candidate_name}
                              </div>
                              <div className="text-xs text-white/50 mt-0.5">
                                {application.candidate_email}
                              </div>
                            </td>
                            <td className="px-6 py-5">
                              <div className="flex flex-wrap gap-x-4 gap-y-2">
                                <ScoreBar
                                  label="Skills"
                                  score={application.skills_score}
                                />
                                <ScoreBar
                                  label="Exp."
                                  score={application.experience_score}
                                />
                                <ScoreBar
                                  label="GitHub"
                                  score={application.github_score}
                                />
                              </div>
                            </td>
                            <td className="px-6 py-5 text-center">
                              <div className="inline-flex flex-col items-center justify-center h-12 w-12 rounded-xl bg-[#21b8b2]/10 border border-[#21b8b2]/20">
                                <span className="text-base font-black text-[#21b8b2]">
                                  {application.final_score}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-5 text-center">
                              <span
                                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium tracking-wide ${
                                  application.status === "Accepted"
                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                    : application.status === "Rejected"
                                      ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                                      : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                }`}>
                                <span
                                  className={`h-1.5 w-1.5 rounded-full mr-1.5 ${
                                    application.status === "Accepted"
                                      ? "bg-emerald-400"
                                      : application.status === "Rejected"
                                        ? "bg-rose-400"
                                        : "bg-amber-400"
                                  }`}
                                />
                                {application.status}
                              </span>
                            </td>
                            <td className="px-6 py-5 text-right">
                              <Button
                                type="button"
                                onClick={() =>
                                  setSelectedReasoning(application)
                                }
                                className="rounded-xl border border-[#21b8b2]/30 bg-[#21b8b2]/5 text-xs font-bold text-[#21b8b2] hover:bg-[#21b8b2] hover:text-slate-950 transition-all duration-200"
                                style={{ padding: "8px 16px" }}>
                                View Report
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <aside className="rounded-2xl border border-white/10 bg-[#0d1f25] p-5 shadow-xl self-start">
                <h2 className="text-lg font-bold tracking-tight text-white/90">
                  Top 10 Leaderboard
                </h2>
                <p className="text-xs text-white/40 mt-0.5 mb-4">
                  Highest ranking profiles
                </p>
                <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                  {topCandidates.length === 0 ? (
                    <p className="text-sm text-white/40 py-4 text-center">
                      No candidates indexed yet.
                    </p>
                  ) : (
                    topCandidates.map((candidate, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3.5 hover:border-white/10 hover:bg-white/[0.04] transition-all">
                        <div className="min-w-0">
                          <p className="font-semibold text-sm text-white truncate">
                            {candidate.candidateName}
                          </p>
                          <p className="text-[11px] text-white/40 mt-0.5">
                            Status: {candidate.status}
                          </p>
                        </div>
                        <span className="text-lg font-black text-[#21b8b2] bg-[#21b8b2]/10 px-2.5 py-1 rounded-lg border border-[#21b8b2]/10">
                          {candidate.finalScore}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </aside>
            </div>
          </>
        )}
      </div>

      {/* Evaluation Details Popup Modal */}
      {selectedReasoning && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm">
          <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#0d1f25] p-6 shadow-2xl">
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="text-2xl font-black text-white">
                  {selectedReasoning.candidate_name}
                </h2>
                <p className="text-sm text-white/50 mt-1">
                  Overall Evaluation Rating:{" "}
                  <span className="text-[#21b8b2] font-bold">
                    {selectedReasoning.final_score}/100
                  </span>
                </p>
              </div>
              <Button
                type="button"
                onClick={() => setSelectedReasoning(null)}
                className="rounded-xl border border-white/10 bg-white/5 text-xs font-bold hover:bg-white/10 transition"
                style={{ padding: "8px 16px" }}>
                Close Report
              </Button>
            </div>

            <div className="space-y-6 mt-6">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#21b8b2]">
                  Resume Analysis Insights
                </h3>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-white/80 bg-white/[0.01] border border-white/5 p-4 rounded-xl">
                  {selectedReasoning.ai_reasoning}
                </p>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#21b8b2]">
                  GitHub Performance Assessment
                </h3>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-white/80 bg-white/[0.01] border border-white/5 p-4 rounded-xl">
                  {selectedReasoning.github_reasoning}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EmployerDashboardPage;
