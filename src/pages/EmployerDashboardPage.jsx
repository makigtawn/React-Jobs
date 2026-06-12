import { useEffect, useMemo, useState } from "react";
import { apiRequest } from "../services/api";
import Spinner from "../components/Spinner";

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

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await apiRequest("/api/jobs/mine");
        setJobs(data.jobs);
        setSelectedJobId(data.jobs[0]?.id || "");
      } catch (error) {
        setErrorMsg(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  useEffect(() => {
    if (!selectedJobId) return;

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
        setApplications(applicationData.applications);
        setTopCandidates(topData);
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

  return (
    <section className="min-h-screen bg-[#152a31] px-3 py-12 text-white sm:px-4 sm:py-16 md:px-6 md:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-4 sm:gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#21b8b2] sm:text-sm">
              Employer dashboard
            </p>
            <h1 className="mt-2 text-2xl font-black sm:mt-3 sm:text-3xl md:text-4xl">
              Candidate rankings
            </h1>
          </div>

          <select
            value={selectedJobId}
            onChange={(e) => setSelectedJobId(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#0d1f25] px-3 py-2 text-sm text-white outline-none focus:border-[#21b8b2] sm:px-4 sm:py-3 md:w-auto">
            {jobs.map((job) => (
              <option key={job.id} value={job.id}>
                {job.title}
              </option>
            ))}
          </select>
        </div>

        {errorMsg && (
          <div className="mt-4 rounded-xl border border-red-300/30 bg-red-500/10 p-3 text-sm text-red-100 sm:mt-6 sm:p-4">
            {errorMsg}
          </div>
        )}

        {!loading && jobs.length === 0 && (
          <div className="mt-6 rounded-2xl border border-white/10 bg-[#0d1f25] p-4 text-sm sm:mt-8 sm:p-8">
            Create a job post to start receiving ranked applicants.
          </div>
        )}

        {selectedJob && (
          <>
            <div className="mt-6 grid gap-2 sm:gap-3 sm:mt-8 md:grid-cols-4">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search candidate"
                className="rounded-xl border border-white/10 bg-[#0d1f25] px-3 py-2 text-sm text-white outline-none focus:border-[#21b8b2] sm:px-4 sm:py-3 md:col-span-2"
              />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-xl border border-white/10 bg-[#0d1f25] px-3 py-2 text-sm text-white outline-none focus:border-[#21b8b2] sm:px-4 sm:py-3">
                <option value="highest">Highest score</option>
                <option value="lowest">Lowest score</option>
              </select>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="rounded-xl border border-white/10 bg-[#0d1f25] px-3 py-2 text-sm text-white outline-none focus:border-[#21b8b2] sm:px-4 sm:py-3">
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-6 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px]">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d1f25]">
                <div className="border-b border-white/10 px-3 py-3 sm:px-5 sm:py-4">
                  <h2 className="text-lg font-bold sm:text-xl">
                    {selectedJob.title}
                  </h2>
                  <p className="mt-1 text-xs text-white/60 sm:text-sm">
                    Minimum score: {selectedJob.minimum_score_threshold ?? 0}
                  </p>
                </div>

                {loading ? (
                  <div className="flex min-h-64 items-center justify-center">
                    <Spinner loading={loading} />
                  </div>
                ) : applications.length === 0 ? (
                  <div className="flex min-h-48 items-center justify-center px-4 py-8">
                    <p className="text-center text-sm text-white/60">
                      No applications yet for this job.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-xs sm:text-sm">
                      <thead className="bg-white/5 text-white/70 text-xs sticky top-0">
                        <tr>
                          <th className="px-3 py-2 font-semibold sm:px-5 sm:py-3 whitespace-nowrap">
                            Candidate
                          </th>
                          <th className="px-2 py-2 font-semibold sm:px-5 sm:py-3 whitespace-nowrap">
                            Skills
                          </th>
                          <th className="px-2 py-2 font-semibold sm:px-5 sm:py-3 whitespace-nowrap">
                            Exp.
                          </th>
                          <th className="px-2 py-2 font-semibold sm:px-5 sm:py-3 whitespace-nowrap">
                            GitHub
                          </th>
                          <th className="px-2 py-2 font-semibold sm:px-5 sm:py-3 whitespace-nowrap">
                            Final
                          </th>
                          <th className="px-2 py-2 font-semibold sm:px-5 sm:py-3 whitespace-nowrap">
                            Status
                          </th>
                          <th className="px-2 py-2 font-semibold sm:px-5 sm:py-3 whitespace-nowrap">
                            View
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {applications.map((application) => (
                          <tr
                            key={application.id}
                            className="border-t border-white/10 hover:bg-white/5 transition">
                            <td className="px-3 py-2 sm:px-5 sm:py-4">
                              <div className="font-semibold text-xs sm:text-sm">
                                {application.candidate_name}
                              </div>
                              <div className="text-xs text-white/55 truncate">
                                {application.candidate_email}
                              </div>
                            </td>
                            <td className="px-2 py-2 sm:px-5 sm:py-4 text-center font-medium text-xs sm:text-sm">
                              {application.skills_score}
                            </td>
                            <td className="px-2 py-2 sm:px-5 sm:py-4 text-center font-medium text-xs sm:text-sm">
                              {application.experience_score}
                            </td>
                            <td className="px-2 py-2 sm:px-5 sm:py-4 text-center font-medium text-xs sm:text-sm">
                              {application.github_score}
                            </td>
                            <td className="px-2 py-2 sm:px-5 sm:py-4 font-bold text-xs sm:text-sm text-[#21b8b2]">
                              {application.final_score}
                            </td>
                            <td className="px-2 py-2 sm:px-5 sm:py-4 text-xs sm:text-sm">
                              <span
                                className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                                  application.status === "Accepted"
                                    ? "bg-green-500/20 text-green-300"
                                    : application.status === "Rejected"
                                      ? "bg-red-500/20 text-red-300"
                                      : "bg-yellow-500/20 text-yellow-300"
                                }`}>
                                {application.status}
                              </span>
                            </td>
                            <td className="px-2 py-2 sm:px-5 sm:py-4">
                              <button
                                type="button"
                                onClick={() =>
                                  setSelectedReasoning(application)
                                }
                                className="rounded-lg border border-white/10 px-2 py-1 text-xs font-semibold text-[#21b8b2] hover:bg-white/5 transition sm:px-3 sm:py-2">
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <aside className="rounded-2xl border border-white/10 bg-[#0d1f25] p-3 sm:p-5">
                <h2 className="text-lg font-bold sm:text-xl">
                  Top 10 candidates
                </h2>
                <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3 max-h-96 overflow-y-auto">
                  {topCandidates.length === 0 ? (
                    <p className="text-sm text-white/60 py-4">
                      No candidates yet.
                    </p>
                  ) : (
                    topCandidates.map((candidate, index) => (
                      <div
                        key={`${candidate.candidateName}-${index}`}
                        className="rounded-xl border border-white/10 bg-white/5 p-3 hover:bg-white/10 transition">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-semibold text-sm truncate">
                            {candidate.candidateName}
                          </p>
                          <span className="text-lg font-black text-[#21b8b2] flex-shrink-0">
                            {candidate.finalScore}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-white/60">
                          {candidate.status}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </aside>
            </div>
          </>
        )}
      </div>

      {selectedReasoning && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 px-3 py-4 sm:px-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#0d1f25] p-4 shadow-2xl sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
              <div className="min-w-0">
                <h2 className="text-xl font-black sm:text-2xl truncate">
                  {selectedReasoning.candidate_name}
                </h2>
                <p className="mt-1 text-xs text-white/60 sm:text-sm">
                  Final score: {selectedReasoning.final_score}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedReasoning(null)}
                className="w-full rounded-lg border border-white/10 px-3 py-2 text-sm font-semibold hover:bg-white/5 transition sm:w-auto">
                Close
              </button>
            </div>
            <h3 className="mt-4 text-sm font-bold text-[#21b8b2] sm:mt-6">
              Resume analysis
            </h3>
            <p className="mt-2 whitespace-pre-wrap text-xs leading-5 text-white/75 sm:text-sm sm:leading-6">
              {selectedReasoning.ai_reasoning}
            </p>
            <h3 className="mt-4 text-sm font-bold text-[#21b8b2] sm:mt-6">
              GitHub analysis
            </h3>
            <p className="mt-2 whitespace-pre-wrap text-xs leading-5 text-white/75 sm:text-sm sm:leading-6">
              {selectedReasoning.github_reasoning}
            </p>
            {selectedReasoning.rejection_reason && (
              <>
                <h3 className="mt-4 text-sm font-bold text-red-300 sm:mt-6">
                  Rejection reason
                </h3>
                <p className="mt-2 text-xs leading-5 text-white/75 sm:text-sm sm:leading-6">
                  {selectedReasoning.rejection_reason}
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default EmployerDashboardPage;
