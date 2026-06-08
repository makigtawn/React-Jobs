import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainLayout = () => {
  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-950 dark:text-white">
      <div className="fixed inset-0 z-0 opacity-80 pointer-events-none">
      </div>

      <div className="relative z-10">
        <Navbar />
        <ToastContainer />
        <main className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
