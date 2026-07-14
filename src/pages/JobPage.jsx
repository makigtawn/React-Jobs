// import { useLoaderData, useNavigate, Link } from "react-router-dom";
// import {
//   FaArrowLeft,
//   FaMapMarker,
//   FaEnvelope,
//   FaPhone,
//   FaBriefcase,
//   FaDollarSign,
// } from "react-icons/fa";
// import { toast } from "react-toastify";
// import DOMPurify from "dompurify";
// import Button from "../components/Button";
// import { useAuth } from "../context/useAuth";

// const RichText = ({ html, className }) => {
//   const clean = DOMPurify.sanitize(html || "", {
//     USE_PROFILES: { html: true },
//     ADD_ATTR: ["target", "rel"],
//   });

//   return (
//     <div
//       className={`prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 ${className ?? ""}`}
//       dangerouslySetInnerHTML={{ __html: clean }}
//     />
//   );
// };

// const JobPage = ({ deleteJob }) => {
//   const navigate = useNavigate();
//   const job = useLoaderData();
//   const { user, isLoading } = useAuth();

//   const onDeleteClick = (jobId) => {
//     const confirm = window.confirm("Are you sure you want to delete this job?");
//     if (!confirm) return;
//     deleteJob(jobId);
//     toast.success("Job deleted successfully");
//     navigate("/jobs");
//   };

//   const isOwner = Boolean(
//     user &&
//     (user.id === job?.employer_id ||
//       user.id === job?.employerId ||
//       user?.id === job?.employer?.id),
//   );
//   const canManageJob = !isLoading && isOwner;

//   return (
//     <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto">
//         <div className="mb-6">
//           <Link
//             to="/jobs"
//             className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-surface transition-colors">
//             <FaArrowLeft className="mr-2" /> Back to Jobs
//           </Link>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2 space-y-6">
//             <div className="bg-surfacedark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
//               <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 mb-4">
//                 <FaBriefcase className="mr-1.5" />

//                 {job.type}
//               </span>
//               <h1 className="text-3xl font-bold text-slate-900 dark:text-surface tracking-tight mb-3">
//                 {job.title}
//               </h1>
//               <div className="flex items-center text-slate-500 dark:text-slate-400">
//                 <FaMapMarker className="text-slate-400 dark:text-slate-500 mr-2 shrink-0" />
//                 <span className="text-sm">{job.location}</span>
//               </div>
//             </div>

//             <div className="bg-surfacedark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
//               <div>
//                 <h2 className="text-lg font-semibold text-slate-900 dark:text-surface mb-4">
//                   Job Description
//                 </h2>
//                 <RichText html={job.description} />
//               </div>

//               <hr className="border-slate-200 dark:border-slate-800" />

//               <div>
//                 <h2 className="text-lg font-semibold text-slate-900 dark:text-surface mb-3">
//                   Salary & Compensation
//                 </h2>
//                 <div className="inline-flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 px-4 py-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
//                   <FaDollarSign className="text-emerald-600 dark:text-emerald-400" />
//                   <span className="font-semibold text-slate-800 dark:text-slate-200">
//                     {job.salary}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="space-y-6">
//             <div className="bg-surfacedark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
//               <h2 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">
//                 Company Info
//               </h2>
//               <h3 className="text-xl font-bold text-slate-900 dark:text-surface mb-2">
//                 {job?.company?.name || "Company information unavailable"}
//               </h3>
//               <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
//                 {job?.company?.description ||
//                   "No company description provided."}
//               </p>

//               <div className="space-y-3.5 border-t border-slate-100 dark:border-slate-800 pt-4">
//                 <div>
//                   <span className="block text-xs font-medium text-slate-400 dark:text-slate-500 mb-1">
//                     Email Contact
//                   </span>
//                   <a
//                     href={`mailto:${job.company.contactEmail}`}
//                     className="inline-flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors break-all">
//                     <FaEnvelope className="mr-2 text-slate-400" />
//                     {job?.company?.contactEmail || "No contact email provided"}
//                   </a>
//                 </div>

//                 <div>
//                   <span className="block text-xs font-medium text-slate-400 dark:text-slate-500 mb-1">
//                     Phone Contact
//                   </span>
//                   <a
//                     href={`tel:${job.company.contactPhone}`}
//                     className="inline-flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
//                     <FaPhone className="mr-2 text-slate-400" />
//                     {job?.company?.contactPhone || "No contact phone provided"}
//                   </a>
//                 </div>
//               </div>
//             </div>

//             {canManageJob && (
//               <div className="bg-surfacedark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
//                 <h2 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">
//                   Manage Job
//                 </h2>
//                 <div className="flex flex-col gap-3">
//                   <Link
//                     to={`/edit-job/${job.id}`}
//                     className="w-full inline-flex items-center justify-center rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-surfacedark:hover:bg-slate-100 px-4 py-3 text-sm font-semibold text-text-primary dark:text-text-primary  dark:text-slate-950 shadow transition-colors">
//                     Edit Details
//                   </Link>
//                   <Button
//                     className="w-full bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/30 dark:hover:bg-rose-950/50 text-rose-600 dark:text-rose-400 font-semibold py-3 px-4 rounded-xl text-sm transition-colors focus:outline-none"
//                     onClick={() => onDeleteClick(job.id)}
//                     type="button"
//                     text="Delete Job"
//                   />
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobPage;

