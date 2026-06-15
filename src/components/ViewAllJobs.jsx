import React from "react";
import { Link } from "react-router-dom";

const ViewAllJobs = () => {
  return (
    <section className="container-xl lg:container m-auto px-4 py-8 sm:py-12">
      <Link
        to="/jobs"
        className="relative z-10 mx-auto block max-w-3xl rounded-[2rem] border border-white/15 bg-white/10 px-6 py-10 text-center shadow-[0_20px_80px_rgba(15,23,42,0.28)] backdrop-blur-2xl transition hover:bg-white/15 sm:px-10"
      >
        <h2 className="text-3xl font-bold tracking-tight text-[#21b8b2] sm:text-4xl">
          Compare Market Offers
        </h2>
      </Link>
    </section>
  );
};

export default ViewAllJobs;
