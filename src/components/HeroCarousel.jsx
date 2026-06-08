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

const HeroCarousel = () => {
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

  const goToSlide = (index) => {
    setCurrentSlide(index);
    pauseAndResume();
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-[#1f3238]" />
        <div className="bg-[#21b8b2]" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl items-center px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="grid w-full items-center gap-10 lg:grid-cols-2">
          <div className="max-w-2xl text-white">
            <h1 className="whitespace-pre-line text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl md:text-7xl">
              {slides[currentSlide].heading}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/80 sm:text-lg">
              {slides[currentSlide].description}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#about"
                className="inline-flex items-center justify-center rounded-full bg-[#ff515b] px-8 py-3 text-sm font-semibold text-white shadow-xl shadow-[#ff4c57]/20 transition hover:bg-[#ff6b77]">
                About Us
              </a>
              <a
                href="#quote"
                className="inline-flex items-center justify-center rounded-full border border-white bg-white px-8 py-3 text-sm font-semibold text-[#152a31] transition hover:bg-white/90">
                Get A Quote
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <img
              src={slides[currentSlide].image}
              alt={`Slide ${currentSlide + 1}`}
              className="max-h-[650px] min-w-[260px] w-full max-w-[700px] object-contain"
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-6 z-20 flex items-center gap-3">
        <button
          onClick={prevSlide}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#21b8b2] text-white transition hover:scale-105 hover:bg-white/20">
          <img src={prevIcon} alt="Previous" className="h-4 w-4" />
        </button>

        <button
          onClick={nextSlide}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#21b8b2] text-white transition hover:scale-105 hover:bg-white/20">
          <img src={nextIcon} alt="Next" className="h-4 w-4" />
        </button>
      </div>

      <div className="absolute bottom-10 right-6 z-20 flex flex-col gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold text-white transition ${
              currentSlide === index
                ? "border border-white bg-white/20"
                : "opacity-40 hover:opacity-100"
            }`}>
            {String(index + 1).padStart(2, "0")}
          </button>
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
