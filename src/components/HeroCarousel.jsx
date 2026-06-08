import { useEffect, useState } from "react";

import nextIcon from "../assets/images/new images/next.png";
import prevIcon from "../assets/images/new images/prev.png";
import sliderImage from "../assets/images/new images/slider-img.png";

const slides = [
  {
    id: 1,
    heading: "You Can\nHire Freelancer\nHere",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page",
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
    <section
      className="relative left-1/2 flex min-h-screen w-screen -translate-x-1/2 items-center overflow-hidden bg-cover bg-center transition-all duration-500"
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(0,0,0,0.55),
            rgba(0,0,0,0.55)
          ),
          url(${slides[currentSlide].image})
        `,
      }}>
      {/* Controls */}
      <div className="absolute bottom-10 left-[8%] z-50 flex items-center gap-3">
        <button
          onClick={prevSlide}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-500 transition hover:scale-105 hover:bg-red-500">
          <img src={prevIcon} alt="Previous" className="h-4 w-4" />
        </button>

        <button
          onClick={nextSlide}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-500 transition hover:scale-105 hover:bg-red-500">
          <img src={nextIcon} alt="Next" className="h-4 w-4" />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-10 right-6 z-50 flex flex-col gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold text-white transition ${
              currentSlide === index
                ? "border border-white bg-white/10"
                : "opacity-40 hover:opacity-100"
            }`}>
            {String(index + 1).padStart(2, "0")}
          </button>
        ))}
      </div>

      {/* Slides */}
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              currentSlide === index ? "z-10 opacity-100" : "z-0 opacity-0"
            }`}>
            <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-between px-6 py-20 md:flex-row md:px-12">
              {/* Left Content */}
              <div className="max-w-xl">
                <h1 className="mb-6 whitespace-pre-line text-4xl font-bold uppercase leading-tight text-white md:text-6xl">
                  {slide.heading}
                </h1>

                <p className="mb-10 text-base leading-relaxed text-white/90 md:text-lg">
                  {slide.description}
                </p>

                <div className="flex flex-wrap gap-4">
                  <a
                    href="#about"
                    className="w-40 border border-red-500 bg-red-500 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-transparent hover:text-red-500">
                    About Us
                  </a>

                  <a
                    href="#quote"
                    className="w-40 border border-white bg-white px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-transparent hover:text-white">
                    Get A Quote
                  </a>
                </div>
              </div>

              {/* Right Image */}
              <div className="mt-12 w-full max-w-md md:mt-0">
                <img
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  className="w-full object-contain"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
