const ScoreBar = ({ label, score }) => (
  <div className="flex flex-col gap-1 w-24">
    <div className="flex justify-between text-[11px] text-text-secondary">
      <span>{label}</span>
      <span className="font-semibold text-text-secondary">{score}</span>
    </div>
    <div className="h-1.5 w-full bg-white border border-border rounded-full overflow-hidden">
      <div
        className="h-full bg-accent/50 dark:bg-accent rounded-full"
        style={{ width: `${Math.min(Math.max(score, 0), 100)}%` }}
      />
    </div>
  </div>
);

export default ScoreBar;
