import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainLayout = () => {
  return (
    <div className="relative min-h-screen bg-[#152a31] dark:bg-slate-950 dark:text-white">
      <div className="fixed inset-0 z-0 opacity-80 pointer-events-none"></div>

      <div className="relative z-10">
        <Navbar />
        <ToastContainer />
        <main className="mx-auto max-w-full px-0">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
