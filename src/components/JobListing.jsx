import { useState } from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";


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
      className={`rich-description ${className ?? ""}`}
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
    <div className="bg-[#21b8b2] sm:p-6 dark:bg-slate-900/60 rounded-xl shadow-md relative">
      
        <div className="mb-6">
          <div className="text-black dark:text-white my-2">{job.type}</div>
          <h3 className="text-xl font-bold">{job.title}</h3>
        </div>

        <div className="mb-5">
          {showFullDescription ? (
            <RichText html={job.description} />
          ) : (
            <p className="text-sm leading-relaxed">{previewText}</p>
          )}
        </div>

        <button
          onClick={() => setShowFullDescription((prev) => !prev)}
          className="text-black dark:text-white mb-2 hover:bg-green-800/40">
          {showFullDescription ? "less" : "more"}
        </button>

        <h3 className="text-black dark:text-white mb-5">{job.salary} / year</h3>

        <div className="border border-green-800 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="text-orange-700 mb-3">
            <FaMapLocationDot className="inline text-lg mb-1 mr-1" />
            {job.location}
          </div>
          <Link
            to={`/jobs/${job.id}`}
            className="h-[36px] bg-green-900/20 hover:bg-green-800/40 text-black px-4 py-2 rounded-lg text-center text-sm">
            Read more
          </Link>
        </div>
     
    </div>
  );
};

export default JobListing;
