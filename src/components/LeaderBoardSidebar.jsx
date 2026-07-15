const LeaderboardSidebar = ({ topCandidates }) => {
  return (
    <aside className="rounded-2xl border border-border p-5 shadow-xl self-start w-full text-text-primary">
      <h2 className="text-lg text-accent font-bold tracking-tight ">
        Top 10 Leaderboard
      </h2>
      <p className="text-xs mt-0.5 mb-4">
        Highest ranking profiles
      </p>
      <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
        {topCandidates.length === 0 ? (
          <p className="text-sm py-4 text-center">
            No candidates indexed yet.
          </p>
        ) : (
          topCandidates.slice(0, 10).map((candidate, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface-muted p-3.5 hover:bg-surface transition-all">
              <div className="min-w-0">
                <p className="font-semibold text-sm truncate">
                  {candidate.candidateName}
                </p>
                <p className="text-[11px] text-text-secondary mt-0.5">
                  Status: {candidate.status}
                </p>
              </div>
              <span className="text-lg font-black text-accent bg-accent/10 px-2.5 py-1 rounded-lg border border-accent/10">
                {candidate.finalScore}
              </span>
            </div>
          ))
        )}
      </div>
    </aside>
  );
};

export default LeaderboardSidebar;
