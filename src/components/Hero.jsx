import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
const Hero = ({
  title = " Hire Your Next Lead Developer in Half the Time.",
  subtitle = " Stop sifting through irrelevant resumes. Access a curated pool of top-tier developers ready to scale your team",
}) => {
  const stats = [
    { label: "Hiring teams", value: "2k+" },
    { label: "Weekly matches", value: "95%" },
    { label: "post in seconds", value: "" },
  ];

  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-20 sm:px-6 lg:px-8 lg:pb-24 lg:pt-20">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel-bg)] shadow-2xl shadow-black/20 backdrop-blur-xl">
          <div className="absolute inset-0 bg-black/1 dark:bg-black/30" />

          <div className="relative grid gap-12 px-6 py-10 sm:px-10 md:py-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-14 lg:py-18">
            <div className="max-w-3xl">
              <h1 className="max-w-2xl text-4xl font-black tracking-tight text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl">
                {title}
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--color-text-secondary)] sm:text-lg">
                {subtitle}. Finding the right fit shouldn't be a full-time job.
                Our platform is designed for busy founders and hiring managers
                who value precision over volume.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/jobs"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-accent)] px-6 py-3.5 text-sm font-semibold text-[var(--color-accent-foreground)] shadow-lg shadow-black/15 transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-accent-hover)]">
                  <FiSearch className="text-base" />
                  Explore jobs
                </Link>
                <Link
                  to="/add-job"
                  className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-3.5 text-sm font-semibold text-[var(--color-text-primary)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-strong)]">
                  Post a job
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {stats.map(({ label, value }) => (
                  <div
                    key={label}
                    className=" flex justify-between items-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-lg shadow-black/15">
                    <div className="mt-5 text-3xl font-bold text-[var(--color-text-primary)]">
                      {value}
                    </div>

                    <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
