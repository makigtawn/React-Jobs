import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicOnlyRoute from "./components/PublicOnlyRoute";

import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import EmployerDashboardPage from "./pages/EmployerDashboardPage";
import EmployerProfilePage from "./pages/EmployerProfilePage";
import { createJob, updateJobRequest, deleteJobRequest } from "./services/api";

const App = () => {
  // 1. CREATE JOB FLOW
  const addJob = async (newJob) => {
    if (!newJob) throw new Error("Job data is empty");

    const payload = {
      title: newJob.title || "",
      type: newJob.type || "",
      location: newJob.location || "",
      description: newJob.description || "",
      salary: newJob.salary || "",
      companyName: newJob.company?.name || "",
      companyDescription: newJob.company?.description || "",
      contactEmail: newJob.company?.contactEmail || "",
      contactPhone: newJob.company?.contactPhone || "",
      minimumScoreThreshold: Number(newJob.minimumScoreThreshold || 0),
    };

    const { job } = await createJob(payload);
    return job;
  };

  // 2. DELETE JOB FLOW
  const deleteJob = async (id) => {
    await deleteJobRequest(id);
  };

  // 3. UPDATE JOB FLOW
  const updateJob = async (job) => {
    const payload = {
      title: job.title || "",
      type: job.type || "",
      location: job.location || "",
      description: job.description || "",
      salary: job.salary || "",
      companyName: job.company?.name || "",
      companyDescription: job.company?.description || "",
      contactEmail: job.company?.contactEmail || "",
      contactPhone: job.company?.contactPhone || "",
      minimumScoreThreshold: Number(job.minimumScoreThreshold || 0),
    };

    const { job: updated } = await updateJobRequest(job.id, payload);
    return updated;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/jobs/:id" element={<JobPage deleteJob={deleteJob} />} />

        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <LoginPage />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicOnlyRoute>
              <SignupPage />
            </PublicOnlyRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin", "user"]}>
              <EmployerDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-job"
          element={
            <ProtectedRoute allowedRoles={["admin", "user"]}>
              <AddJobPage addJobSubmit={addJob} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-job/:id"
          element={
            <ProtectedRoute allowedRoles={["admin", "user"]}>
              <EditJobPage updateJobSubmit={updateJob} />
            </ProtectedRoute>
          }
        />
        <Route
  path="/company"
  element={
    <ProtectedRoute allowedRoles={["admin", "user"]}>
      <EmployerProfilePage  />
    </ProtectedRoute>
  }
/>

        <Route path="*" element={<NotFoundPage />} />
      </Route>,
    ),
  );

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
