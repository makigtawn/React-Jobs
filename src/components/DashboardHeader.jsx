import Button from "./Button";

const DashboardHeader = ({
  jobs,
  selectedJobId,
  setSelectedJobId,
  onInjectClick,
}) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-white/10 pb-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-[#21b8b2] font-semibold">
          Employer Dashboard
        </p>
        <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
          Rankings
        </h1>
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto">
        <Button
          type="button"
          onClick={onInjectClick}
          className="bg-[#21b8b2] hover:bg-green-100 text-slate-950 font-bold text-xs rounded-xl shadow-md whitespace-nowrap"
          style={{ padding: "12px 16px" }}>
          Inject Test Data
        </Button>
        <select
          value={selectedJobId}
          onChange={(e) => setSelectedJobId(e.target.value)}
          className="w-full rounded-xl border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-[#21b8b2] md:w-72 transition cursor-pointer bg-transparent">
          {jobs.map((job) => (
            <option key={job.id} value={job.id} className="bg-[#0d1f25]">
              {job.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DashboardHeader;
