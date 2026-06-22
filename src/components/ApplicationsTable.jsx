import Spinner from "./Spinner";
import Button from "./Button";
import ScoreBar from "./ScoreBar";

const ApplicationsTable = ({
  selectedJob,
  loading,
  applications,
  onViewReport,
}) => {
  return (
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
            No applications. Click "Inject Test Data" button above to populate
            layout!
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.01] text-xs font-semibold uppercase tracking-wider text-white/40">
                <th className="px-6 py-4">Candidate Information</th>
                <th className="px-6 py-4">AI Score Metrics Breakdown</th>
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
                      onClick={() => onViewReport(application)}
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
  );
};

export default ApplicationsTable;
