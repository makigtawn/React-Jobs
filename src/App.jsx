import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

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
import HeroCarousel from "./components/HeroCarousel";

import { supabase } from "./utils/supabase";

const HomeWithCarousel = () => (
  <>
    <HeroCarousel />
    <HomePage />
  </>
);

const App = () => {
  // #region agent log
  fetch('http://127.0.0.1:7344/ingest/f404edb9-b305-43de-9ba7-568fd646dc90',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'2b480a'},body:JSON.stringify({sessionId:'2b480a',runId:'pre-fix',hypothesisId:'E',location:'App.jsx:render',message:'App component mounted',data:{pathname:typeof window!=='undefined'?window.location.pathname:null},timestamp:Date.now()})}).catch(()=>{});
  // #endregion

  const addJob = async (newJob) => {
    const { error } = await supabase.from("jobs").insert({
      title: newJob.title,
      type: newJob.type,
      location: newJob.location,
      description: newJob.description,
      salary: newJob.salary,
      company_name: newJob.company.name,
      company_description: newJob.company.description,
      contact_email: newJob.company.contactEmail,
      contact_phone: newJob.company.contactPhone,
    });
    if (error) console.error("Add job error:", error);
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
        <Route index element={<HomeWithCarousel />} />
        <Route path="/hero-carousel" element={<HeroCarousel />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
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
