import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sliderImage from "../assets/images/new-images/undraw.svg";
import Button from "./Button";

const slides = [
  // {
  //
  //   id: 1,
  //   heading: "You Can\nHire Faster\n",
  //   description: "Go from open role to perfect hire with in hours, not weeks.",
  //   image: sliderImage,
  // },
  {
    id: 1,
    heading: "Rank developers automatically",
    description: " from resumes, skills, and code quality.",
    image: sliderImage,
  },
  {
    id: 2,
    heading: "Find Skilled\nTalent Faster\nToday",
    description:
      "Connect with experienced professionals who are ready to help your team move with confidence.",
    image: sliderImage,
  },
  {
    id: 3,
    heading: "Post Work\nAnd Meet Great\nPeople",
    description:
      "Share your project, compare strong candidates, and start the right conversation in less time.",
    image: sliderImage,
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const pauseAndResume = () => {
    setIsAutoPlay(false);

    setTimeout(() => {
      setIsAutoPlay(true);
    }, 3000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    pauseAndResume();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    pauseAndResume();
  };

  return (
    <section className="bg-page-bg dark:bg-page-pg relative overflow-hidden min-h-screen flex flex-col justify-center lg:-mt-20 ">
      <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2">
        <div />
        <div
          className="hidden lg:block  dark:bg-accent transition-transform
          duration-300"
        />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 py-12 pt-24 sm:px-6 md:py-16 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 gap-10 items-center lg:grid-cols-2">
          <div className="text-center text-text-primary lg:text-left z-10">
            <h1 className="whitespace-pre-line text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {slides[currentSlide].heading}
            </h1>
            <p className="mt-4 mx-auto lg:mx-0 max-w-md text-sm leading-relaxed sm:text-base md:mt-6 md:text-lg">
              {slides[currentSlide].description}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                to="/add-job"
                className="inline-flex items-center justify-center rounded-full bg-accent border-border dark:bg-accent/80 px-8 py-3 text-sm font-semibold text-text-primary transition hover:bg-accent/60">
                Upload Jobs
              </Link>
              <Link
                to="/jobs"
                className="inline-flex items-center justify-center rounded-full border border-border dark:border-white/20 px-8 py-3 text-sm font-semibold text-text-primary transition bg-surface/20 hover:bg-surface/40">
                Compare Market Offers
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-center z-10">
            <img
              src={slides[currentSlide].image}
              alt={`Slide ${currentSlide + 1}`}
              className="h-auto max-h-[300px] w-auto object-contain sm:max-h-[450px] lg:max-h-[550px]"
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 z-20 flex justify-center gap-2.5 lg:left-77 lg:translate-x-0 lg:bottom-30 md:bottom-1 ">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`inline-block h-2.5 rounded-full transition-all duration-200 ${
              idx === currentSlide ? "w-8 bg-accent" : "w-2.5 bg-surface"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
