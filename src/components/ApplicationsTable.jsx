import Button from "./Button";
import ScoreBar from "./ScoreBar";

const ApplicationsTable = ({
  selectedJob,
  loading,
  applications,
  onViewReport,
}) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-border dark:border-white/20 shadow-xl ">
      <div className="flex items-center justify-between border-border bg-surface-muted px-6 py-5">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-accent">
            {selectedJob.title}
          </h2>
          <p className="mt-1 text-xs text-text-secondary">
            Required Passing Threshold:{" "}
            <span className="text-text-primary font-medium">
              {selectedJob.minimum_score_threshold ?? 50}%
            </span>
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex min-h-[350px] items-center justify-center">
        </div>
      ) : applications.length === 0 ? (
        <div className="flex min-h-[250px] items-center justify-center px-4 py-8">
          <p className="text-sm text-text-secondary text-center">
            No applications. Click "Inject Test Data" button above to populate
            layout!
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-text-primary border-collapse">
            <thead>
              <tr className="border-b border-border bg-surface-muted/10 text-xs font-semibold uppercase tracking-wider">
                <th className="px-6 py-4">Candidate Information</th>
                <th className="px-6 py-4">AI Score Metrics Breakdown</th>
                <th className="px-6 py-4 text-center">Match</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-strong">
              {applications.map((application) => (
                <tr
                  key={application.id}
                  className="hover:bg-surface/[0.02] transition-colors group">
                  <td className="px-6 py-5">
                    <div className="font-bold text-text-primary group-hover:text-accent transition-colors">
                      {application.candidate_name}
                    </div>
                    <div className="text-xs mt-0.5">
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
                    <div className="inline-flex flex-col items-center justify-center h-12 w-12 rounded-xl bg-[#21b8b2]/10 border border-border">
                      <span className="text-base font-black text-accent">
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
                      className="rounded-xl border border-border bg-[#21b8b2]/5 text-xs font-bold text-[#21b8b2] hover:bg-[#21b8b2] hover:text-slate-950 transition-all duration-200"
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
