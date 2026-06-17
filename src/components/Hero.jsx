import { useEffect, useState } from "react";

import nextIcon from "../assets/images/new images/next.png";
import prevIcon from "../assets/images/new images/prev.png";
import sliderImage from "../assets/images/new images/slider-img.png";

const slides = [
  {
    id: 1,
    heading: "You Can\nHire Freelancer\nHere",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page.",
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
    <section className="relative overflow-hidden min-h-screen flex flex-col justify-center">
      <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2-none lg:grid-cols-2">
        <div className="bg-[#1f3238] dark:bg-slate-900/60" />
        <div className="hidden lg:block bg-[#21b8b2] dark:bg-teal-700/80" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 py-12 pt-24 sm:px-6 md:py-16 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 gap-10 items-center lg:grid-cols-2">
          
          <div className="text-center lg:text-left text-white z-10">
            <h1 className="whitespace-pre-line text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {slides[currentSlide].heading}
            </h1>
            <p className="mt-4 mx-auto lg:mx-0 max-w-md text-sm leading-relaxed text-white/80 sm:text-base md:mt-6 md:text-lg">
              {slides[currentSlide].description}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <a
                href="/about"
                className="inline-flex items-center justify-center rounded-full bg-[#ff515b] px-8 py-3 text-sm font-semibold text-white shadow-xl shadow-[#ff4c57]/20 transition hover:bg-[#ff6b77]">
                About Us
              </a>
              <a
                href="/jobs"
                className="inline-flex items-center justify-center rounded-full border border-white bg-white px-8 py-3 text-sm font-semibold text-[#152a31] transition hover:bg-white/90">
                Explore Jobs
              </a>
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

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4 lg:left-8 lg:translate-x-0 lg:bottom-10">
        <button
          onClick={prevSlide}
          className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#21b8b2] text-white transition hover:scale-105 active:scale-95">
          <img src={prevIcon} alt="Previous" className="h-4 w-4" />
        </button>

        <button
          onClick={nextSlide}
          className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#21b8b2] text-white transition hover:scale-105 active:scale-95">
          <img src={nextIcon} alt="Next" className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
