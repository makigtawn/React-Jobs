import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import MyBackground  from "../assets/images/image.svg?react";

const MainLayout = () => {
  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-950 dark:text-white">
      
      <div className="fixed inset-0 z-0 opacity-80 pointer-events-none">
        <MyBackground className="w-full h-full object-cover text-blue-500 dark:text-slate-700" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <ToastContainer />
        <main className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
