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
import jobLoader from "./pages/jobLoader";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import EmployerDashboardPage from "./pages/EmployerDashboardPage";

import { supabase } from "./utils/supabase";
import { apiRequest } from "./services/api";

const App = () => {
  const addJob = async (newJob) => {
    await apiRequest("/api/jobs", {
      method: "POST",
      body: JSON.stringify({
      title: newJob.title,
      type: newJob.type,
      location: newJob.location,
      description: newJob.description,
      salary: newJob.salary,
        companyName: newJob.company.name,
        companyDescription: newJob.company.description,
        contactEmail: newJob.company.contactEmail,
        contactPhone: newJob.company.contactPhone,
        minimumScoreThreshold: Number(newJob.minimumScoreThreshold || 0),
      }),
    });
  };

  const deleteJob = async (id) => {
    const { error } = await supabase.from("jobs").delete().eq("id", id);
    if (error) console.error("Delete job error:", error);
  };

  const updateJob = async (job) => {
    const { error } = await supabase
      .from("jobs")
      .update({
        title: job.title,
        type: job.type,
        location: job.location,
        description: job.description,
        salary: job.salary,
        minimum_score_threshold: Number(job.minimumScoreThreshold || 0),
        company_name: job.company.name,
        company_description: job.company.description,
        contact_email: job.company.contactEmail,
        contact_phone: job.company.contactPhone,
      })
      .eq("id", job.id);
    if (error) console.error("Update job error:", error);
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/about" element={<AboutPage />} />
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
            <ProtectedRoute>
              <EmployerDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-job"
          element={
            <ProtectedRoute>
              <AddJobPage addJobSubmit={addJob} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-job/:id"
          element={
            <ProtectedRoute>
              <EditJobPage updateJobSubmit={updateJob} />
            </ProtectedRoute>
          }
          loader={jobLoader}
        />
        <Route
          path="/jobs/:id"
          element={<JobPage deleteJob={deleteJob} />}
          loader={jobLoader}
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
