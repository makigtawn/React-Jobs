import { useNavigate, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import JobForm from "../components/JobForm";

const EditJobPage = ({ updateJobSubmit }) => {
  const job = useLoaderData();
  const navigate = useNavigate();

  const handleSubmit = async (updatedJob) => {
    await updateJobSubmit({ ...updatedJob, id: job.id });
    toast.success("Job Updated Successfully");
    navigate(`/jobs/${job.id}`);
  };

  const initialJob = {
    title: job.title,
    type: job.type,
    location: job.location,
    description: job.description,
    salary: job.salary,
    minimumScoreThreshold: job.minimumScoreThreshold || 0,
    company: {
      name: job.company.name,
      description: job.company.description,
      contactEmail: job.company.contactEmail,
      contactPhone: job.company.contactPhone,
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
