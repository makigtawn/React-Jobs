import React from "react";
import HomeCards from "../components/HomeCards";
import WorkCarousel from "../components/WorkCarousel";
import Hero from "../components/Hero";

const HomePage = () => {
  return (
    <>
      <Hero />
      <WorkCarousel />
      <HomeCards />
    </>
  );
};

export default HomePage;
