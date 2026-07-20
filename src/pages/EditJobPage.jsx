import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import JobForm from "../components/JobForm";
import { useAuth } from "../context/useAuth";
import { apiRequest } from "../services/api";

const EditJobPage = ({ updateJobSubmit }) => {
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

  useEffect(() => {
    if (!isLoading && user && job) {
      const isOwner = Boolean(
        user?.id === job?.employer_id ||
        user?.id === job?.employerId ||
        user?.id === job?.employer?.id,
      );

      if (!isOwner) {
        toast.error("You can only edit jobs you created.");
        navigate(`/jobs/${job.id}`, { replace: true });
      }
    }
  }, [isLoading, job, navigate, user]);

  const handleSubmit = async (updatedJob) => {
    await updateJobSubmit({ ...updatedJob, id: job.id });
    toast.success("Job Updated Successfully");
    navigate(`/jobs/${job.id}`);
  };

  if (isLoading || isLoadingJob) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4">
        <p className="text-slate-600 dark:text-slate-300">
          Loading job details...
        </p>
      </div>
    );
  }

  if (jobError || !job || !user) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4">
        <p className="text-slate-600 dark:text-slate-300">
          {jobError || "This job could not be loaded."}
        </p>
      </div>
    );
  }

  const initialJob = {
    title: job?.title || "",
    type: job?.type || "",
    location: job?.location || "",
    description: job?.description || "",
    salary: job?.salary || "",
    minimumScoreThreshold: job?.minimumScoreThreshold || 0,
    company: {
      name: job?.company?.name || "",
      description: job?.company?.description || "",
      contactEmail: job?.company?.contactEmail || "",
      contactPhone: job?.company?.contactPhone || "",
      TIN: job?.company?.TIN || "",
    },
  };

  return (
    <JobForm
      initialJob={initialJob}
      heading="Update Job"
      submitLabel="Update Job"
      onSubmit={handleSubmit}
    />
  );
};

export default EditJobPage;
