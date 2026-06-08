import { useEffect, useState } from "react";
import freelanceImg from "../assets/images/new images/freelance-img.jpg";

const jobTypes = [
  "Full-Time",
  "Part-Time",
  "Remote",
  "Paid Internship",
  "Internship",
];
const salaryRanges = [
  "Under $50K",
  "$50K - $90K",
  "$90K - $140K",
  "$140K - $170K",
  "$170K - $200K",
  "Over $200K",
];

const JobForm = ({
  initialJob = {
    title: "",
    type: "Full-Time",
    location: "",
    description: "",
    salary: "Under $50K",
    company: {
      name: "",
      description: "",
      contactEmail: "",
      contactPhone: "",
    },
  },
  onSubmit,
  heading,
  submitLabel,
}) => {
  const [job, setJob] = useState(initialJob);

  useEffect(() => {
    setJob(initialJob);
  }, [initialJob]);

  const updateField = (field, value) => {
    setJob((prev) => ({ ...prev, [field]: value }));
  };

  const updateCompanyField = (field, value) => {
    setJob((prev) => ({
      ...prev,
      company: {
        ...prev.company,
        [field]: value,
      },
    }));
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit(job);
  };

  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute right-10 top-10 h-28 w-28 rounded-full bg-[#21b8b2]/20 blur-3xl" />
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 xl:grid-cols-[1.2fr_0.8fr] xl:items-start">
          <div className="rounded-[2rem] border border-white/10 bg-[#0d1f25] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.24)] text-white">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.3em] text-[#21b8b2]">
                {heading}
              </p>
              <h2 className="mt-4 text-4xl font-black sm:text-5xl">
                Share your role with quality developers
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70">
                Fill in the details and we’ll help your listing reach top talent
                faster with a polished presentation that stands out.
              </p>
            </div>

            <form className="space-y-5" onSubmit={submit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm text-white/70">Job type</span>
                  <select
                    value={job.type}
                    onChange={(e) => updateField("type", e.target.value)}
                    className="mt-2 w-full rounded-3xl border border-white/10 bg-[#11212a] px-4 py-3 text-white outline-none focus:border-[#21b8b2] focus:ring-2 focus:ring-[#21b8b2]/20">
                    {jobTypes.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="text-sm text-white/70">Salary range</span>
                  <select
                    value={job.salary}
                    onChange={(e) => updateField("salary", e.target.value)}
                    className="mt-2 w-full rounded-3xl border border-white/10 bg-[#11212a] px-4 py-3 text-white outline-none focus:border-[#21b8b2] focus:ring-2 focus:ring-[#21b8b2]/20">
                    {salaryRanges.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="block">
                <span className="text-sm text-white/70">Job title</span>
                <input
                  value={job.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  placeholder="Backend developer"
                  className="mt-2 w-full rounded-3xl border border-white/10 bg-[#11212a] px-4 py-3 text-white outline-none focus:border-[#21b8b2] focus:ring-2 focus:ring-[#21b8b2]/20"
                />
              </label>

              <label className="block">
                <span className="text-sm text-white/70">Location</span>
                <input
                  value={job.location}
                  onChange={(e) => updateField("location", e.target.value)}
                  placeholder="Remote / New York"
                  className="mt-2 w-full rounded-3xl border border-white/10 bg-[#11212a] px-4 py-3 text-white outline-none focus:border-[#21b8b2] focus:ring-2 focus:ring-[#21b8b2]/20"
                />
              </label>

              <label className="block">
                <span className="text-sm text-white/70">Job description</span>
                <textarea
                  value={job.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  rows={5}
                  placeholder="Describe the role, expectations, and culture"
                  className="mt-2 w-full rounded-3xl border border-white/10 bg-[#11212a] px-4 py-3 text-white outline-none focus:border-[#21b8b2] focus:ring-2 focus:ring-[#21b8b2]/20"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm text-white/70">Company name</span>
                  <input
                    value={job.company.name}
                    onChange={(e) => updateCompanyField("name", e.target.value)}
                    placeholder="Company name"
                    className="mt-2 w-full rounded-3xl border border-white/10 bg-[#11212a] px-4 py-3 text-white outline-none focus:border-[#21b8b2] focus:ring-2 focus:ring-[#21b8b2]/20"
                  />
                </label>
                <label className="block">
                  <span className="text-sm text-white/70">Company email</span>
                  <input
                    value={job.company.contactEmail}
                    onChange={(e) =>
                      updateCompanyField("contactEmail", e.target.value)
                    }
                    placeholder="email@example.com"
                    type="email"
                    className="mt-2 w-full rounded-3xl border border-white/10 bg-[#11212a] px-4 py-3 text-white outline-none focus:border-[#21b8b2] focus:ring-2 focus:ring-[#21b8b2]/20"
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-sm text-white/70">Company phone</span>
                <input
                  value={job.company.contactPhone}
                  onChange={(e) =>
                    updateCompanyField("contactPhone", e.target.value)
                  }
                  placeholder="Optional phone"
                  className="mt-2 w-full rounded-3xl border border-white/10 bg-[#11212a] px-4 py-3 text-white outline-none focus:border-[#21b8b2] focus:ring-2 focus:ring-[#21b8b2]/20"
                />
              </label>

              <label className="block">
                <span className="text-sm text-white/70">
                  Company description
                </span>
                <textarea
                  value={job.company.description}
                  onChange={(e) =>
                    updateCompanyField("description", e.target.value)
                  }
                  rows={4}
                  placeholder="A short summary of your product or team"
                  className="mt-2 w-full rounded-3xl border border-white/10 bg-[#11212a] px-4 py-3 text-white outline-none focus:border-[#21b8b2] focus:ring-2 focus:ring-[#21b8b2]/20"
                />
              </label>

              <button
                type="submit"
                className="w-full rounded-3xl bg-[#21b8b2] px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-[#1aa69f]">
                {submitLabel}
              </button>
            </form>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl text-white">
              <h3 className="text-2xl font-bold">Why this form works</h3>
              <p className="mt-4 text-sm leading-7 text-white/70">
                The new UI helps recruiters and hiring managers quickly scan the
                job outline, and candidates immediately understand the role,
                pay, and company fit.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-white/80">
                <li>• Clean fields for fast posting</li>
                <li>• Highlighted salary and role details</li>
                <li>• Company info grouped for trust</li>
              </ul>
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#0c2028]">
              <img
                src={freelanceImg}
                alt="Freelance illustration"
                className="h-full w-full object-cover"
              />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default JobForm;
