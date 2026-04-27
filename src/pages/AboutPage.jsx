import React from "react";
import TeamCarousel from "../components/TeamCarousel";

const About = () => {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-20 sm:px-6 lg:px-8 lg:pb-24 lg:pt-20">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold mb-6 text-center">About Us</h1>
        <div className="relative overflow-hidden rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-panel-bg)] shadow-2xl shadow-black/20 backdrop-blur-xl mb-12">
          <div className="absolute inset-0 bg-black/10 dark:bg-black/80" />
          <div className="relative grid gap-12 px-6 py-10 sm:px-10 md:py-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-14 lg:py-18">
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                Bridging the Gap Between Ambition and Opportunity
              </h2>
              <p className="mb-4">
                The Vision Spering started with a simple observation: the tech
                industry is moving faster than ever, but the way we hire is
                still stuck in the past. We believe that finding your next
                career-defining role or your next star employee shouldn't feel
                like a shot in the dark.
              </p>
              <p className="mb-4">
                <span className="font-semibold">Why Spering?</span> We didn't
                just want to build another job board. We wanted to build a
                developer-first ecosystem.
              </p>
              <ul className="list-disc ml-6 mb-4">
                <li>
                  <span className="font-semibold">For Employers:</span> We
                  provide a streamlined interface to manage candidates without
                  the clutter of traditional HR software.
                </li>
                <li>
                  <span className="font-semibold">For Developers:</span> We
                  focus on premium roles that actually match your skill set,
                  helping you bypass the "application black hole."
                </li>
              </ul>
              <p>
                <span className="font-semibold">Our Commitment:</span> Whether
                you are a startup looking for your first engineer or a senior
                developer looking for a new challenge, Spering is built to get
                you there faster. We leverage modern web technologies to ensure
                a seamless, secure, and fast experience for every user.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-bold mb-2">Our Story</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Spering was founded by a group of passionate technologists who
                saw the need for a better way to connect talent and opportunity.
                Our journey began in a small co-working space, fueled by coffee
                and big dreams. Today, we are proud to help thousands of
                developers and companies find their perfect match.
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-6">Meet Our Team</h2>
        <TeamCarousel />
      </div>
    </section>
  );
};

export default About;
