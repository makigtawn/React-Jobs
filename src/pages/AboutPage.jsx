import React from "react";
import TeamCarousel from "../components/TeamCarousel";
import aboutImg from "../assets/images/new images/about-img.jpg";

const About = () => {
  return (
    <section className="bg-white dark:bg-slate-900/60">
      <div className="mx-auto max-w-5xl px-6 py-12 text-center">
        <div className="flex justify-center">
          <img
            src={aboutImg}
            alt="About"
            className="w-full max-w-3xl object-contain"
          />
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">ABOUT SPERING COMPANY</h2>

        <p className="max-w-3xl mx-auto text-gray-700 dark:text-white/80 mb-8">
          Spering was founded by a group of passionate technologists who saw the
          need for a better way to connect talent and opportunity. Our journey
          began in a small co-working space, fueled by coffee and big dreams.
          Today, we are proud to help thousands of developers and companies find
          their perfect match.
        </p>

        <div className="mt-8">
          <h3 className="text-2xl font-bold text-center mb-6">Meet Our Team</h3>
          <TeamCarousel />
        </div>
      </div>
    </section>
  );
};

export default About;
