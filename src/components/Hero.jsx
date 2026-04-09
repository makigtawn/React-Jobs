import { Link } from "react-router-dom";
import { FiBriefcase, FiSearch, FiTrendingUp, FiUsers } from "react-icons/fi";

const Hero = ({
  title = "Become a React Dev",
  subtitle = "Find the React job that fits your skill set",
}) => {
  const stats = [
    { label: "Open roles", value: "2K+", icon: FiBriefcase },
    { label: "Hiring teams", value: "480+", icon: FiUsers },
    { label: "Weekly matches", value: "95%", icon: FiTrendingUp },
  ];

  const trustBadges = ["Remote-first", "Fast apply", "Curated companies"];

  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-14 sm:px-6 lg:px-8 lg:pb-24 lg:pt-20">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel-bg)] shadow-2xl shadow-black/20 backdrop-blur-xl">
          <div className="absolute inset-0 bg-black/10 dark:bg-black/30" />

          <div className="relative grid gap-12 px-6 py-10 sm:px-10 md:py-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-14 lg:py-18">
            <div className="max-w-3xl">
              <h1 className="max-w-2xl text-4xl font-black tracking-tight text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl">
                {title}
                <span className="mt-2 block text-[var(--color-text-secondary)]">
                  Build your next chapter with confidence.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--color-text-secondary)] sm:text-lg">
                {subtitle}. Discover standout frontend, full-stack, and
                product-focused roles from companies that value craftsmanship,
                flexibility, and growth.
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

              <div className="mt-8 flex flex-wrap gap-3">
                {trustBadges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm text-[var(--color-text-secondary)]">
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {stats.map(({ label, value, icon: Icon }) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-lg shadow-black/15">
                    <div className="flex items-center justify-between">
                      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-strong)] p-3 text-[var(--color-text-primary)]">
                        <Icon className="text-xl" />
                      </div>
                      <span className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                        Live
                      </span>
                    </div>
                    <div className="mt-5 text-3xl font-bold text-[var(--color-text-primary)]">
                      {value}
                    </div>
                    <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-strong)] p-5 shadow-lg shadow-black/10">
                <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                  Trusted by ambitious developers
                </p>
                <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">
                  Join a talent network built for React professionals seeking
                  meaningful work, clean teams, and high-growth environments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
