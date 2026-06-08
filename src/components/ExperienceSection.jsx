import { Link } from "react-router-dom";
import experienceImg from "../assets/images/new images/experience-img.jpg";

const stats = [
  { label: "Trusted teams", value: "2.5k+" },
  { label: "Projects delivered", value: "4.8k+" },
  { label: "Top matches", value: "96%" },
];

const ExperienceSection = () => {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute left-0 top-0 h-40 w-40 rounded-full bg-[#21b8b2]/20 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-48 w-48 rounded-full bg-[#ff515b]/20 blur-3xl" />
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <div className="rounded-[2rem] border border-white/10 bg-[#0d1f25] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.28)] text-white">
            <div className="max-w-xl">
              <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/80">
                Experience-driven hiring
              </span>
              <h2 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl">
                Best experienced freelancer here
              </h2>
              <p className="mt-6 text-base leading-8 text-white/70 sm:text-lg">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                Create a hiring experience that feels modern, polished, and
                instantly trustworthy.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center rounded-full bg-[#ff515b] px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-[#ff4c57]/30 transition hover:bg-[#ff6b77]">
                  Read More
                </Link>
                <Link
                  to="/jobs"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/15">
                  Hire Now
                </Link>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-3xl border border-white/10 bg-white/5 p-5 text-center">
                    <p className="text-3xl font-bold text-white">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-sm uppercase tracking-[0.2em] text-white/60">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative rounded-[2rem] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.2)]">
            <img
              src={experienceImg}
              alt="Experienced freelancer"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#112027]/90 via-transparent to-transparent" />
            <div className="absolute left-6 bottom-6 rounded-[1.5rem] border border-white/10 bg-white/10 p-6 backdrop-blur-xl text-white">
              <p className="text-sm uppercase tracking-[0.3em] text-white/70">
                Spering Gallery
              </p>
              <h3 className="mt-3 text-2xl font-bold">Top freelance talent</h3>
              <p className="mt-2 text-sm text-white/70">
                Browse curated developer talent and make your next hire faster.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
