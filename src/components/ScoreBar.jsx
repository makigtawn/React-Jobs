const ScoreBar = ({ label, score }) => (
  <div className="flex flex-col gap-1 w-24">
    <div className="flex justify-between text-[11px] text-surface/60">
      <span>{label}</span>
      <span className="font-semibold text-white">{score}</span>
    </div>
    <div className="h-1.5 w-full bg-surface/10 rounded-full overflow-hidden">
      <div
        className="h-full bg-[#21b8b2] rounded-full"
        style={{ width: `${Math.min(Math.max(score, 0), 100)}%` }}
      />
    </div>
  </div>
);

export default ScoreBar;
