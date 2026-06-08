import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import JobForm from "../components/JobForm";

const AddJobPage = ({ addJobSubmit }) => {
  const navigate = useNavigate();

  const handleSubmit = async (newJob) => {
    await addJobSubmit(newJob);
    toast.success("Job Added Successfully");
    navigate("/jobs");
  };

  return (
    <JobForm
      heading="Add New Job"
      submitLabel="Add Job"
      onSubmit={handleSubmit}
    />
  );
};

export default AddJobPage;
