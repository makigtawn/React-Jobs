import { useState } from "react";
import JobDescriptionEditor from "./editor/JobDescriptionEditor";
import Button from "./Button";

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

const EMPTY_JOB = {
  title: "",
  type: "Full-Time",
  location: "",
  description: "",
  salary: "Under $50K",
  minimumScoreThreshold: 50,
  company: {
    name: "",
    description: "",
    contactEmail: "",
    contactPhone: "",
    TIN: "", 
  },
};

const clampScore = (value) =>
  Math.min(100, Math.max(0, Number.isNaN(value) ? 0 : value));

const inputClasses =
  "w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text-primary outline-none transition-colors placeholder:text-slate-400 focus:border-accent focus:ring-1 focus:ring-accent";

const selectClasses =
  "w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent";

/** Label + input wrapper, stacked on every breakpoint so it never crowds on mobile. */
const Field = ({ label, required, hint, children }) => (
  <label className="block">
    <span className="flex items-center gap-1 text-sm font-medium text-text-primary">
      {label}
      {required && <span className="text-red-500">*</span>}
    </span>
    {hint && (
      <span className="mt-0.5 block text-xs text-slate-500 dark:text-slate-400">
        {hint}
      </span>
    )}
    <div className="mt-2">{children}</div>
  </label>
);

const Section = ({ title, children }) => (
  <div className="rounded-2xl border border-border bg-surface p-5 sm:p-7">
    <h3 className="mb-5 text-base font-semibold text-text-primary sm:text-lg">
      {title}
    </h3>
    <div className="space-y-5">{children}</div>
  </div>
);

const JobForm = ({ initialJob, onSubmit, heading, submitLabel }) => {
  const [job, setJob] = useState(() => {
    if (!initialJob) return EMPTY_JOB;
    return {
      ...EMPTY_JOB,
      ...initialJob,
      company: {
        ...EMPTY_JOB.company,
        ...(initialJob.company || {}),
      },
    };
  });

  // Track TIN error messages dynamically
  const [tinError, setTinError] = useState("");

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

    // Trigger instant validation when the user changes the TIN
    if (field === "TIN") {
      const tinRegex = /^\d{2}-\d{7}$/;
      if (value === "") {
        setTinError(""); // Optional field: Empty values are allowed
      } else if (!tinRegex.test(value)) {
        setTinError("Format must be XX-YYYYYYY (e.g., 12-3456789)");
      } else {
        setTinError(""); // Valid TIN structure
      }
    }
  };

  const submit = (e) => {
    e.preventDefault();
    
    // Prevent submitting the form if there is an unresolved validation error
    if (tinError) {
      return;
    }
    
    onSubmit(job);
  };

  return (
    <section className="relative overflow-hidden bg-page-bg px-4 py-12 text-text-primary sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
            {heading}
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Fields marked <span className="text-red-500">*</span> are required.
          </p>
        </div>

        <form id="job-form" className="space-y-6" onSubmit={submit}>
          <Section title="Role details">
            <Field label="Job title" required>
              <input
                value={job.title}
                onChange={(e) => updateField("title", e.target.value)}
                placeholder="e.g. Senior Product Designer"
                className={inputClasses}
              />
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Job type" required>
                <select
                  value={job.type}
                  onChange={(e) => updateField("type", e.target.value)}
                  className={selectClasses}
                  >
                  {jobTypes.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Salary range" required>
                <select
                  value={job.salary}
                  onChange={(e) => updateField("salary", e.target.value)}
                  className={selectClasses}
                  >
                  {salaryRanges.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Location" required>
              <input
                value={job.location}
                onChange={(e) => updateField("location", e.target.value)}
                placeholder="Remote / New York, NY"
                className={inputClasses}
              />
            </Field>
          </Section>

          <Section title="Description">
            <Field label="Job description">
              <JobDescriptionEditor
                value={job.description}
                onChange={(html) => updateField("description", html)}
              />
            </Field>
          </Section>

          <Section title="Candidate screening">
            <Field
              label="Minimum candidate score"
              hint="Only applicants scoring at or above this threshold will be shown."
              >
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={job.minimumScoreThreshold}
                  onChange={(e) =>
                    updateField(
                      "minimumScoreThreshold",
                      clampScore(parseInt(e.target.value, 10)),
                    )
                  }
                  className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-border accent-accent"
                />
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={job.minimumScoreThreshold}
                    onChange={(e) =>
                      updateField(
                        "minimumScoreThreshold",
                        clampScore(parseInt(e.target.value, 10)),
                      )
                    }
                    className="w-16 rounded-lg border border-border bg-surface px-2 py-1.5 text-center text-sm text-text-primary outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                  />
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    / 100
                  </span>
                </div>
              </div>
            </Field>
          </Section>

          <Section title="Company information">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Company name">
                <input
                  value={job.company.name}
                  onChange={(e) => updateCompanyField("name", e.target.value)}
                  placeholder="Company name"
                  className={inputClasses}
                />
              </Field>

              <Field label="Company email" required>
                <input
                  value={job.company.contactEmail}
                  onChange={(e) =>
                    updateCompanyField("contactEmail", e.target.value)
                  }
                  placeholder="email@example.com"
                  type="email"
                  className={inputClasses}
                />
              </Field>
            </div>
            
            <Field label="Company TIN number" hint="Used for employer validation. Format: 12-3456789">
              <input
                value={job.company.TIN || ""}
                onChange={(e) => updateCompanyField("TIN", e.target.value)}
                placeholder="Company TIN (Optional)"
                className={`${inputClasses} ${tinError ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
              />
              {tinError && (
                <p className="mt-1.5 text-xs font-medium text-red-500 dark:text-red-400">
                  {tinError}
                </p>
              )}
            </Field>

            <Field label="Company description">
              <textarea
                value={job.company.description}
                onChange={(e) =>
                  updateCompanyField("description", e.target.value)
                }
                rows={4}
                placeholder="A short summary of your product or team"
                className={`${inputClasses} resize-none`}
              />
            </Field>
          </Section>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={!!tinError}
              className={`w-full sm:w-auto bg-accent hover:bg-accent/70 ${tinError ? "opacity-50 cursor-not-allowed" : ""}`}
              >
              {submitLabel}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default JobForm;
