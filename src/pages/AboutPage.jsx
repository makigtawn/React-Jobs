import React from "react";
import TeamCarousel from "../components/TeamCarousel";
import teamsImage from "../assets/images/new images/teams-img.svg";

const About = () => {
  return (
    <section className="dark:bg-slate-900/60">
      <div className="mx-auto max-w-5xl px-6 py-12">
        
        <h2 className="text-2xl text-center py-8 text-[#21b8b2] font-bold mb-4">
          ABOUT US
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto mb-12">
          
          <div className="flex justify-center w-full">
            <img
              src={teamsImage}
              alt="About"
              className="w-full max-w-xl object-contain"
            />
          </div>

          <p className="text-white dark:text-white text-center md:text-left text-base leading-relaxed">
            Spering was founded by a group of passionate innovators who saw how
            broken and time-consuming the traditional hiring process had become.
            Our journey began with a mission to eliminate the manual grind of
            sorting through endless resumes, fueled by a vision of a smarter,
            fairer job market. Today, we are proud to empower companies with
            advanced AI-powered candidate screening and automated filtering,
            instantly matching the right talent with the right opportunity while
            saving teams hundreds of hours.
          </p>
          
        </div>

        <div className="mt-8">
          <h3 className="text-4xl py-14 text-[#21b8b2] font-bold text-center">
            Meet Our Team
          </h3>
          <TeamCarousel />
        </div>

      </div>
    </section>
  );
};

export default About;
