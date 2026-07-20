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

const API_BASE_URL = "/api";

const App = () => {
  // 1. CREATE JOB FLOW (With safe optional chaining)
  const addJob = async (newJob) => {
    try {
      if (!newJob) throw new Error("Job data is empty");

      const payload = {
        title: newJob.title || "",
        type: newJob.type || "",
        location: newJob.location || "",
        description: newJob.description || "",
        salary: newJob.salary || "",
        company_name: newJob.company?.name || "",
        company_description: newJob.company?.description || "",
        contact_email: newJob.company?.contactEmail || "",
        contact_phone: newJob.company?.contactPhone || "",
        minimum_score_threshold: Number(newJob.minimumScoreThreshold || 0),
      };

      console.log("Sending payload to backend:", payload);

      const response = await fetch(`${API_BASE_URL}/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include", 
      });

      if (!response.ok) {
        const errorText = await response.text(); 
        console.error(`Server Error (${response.status}):`, errorText);
        
        try {
          const errorData = JSON.parse(errorText);
          throw new Error(errorData.error || errorData.message || `Server error: ${response.status}`);
        } catch {
          throw new Error(errorText || `Request failed with status ${response.status}`);
        }
      }

      return await response.json();
    } catch (err) {
      console.error("Failed to add job:", err);
      throw err;
    }
  };

  // 2. DELETE JOB FLOW 
  const deleteJob = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Could not delete job.");
      }
    } catch (error) {
      console.error("Delete job error:", error);
      throw error;
    }
  };

  // 3. UPDATE JOB FLOW (Safely guarded from nested undefined properties)
  const updateJob = async (job) => {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs/${job.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: job.title || "",
          type: job.type || "",
          location: job.location || "",
          description: job.description || "",
          salary: job.salary || "",
          minimum_score_threshold: Number(job.minimumScoreThreshold || 0),
          company_name: job.company?.name || "",
          company_description: job.company?.description || "",
          contact_email: job.company?.contactEmail || "",
          contact_phone: job.company?.contactPhone || "",
        }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Could not update job.");
      }
      
      return await response.json();
    } catch (error) {
      console.error("Update job error:", error);
      throw error;
    }
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
  path="/profile"
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
