import React from "react";

const About = () => {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-20 sm:px-6 lg:px-8 lg:pb-24 lg:pt-20">
      <div className="mx-auto max-w-7xl">
          About Us  

        <div className="relative overflow-hidden rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-panel-bg)] shadow-2xl shadow-black/20 backdrop-blur-xl">

          <div className="absolute inset-0 bg-black/10 dark:bg-black/80" />
          <div className="relative grid gap-12 px-6 py-10 sm:px-10 md:py-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-14 lg:py-18">
                      <div >Bridging the Gap Between Ambition and Opportunity</div>

            <div>
              The Vision Spering started with a simple observation: the tech
              industry is moving faster than ever, but the way we hire is still
              stuck in the past. We believe that finding your next
              career-defining role or your next star employee shouldn't feel
              like a shot in the dark. Why Spering? We didn't just want to build
              another job board. We wanted to build a developer-first ecosystem.
              For Employers: We provide a streamlined interface to manage
              candidates without the clutter of traditional HR software. For
              Developers: We focus on premium roles that actually match your
              skill set, helping you bypass the "application black hole." Our
              Commitment Whether you are a startup looking for your first
              engineer or a senior developer looking for a new challenge,
              Spering is built to get you there faster. We leverage modern web
              technologies to ensure a seamless, secure, and fast experience for
              every user.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
