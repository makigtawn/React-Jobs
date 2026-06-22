import { useState, useEffect } from "react";

const statusOptions = ["All", "Pending", "Accepted", "Rejected"];

const DashboardFilters = ({
  search,
  setSearch,
  sort,
  setSort,
  status,
  setStatus,
}) => {
  const [localSearch, setLocalSearch] = useState(search);

  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(localSearch);
  };

  return (
    <div className="mt-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between bg-[#0d1f25]/40 p-4 rounded-2xl border border-white/5">
      <div className="grid gap-3 sm:grid-cols-3 flex-1 w-full">
        <form
          onSubmit={handleSearchSubmit}
          className="sm:col-span-2 flex gap-2">
          <div className="relative flex-1">
            <input
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search candidate name..."
              className="w-full rounded-xl border border-white/10 bg-[#0d1f25] pl-4 pr-10 py-2.5 text-sm text-white outline-none focus:border-[#21b8b2] placeholder:text-white/40 transition"
            />
            {localSearch && (
              <button
                type="button"
                onClick={() => {
                  setLocalSearch("");
                  setSearch("");
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs">
                ✕
              </button>
            )}
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-[#21b8b2] px-4 py-2.5 text-xs font-bold text-slate-950 hover:bg-[#1da19b] transition shadow-md active:scale-95">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-4 h-4">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.603 10.601z"
              />
            </svg>
            <span>Search</span>
          </button>
        </form>

        <div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#0d1f25] px-4 py-2.5 text-sm text-white outline-none focus:border-[#21b8b2] transition cursor-pointer">
            <option value="highest">Highest Score</option>
            <option value="lowest">Lowest Score</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 bg-[#0d1f25] p-1 rounded-xl border border-white/10 self-start lg:self-auto">
        {statusOptions.map((option) => {
          const isActive = status === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => setStatus(option)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 whitespace-nowrap ${
                isActive
                  ? "bg-[#21b8b2] text-slate-950 shadow-sm"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}>
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardFilters;
