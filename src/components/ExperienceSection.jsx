import { Link } from "react-router-dom";
import experienceImg from "../assets/images/new images/experience-img.jpg";

const features = [
  {
    title: "AI-Powered Ranking",
    desc: "Surfaces top developers instantly by code quality and technical depth.",
  },
  {
    title: "Polished Interface",
    desc: "Distraction-free layout built to establish immediate professional trust.",
  },
  {
    title: "Effortless Efficiency",
    desc: "Saves hours of manual review, focus only on your best-matched candidates.",
  },
];

const ExperienceSection = () => {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
      {/* Background glows */}
    
      <div className="pointer-events-none absolute left-0 top-0 h-40 w-40 rounded-full bg-[#21b8b2]/20 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-48 w-48 rounded-full bg-[#ff515b]/20 blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
        
          {/* left card */}

          <div className="relative rounded-[2rem] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.2)]">
            <img
              src={experienceImg}
              alt="Experienced freelancer"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#112027]/90 via-transparent to-transparent" />

            <div className="absolute left-6 right-6 bottom-6 rounded-[1.5rem] border border-white/10 bg-white/10 p-6 backdrop-blur-xl text-white">
              <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                Spering Gallery
              </p>
              <h3 className="mt-2 text-2xl font-bold">Top freelance talent</h3>
              <p className="mt-2 text-sm leading-6 text-white/70">
                AI-ranked developer profiles. No resume pile, just your next
                best hire.
              </p>


              <div className="mt-4 flex gap-4 border-t border-white/10 pt-4">
                <div className="text-center">
                  <p className="text-lg font-bold text-white">2.5k+</p>
                  <p className="text-[10px] uppercase tracking-widest text-white/50">
                    Trusted teams
                  </p>
                </div>
                <div className="w-px bg-white/10" />
                <div className="text-center">
                  <p className="te   xt-lg font-bold text-white">7.8k+</p>
                  <p className="text-[10px] uppercase tracking-widest text-white/50">
                    Projects delivered
                  </p>
                </div>
                <div className="w-px bg-white/10" />
                <div className="text-center">
                  <p className="text-lg font-bold text-[#21b8b2]">96%</p>
                  <p className="text-[10px] uppercase tracking-widest text-white/50">
                    Top matches
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* right Card */}
          <div className="rounded-[2rem] border border-white/10 bg-[#0d1f25] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.28)] text-white">
            <div className="max-w-xl">
              <h2 className=" text-[#21b8b2] mt-5 text-4xl font-black tracking-tight sm:text-5xl">
                Built for speed and precision
              </h2>

              <p className="mt-5 text-base leading-8 text-white/70 sm:text-lg">
                Spering's AI automatically ranks developers by skill and code
                quality, so hiring teams only interview the best candidates.
              </p>

              <div className="mt-7 flex flex-col gap-3">
                {features.map((f) => (
                  <div
                    key={f.title}
                    className="flex items-start gap-4 border-l-[3px] border-[#21b8b2] rounded-r-xl bg-white/5 p-3">
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {f.title}
                      </p>
                      <p className="mt-0.5 text-xs leading-5 text-white/55">
                        {f.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
