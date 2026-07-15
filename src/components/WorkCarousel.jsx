import {
  LuFileSearch,
  LuGauge,
  LuScale,
  LuSparkles,
  LuLayers,
} from "react-icons/lu";
import { LucideCode2 } from "lucide-react";

const capabilities = [
  { icon: LuFileSearch, label: "Resume parsing" },
  { icon: LuGauge, label: "Technical skill scoring" },
  { icon: LucideCode2, label: "Code quality review" },
  { icon: LuLayers, label: "Background relevance" },
  { icon: LuScale, label: "Bias checks" },
  { icon: LuSparkles, label: "AI-Powered Explainable rankings" },
];

const WorkCarousel = () => {
  return (
    <div className="relative md:mx-10 lg:mx-20 bg-page-bg dark:bg-page-bg overflow-hidden z-10">
      <h1 className="my-20 text-xl font-semibold text-text-primary dark:text-text-primary  text-center  sm:text-2xl lg:text-3xl">
        Why choose us?
      </h1>

      <div className="mt-6 my-10 md:my-20 lg:my-50 mx-12 flex flex-wrap gap-x-6 gap-y-8">
        {capabilities.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className={`
              flex shrink-0 basis-full flex-col items-center gap-2.5 text-center text-text-primary dark:text-text-primary 
              md:basis-[calc(50%_-_12px)] md:gap-3
              lg:basis-[calc(33.333%_-_16px)] lg:gap-4
            `}>
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg
                         bg-white/5 md:h-10 md:w-10 lg:h-12 lg:w-12">
              <Icon
                className="h-10 w-10 text-accent lg:w-20 lg:h-20  md:h-5 md:w-5 lg:h-6 lg:w-6"
                strokeWidth={2}
              />
            </span>
            <span className="text-sm font-medium md:text-base lg:text-lg">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkCarousel;