import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaMapMarker,
  FaEnvelope,
  FaPhone,
  FaBriefcase,
  FaDollarSign,
} from "react-icons/fa";
import { toast } from "react-toastify";
import DOMPurify from "dompurify";
import Button from "../components/Button";
import { useAuth } from "../context/useAuth";
import { apiRequest } from "../services/api";

const RichText = ({ html, className }) => {
  const clean = DOMPurify.sanitize(html || "", {
    USE_PROFILES: { html: true },
    ADD_ATTR: ["target", "rel"],
  });

  return (
    <div
      className={`prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 ${className ?? ""}`}
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
};

const JobPage = ({ deleteJob }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [isLoadingJob, setIsLoadingJob] = useState(true);
  const [jobError, setJobError] = useState("");
  const { user, isLoading } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const loadJob = async () => {
      try {
        setIsLoadingJob(true);
        setJobError("");
        const data = await apiRequest(`/api/jobs/${id}`);

        if (isMounted) {
          setJob(data);
        }
      } catch (error) {
        if (isMounted) {
          setJobError(error.message || "Unable to load this job.");
        }
      } finally {
        if (isMounted) {
          setIsLoadingJob(false);
        }
      }
    };

    if (id) {
      loadJob();
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  const onDeleteClick = (jobId) => {
    const confirm = window.confirm("Are you sure you want to delete this job?");
    if (!confirm) return;
    deleteJob(jobId);
    toast.success("Job deleted successfully");
    navigate("/jobs");
  };

  const isOwner = Boolean(
    user &&
    (user.id === job?.employer_id ||
      user.id === job?.employerId ||
      user?.id === job?.employer?.id),
  );
  const canManageJob = !isLoading && !isLoadingJob && isOwner;

  if (isLoadingJob) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4">
        <p className="text-slate-600 dark:text-slate-300">
          Loading job details...
        </p>
      </div>
    );
  }

  if (jobError || !job) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4">
        <p className="text-slate-600 dark:text-slate-300">
          {jobError || "This job could not be loaded."}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page-bg dark:bg-page-bg py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Link
            to="/jobs"
            className="inline-flex items-center text-sm font-medium text-text-secondary hover:text-text-primary dark:text-slate-400 dark:hover:text-surface transition-colors">
            <FaArrowLeft className="mr-2" /> Back to Jobs
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-surface dark:bg-surface-muted border border-border rounded-2xl p-6 shadow-sm">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-300/30 dark:text-emerald-400 mb-4">
                <FaBriefcase className="mr-1.5" />
                {job.type}
              </span>
              <h1 className="text-3xl font-bold text-text-primary tracking-tight mb-3">
                {job.title}
              </h1>
              <div className="flex items-center text-text-secondary">
                <FaMapMarker className="text-red-400 mr-2 shrink-0" />
                <span className="text-sm">{job.location}</span>
              </div>
            </div>

            <div className="bg-surface dark:bg-surface-muted border border-border rounded-2xl p-6 shadow-sm space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-text-primary mb-4">
                  Job Description
                </h2>
                <RichText html={job.description} />
              </div>

              <hr className="border-border dark:border-white/10 " />

              <div>
                <h2 className="text-lg font-semibold text-text-primary mb-3">
                  Salary & Compensation
                </h2>

                <div className="inline-flex items-center gap-2 bg-slate-50 dark:bg-slate-100/20 px-4 py-2.5 rounded-xl border border-border">
                  <FaDollarSign className="text-emerald-600 dark:text-emerald-400" />

                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {job.salary}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
              <h2 className="text-xs font-semibold text-text-primary  uppercase tracking-wider mb-4">
                Company Info
              </h2>
              <h3 className="text-xl font-bold text-text-secondary mb-2">
                {job?.company?.name || "Company information unavailable"}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                {job?.company?.description ||
                  "No company description provided."}
              </p>

              <div className="space-y-3.5 border-t border-border pt-4">
                <div>
                  <span className="block text-xs font-medium text-text-secondary mb-1">
                    Email Contact
                  </span>
                  <a
                    href={`mailto:${job?.company?.contactEmail || ""}`}
                    className="inline-flex items-center text-sm font-medium text-text-primary hover:font-semibold transition-colors break-all">
                    <FaEnvelope className="mr-2 text-slate-400" />
                    {job?.company?.contactEmail || "No contact email provided"}
                  </a>
                </div>

                <div>
                  <span className="block text-xs font-medium text-text-secondary mb-1">
                    Phone Contact
                  </span>
                  <a
                    href={`tel:${job?.company?.contactPhone || ""}`}
                    className="inline-flex items-center text-sm font-medium text-text-primary hover:font-semibold transition-colors">
                    <FaPhone className="mr-2 text-slate-400" />
                    {job?.company?.contactPhone || "No contact phone provided"}
                  </a>
                </div>
              </div>
            </div>

            {canManageJob && (
              <div className="bg-surface dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                <h2 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">
                  Manage Job
                </h2>
                <div className="flex flex-col gap-3">
                  <Link
                    to={`/edit-job/${job.id}`}
                    className="w-full inline-flex items-center justify-center rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-surface dark:hover:bg-slate-100 px-4 py-3 text-sm font-semibold text-text-primary dark:text-slate-950 shadow transition-colors">
                    Edit Details
                  </Link>
                  <Button
                    className="w-full bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/30 dark:hover:bg-rose-950/50 text-rose-600 dark:text-rose-400 font-semibold py-3 px-4 rounded-xl text-sm transition-colors focus:outline-none"
                    onClick={() => onDeleteClick(job.id)}
                    type="button"
                    text="Delete Job"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPage;
