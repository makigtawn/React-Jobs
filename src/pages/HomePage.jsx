import React from "react";
import HomeCards from "../components/HomeCards";
import ExperienceSection from "../components/ExperienceSection";
import JobListings from "../components/JobListings";
import ViewAllJobs from "../components/ViewAllJobs";
import HeroCarousel from "../components/HeroCarousel";

const HomePage = () => {
  return (
    <>
      <HeroCarousel />
      <HomeCards />
      <ExperienceSection />
      <JobListings isHome={true} />
      <ViewAllJobs />
    </>
  );
};

export default HomePage;
