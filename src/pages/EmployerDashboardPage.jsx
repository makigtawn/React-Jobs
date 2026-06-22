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
    <section className="min-h-screen bg-[#152a31] dark:bg-slate-900/60 px-4 py-12 text-white md:px-8">
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
