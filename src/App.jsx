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
import ProfilePage from "./pages/ProfilePage"
import { supabase } from "./utils/supabase";
import { apiRequest } from "./services/api";

const App = () => {
  const addJob = async (newJob) => {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        console.error("Authentication error:", authError);
        throw new Error("You must be logged in to add a job.");
      }

      const { error } = await supabase
        .from("jobs")
        .insert({
          employer_id: user.id, 
          title: newJob.title,
          type: newJob.type,
          location: newJob.location,
          description: newJob.description,
          salary: newJob.salary,
          company_name: newJob.company.name,
          company_description: newJob.company.description,
          contact_email: newJob.company.contactEmail,
          contact_phone: newJob.company.contactPhone,
          minimum_score_threshold: Number(newJob.minimumScoreThreshold || 0),
        });

      if (error) {
        console.error("Supabase insert error details:", error);
        throw error;
      }
    } catch (err) {
      console.error("Failed to add job:", err);
      throw err; 
    }
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
          path="/jobs/:id"
          element={<JobPage deleteJob={deleteJob} />}
          loader={jobLoader}
        />
        
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
          loader={jobLoader}
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
  path="/profile"
  element={
    <ProtectedRoute allowedRoles={["admin", "user"]}>
      <ProfilePage />
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
