import { useState } from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import Button from "./Button";

const stripHtml = (html) => {
  const div = document.createElement("div");
  div.innerHTML = DOMPurify.sanitize(html || "");
  return div.textContent || div.innerText || "";
};

const RichText = ({ html, className }) => {
  const clean = DOMPurify.sanitize(html || "", {
    USE_PROFILES: { html: true },
    ADD_ATTR: ["target", "rel"],
  });
  return (
    <div
      className={`rich-description leading-relaxed ${className ?? ""}`}
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
};

const JobListing = ({ job }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const plainText = stripHtml(job.description);
  const previewText =
    plainText.length > 90 ? plainText.substring(0, 90) + "…" : plainText;

  return (
    <div className="bg-white p-5 sm:p-6 md:p-8 lg:p-10 dark:bg-slate-900/60 rounded-xl shadow-md border border-neutral-200/20 dark:border-slate-800">
      
      <div className="mb-4 sm:mb-6 md:mb-8 lg:mb-10">
        <div className="text-black/80 dark:text-white/80 text-sm mb-1">{job.type}</div>
        <h3 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-black dark:text-white">{job.title}</h3>
      </div>

      <div className="mb-4 sm:mb-6 lg:mb-8">
        <div className="mb-3">
          {showFullDescription ? (
            <RichText html={job.description} className="text-sm md:text-base" />
          ) : (
            <p className="text-sm md:text-base leading-relaxed text-black dark:text-gray-200">{previewText}</p>
          )}
        </div>

        <Button
  onClick={() => setShowFullDescription((prev) => !prev)}
  className="text-black dark:text-white text-xs bg-green-800/10 hover:bg-green-800/20 rounded-md transition-colors"
  style={{ padding: '4px 8px' }} 
>
  {showFullDescription ? "less" : "more"}
</Button>
      </div>

      <h3 className="text-xl font-bold text-black dark:text-white mb-4 sm:mb-5 lg:mb-6">{job.salary} / year</h3>
      <div className="border border-green-800/30 mb-5 sm:mb-6 lg:mb-8"></div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        
        <div className="text-orange-700 font-medium">
          <FaMapLocationDot className="inline text-lg mb-1 mr-1.5" />
          {job.location}
        </div>
        
        <Link
          to={`/jobs/${job.id}`}
          className="w-full sm:w-auto md:w-44 lg:w-48 h-[44px] md:h-[42px] lg:h-[46px] flex items-center justify-center bg-green-900/20 dark:text-white hover:bg-green-800/30 text-black px-6 rounded-lg text-center text-sm md:text-base font-semibold transition-all">
          Read more
        </Link>
      </div>
     
    </div>
  );
};

export default JobListing;
