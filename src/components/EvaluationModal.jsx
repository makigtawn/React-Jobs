import Button from "./Button";

const EvaluationModal = ({ report, onClose }) => {
  if (!report) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm">
      <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#0d1f25] p-6 shadow-2xl">
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div>
            <h2 className="text-2xl font-black text-white">{report.candidate_name}</h2>
            <p className="text-sm text-white/50 mt-1">
              Overall Evaluation Rating:{" "}
              <span className="text-[#21b8b2] font-bold">{report.final_score}/100</span>
            </p>
          </div>
          <Button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-white/5 text-xs font-bold hover:bg-white/10 transition"
            style={{ padding: "8px 16px" }}
          >
            Close Report
          </Button>
        </div>

        <div className="space-y-6 mt-6">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#21b8b2]">
              Resume Analysis Insights
            </h3>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-white/80 bg-white/[0.01] border border-white/5 p-4 rounded-xl">
              {report.ai_reasoning}
            </p>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#21b8b2]">
              GitHub Performance Assessment
            </h3>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-white/80 bg-white/[0.01] border border-white/5 p-4 rounded-xl">
              {report.github_reasoning}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationModal;
