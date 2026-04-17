import React from "react";
import { Link } from "react-router-dom";

const ViewAllJobs = () => {
  return (
    <section className="px-4 py-8 sm:py-12">
      <div className="container-xl lg:container m-auto">
        
           <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 px-6 py-10 shadow-[0_20px_80px_rgba(15,23,42,0.28)] backdrop-blur-2xl sm:px-10">

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Discover More
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Browse current jobs and find a role worth applying to.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/jobs"
                className="inline-flex min-w-[220px] items-center justify-center rounded-xl bg-white px-6 py-4 text-base font-semibold text-slate-950 shadow-lg shadow-slate-950/20 transition duration-200 hover:scale-[1.02] hover:bg-slate-100">
                View All Jobs
              </Link>
              <p className=""></p>
            </div>
       </div>
       </div>
       </div>
    </section>
  );
};

export default ViewAllJobs;
