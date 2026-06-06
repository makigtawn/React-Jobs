import { Link } from "react-router-dom";
import sliderImage from "../assets/images/new images/slider-img.png";

const HeroCarousel = () => {
  return (
    <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#0f232a]">
      <div className="mx-auto grid min-h-screen w-full max-w-none grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex min-h-screen flex-col justify-center px-6 py-14 sm:px-10 lg:px-16">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-white/80 shadow-lg shadow-black/20">
              Remote hiring made easy
            </span>

            <h1 className="mt-10 whitespace-pre-line text-5xl font-black uppercase tracking-tight text-white sm:text-6xl lg:text-7xl">
              YOU CAN
              <br />
              HIRE FREELANCER
              <br />
              HERE
            </h1>

            <p className="mt-8 max-w-xl text-base leading-8 text-white/80 sm:text-lg">
              It is a long established fact that a reader will be distracted by the readable
              content of a page.
            </p>

            <div className="mt-12 flex flex-wrap gap-4">
              <Link
                to="/about"
                className="inline-flex min-w-[160px] items-center justify-center rounded-full bg-red-500 px-8 py-4 text-sm font-semibold text-white transition hover:bg-red-400">
                About Us
              </Link>

              <Link
                to="/jobs"
                className="inline-flex min-w-[160px] items-center justify-center rounded-full border border-white bg-white px-8 py-4 text-sm font-semibold text-slate-900 transition hover:bg-white/90">
                Get A Quote
              </Link>
            </div>
          </div>
        </div>

        <div className="relative flex min-h-screen items-center justify-center bg-[#12b4aa] px-6 py-14 sm:px-10 lg:px-14">
          <img
            src={sliderImage}
            alt="Hero illustration"
            className="mx-auto max-h-[90vh] w-full max-w-[840px] object-contain"
          />

          <div className="absolute bottom-6 right-6 text-sm font-semibold uppercase tracking-[0.24em] text-white/75">
            01
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
