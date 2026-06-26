import React from "react";
import Card from "./Card";

const HomeCards = () => {
  const testimonials = [
    {
      quote:
        "We used to spend weeks reading hundreds of resumes. This AI engine filtered and ranked the top 5 developers for us instantly based on actual code quality. Truly a game-changer.",
      author: "Sarah Jenkins",
      role: "VP of Engineering",
      company: "TechFlow Dynamics",
      metric: "Saved 40+ hours per role",
    },
    {
      quote:
        "The objective skill benchmarking is spot on. It skipped the resume fluff and highlighted candidates with genuine technical skill. We made our core engineering hire in days.",
      author: "Marcus Chen",
      role: "Technical Recruiter",
      company: "DevScale AI",
      metric: "90% faster time-to-hire",
    },
  ];

  return (
    <section className="relative bg-[#1f3238] dark:bg-slate-950 py-16 sm:py-24 text-surface min-h-screen transition-colors duration-300">
      <div className="container-xl lg:container m-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-14 sm:mb-18">
          <span className="text-sm font-semibold tracking-wider text-[#21b8b2] uppercase">
            Proven Results
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-surface sm:text-4xl">
            Trusted by Teams Cutting Out the Screening Noise
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">
            See how forward-thinking hiring managers skip manual resume review
            entirely and jump straight to the best talent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((item, index) => (
            <Card
              key={index}
              bg="bg-black/30 dark:bg-slate-900/50 border border-surface/5 dark:border-slate-800 shadow-2xl backdrop-blur-sm flex flex-col justify-between">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <span className="text-4xl text-[#21b8b2] font-serif block mb-2">
                    “
                  </span>
                  <p className="text-slate-200 text-base leading-relaxed italic">
                    {item.quote}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-surface/10 flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h4 className="font-semibold text-surface text-base">
                      {item.author}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {item.role}, {item.company}
                    </p>
                  </div>
                  <div className="bg-[#21b8b2]/10 border border-[#21b8b2]/30 rounded-lg px-3 py-1.5 text-xs font-medium text-[#21b8b2]">
                    {item.metric}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeCards;
