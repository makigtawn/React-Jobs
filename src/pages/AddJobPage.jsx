// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import JobForm from "../components/JobForm";

// const AddJobPage = ({ addJobSubmit }) => {
//   const navigate = useNavigate();

//   const handleSubmit = async (newJob) => {
//     await addJobSubmit(newJob);
//     toast.success("Job Added Successfully");
//     navigate("/jobs");
//   };

//   return (
//     <JobForm
//       heading="Add New Job"
//       submitLabel="Add Job"
//       onSubmit={handleSubmit}
//     />
//   );
// };

// export default AddJobPage;

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import JobForm from "../components/JobForm";

const AddJobPage = ({ addJobSubmit }) => {
  const navigate = useNavigate();

  const handleSubmit = async (newJob) => {
    try {
      await addJobSubmit(newJob);

      toast.success("Job Added Successfully");
      navigate("/jobs");
    } catch (error) {
      console.error("Form submit caught an error:", error);
      toast.error(error.message || "Failed to create job. Please try again.");
    }
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
