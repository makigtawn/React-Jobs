const LeaderboardSidebar = ({ topCandidates }) => {
  return (
    <aside className="rounded-2xl border border-surface/10 bg-[#0d1f25] p-5 shadow-xl self-start w-full">
      <h2 className="text-lg font-bold tracking-tight text-surface/90">
        Top 10 Leaderboard
      </h2>
      <p className="text-xs text-surface/40 mt-0.5 mb-4">
        Highest ranking profiles
      </p>
      <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
        {topCandidates.length === 0 ? (
          <p className="text-sm text-surface/40 py-4 text-center">
            No candidates indexed yet.
          </p>
        ) : (
          topCandidates.slice(0, 10).map((candidate, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-3 rounded-xl border border-surface/5 bg-surface/[0.02] p-3.5 hover:border-surface/10 hover:bg-surface/[0.04] transition-all">
              <div className="min-w-0">
                <p className="font-semibold text-sm text-surfacetruncate">
                  {candidate.candidateName}
                </p>
                <p className="text-[11px] text-surface/40 mt-0.5">
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
  );
};

export default LeaderboardSidebar;
