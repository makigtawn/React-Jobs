import React from "react";
import Card from "./Card";
import { Link } from "react-router-dom";

const HomeCards = () => {
  return (
    <section className="relative bg-[#1f3238] dark:bg-slate-950 py-14 sm:py-16 text-white min-h-screen transition-colors duration-300">
      <div className="container-xl lg:container m-auto px-4">
        <div className="mx-auto max-w-3xl text-center">

          
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Built for Hiring Managers and Employers

          </h2>
          <p className="mt-4 text-base leading-7 text-slate-200 sm:text-lg">
            Automatically rank developers based on their technical skills, background, and code quality to hire the best talent instantly.
          </p>
        </div>

        <div className="mt-10 max-w-2xl mx-auto">
          <Card bg="bg-black/40 dark:bg-slate-900/60 border border-[#21b8b2]/20 dark:border-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-md">
            <div className="flex h-full flex-col p-6">
             
              <h3 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-[1.8rem]">
                Rank developers and hire fast
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                Our system parses applicant profiles and source code to bubble up top-tier candidates instantly, saving you dozens of hours.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 text-sm">
                <div className="rounded-2xl border border-white/10 bg-white/5 dark:bg-slate-950/40 px-4 py-3">
                  <p className="text-lg font-semibold text-white">
                    Code Quality Analysis
                  </p>
                  <p className="mt-1 text-slate-300">
                    Deep insights into practical coding history.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 dark:bg-slate-950/40 px-4 py-3">
                  <p className="text-lg font-semibold text-white">
                    Instant Ranking
                  </p>
                  <p className="mt-1 text-slate-300">
                    Candidates ordered by objective skill benchmarks.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/add-job"
                  className="inline-flex items-center justify-center rounded-xl bg-[#ff4c57] px-5 py-3 text-sm font-semibold text-slate-950 transition duration-200 hover:-translate-y-0.5 shadow-lg shadow-[#21b8b2]/20">
                  Create a Posting
                </Link>
                <span className="text-sm text-slate-300">
                  Find your next key engineer in minutes
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HomeCards;
