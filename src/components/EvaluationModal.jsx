import Button from "./Button";

const EvaluationModal = ({ report, onClose }) => {
  if (!report) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center dark:bg-black/80 bg-page-bg/10 px-4 backdrop-blur-sm">
      <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto text-text-primary rounded-2xl border border-border/20 bg-surface dark:bg-[#0d1f25] p-6 shadow-2xl">
        <div className="flex items-start justify-between border-b border-border pb-4">
          <div>
            <h2 className="text-2xl font-black ">{report.candidate_name}</h2>
            <p className="text-sm mt-1 text-text-secondary ">
              Overall Evaluation Rating:{" "}
              <span className="text-accent font-bold">
                {report.final_score}/100
              </span>
            </p>
          </div>
          <Button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-border bg-surface-muted text-xs font-bold hover:bg-surface/10 transition"
            style={{ padding: "8px 16px" }}>
            Close Report
          </Button>
        </div>

        <div className="space-y-6 mt-6">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-accent">
              Resume Analysis Insights
            </h3>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed bg-surface-strong border border-border p-4 rounded-xl">
              {report.ai_reasoning}
            </p>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-accent">
              GitHub Performance Assessment
            </h3>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed  bg-surface-strong border border-border p-4 rounded-xl">
              {report.github_reasoning}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationModal;
