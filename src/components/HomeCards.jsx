import React from "react";
import Card from "./Card";
import { Link } from "react-router-dom";

const HomeCards = () => {
  return (
    <section className="relative py-14 sm:py-16">
      <div className="container-xl lg:container m-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center rounded-full border border-[var(--panel-border)] bg-[var(--panel-bg)]/90 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--muted-foreground)] shadow-sm backdrop-blur-sm">
            Built for both sides of the hire
          </div>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-violet-900 sm:text-4xl">
            Everything you need to connect great React talent with standout teams
          </h2>
          <p className="mt-4 text-base leading-7 text-[var(--muted-foreground)] sm:text-lg">
            Whether you are searching for your next role or growing your engineering team,
            explore a faster, clearer, and more polished path forward.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:gap-8">
          <Card bg="bg-[var(--panel-bg)]/95 border border-[var(--panel-border)] shadow-[0_20px_60px_rgba(15,23,42,0.14)]">
            <div className="flex h-full flex-col">
              <div className="mb-6 flex items-center justify-between gap-3">
                <span className="inline-flex rounded-full border border-emerald-900/15 bg-emerald-950/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-800 dark:border-emerald-300/15 dark:bg-emerald-400/10 dark:text-emerald-200">
                  For Developers
                </span>
                <span className="rounded-full border border-[var(--panel-border)] bg-black/5 px-3 py-1 text-xs font-medium text-[var(--muted-foreground)] dark:bg-white/5">
                  New roles weekly
                </span>
              </div>

              <h3 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-[1.8rem]">
                Find a React opportunity that matches your ambition
              </h3>
              <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--muted-foreground)] sm:text-base">
                Browse curated frontend and full-stack openings, compare teams quickly, and
                discover roles where your React skills can make a real impact.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl border border-[var(--panel-border)] bg-black/5 px-4 py-3 dark:bg-white/5">
                  <p className="text-lg font-semibold text-[var(--foreground)]">Remote-ready</p>
                  <p className="mt-1 text-[var(--muted-foreground)]">
                    Flexible roles from modern teams
                  </p>
                </div>
                <div className="rounded-2xl border border-[var(--panel-border)] bg-black/5 px-4 py-3 dark:bg-white/5">
                  <p className="text-lg font-semibold text-[var(--foreground)]">Curated listings</p>
                  <p className="mt-1 text-[var(--muted-foreground)]">
                    Clear, relevant React-focused jobs
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/jobs"
                  className="inline-flex items-center justify-center rounded-xl border border-[var(--panel-border-strong)] bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-[var(--background)] transition duration-200 hover:-translate-y-0.5 hover:opacity-95"
                >
                  Browse Jobs
                </Link>
                <span className="text-sm text-[var(--muted-foreground)]">
                  Explore the latest openings in seconds
                </span>
              </div>
            </div>
          </Card>

          <Card bg="bg-[color:rgba(52,48,42,0.9)] border border-[color:rgba(92,82,67,0.5)] shadow-[0_20px_60px_rgba(15,23,42,0.18)] dark:bg-[color:rgba(38,34,30,0.94)] dark:border-[color:rgba(124,112,94,0.32)]">
            <div className="flex h-full flex-col">
              <div className="mb-6 flex items-center justify-between gap-3">
                <span className="inline-flex rounded-full border border-[color:rgba(219,196,161,0.2)] bg-[color:rgba(219,196,161,0.12)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[color:rgb(245,235,214)]">
                  For Employers
                </span>
                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-[color:rgb(232,225,214)]">
                  Reach quality candidates
                </span>
              </div>

              <h3 className="text-2xl font-bold tracking-tight text-[color:rgb(250,246,239)] sm:text-[1.8rem]">
                Showcase your role and attract the right React developers faster
              </h3>
              <p className="mt-4 max-w-xl text-sm leading-7 text-[color:rgb(222,213,198)] sm:text-base">
                Post your opening with confidence, highlight your team and product, and put
                your opportunity in front of developers actively looking for their next move.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3">
                  <p className="text-lg font-semibold text-[color:rgb(250,246,239)]">
                    Faster discovery
                  </p>
                  <p className="mt-1 text-[color:rgb(222,213,198)]">
                    Get seen by React-focused talent
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3">
                  <p className="text-lg font-semibold text-[color:rgb(250,246,239)]">
                    Simple posting
                  </p>
                  <p className="mt-1 text-[color:rgb(222,213,198)]">
                    Create and publish jobs with ease
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/add-job"
                  className="inline-flex items-center justify-center rounded-xl border border-[color:rgba(245,235,214,0.22)] bg-[color:rgb(231,220,201)] px-5 py-3 text-sm font-semibold text-[color:rgb(49,43,35)] transition duration-200 hover:-translate-y-0.5 hover:bg-[color:rgb(239,230,214)]"
                >
                  Add Job
                </Link>
                <span className="text-sm text-[color:rgb(222,213,198)]">
                  Start attracting top frontend talent today
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
