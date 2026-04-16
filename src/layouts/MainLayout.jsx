import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import bgImage from "../assets/images/bgpic.jpg";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const MainLayout = () => {
  return (
    <div
      className="relative min-h-screen overflow-hidden bg-white text-black dark:bg-slate-950 dark:text-white"
      style={{
        backgroundImage: ` url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}>
      <div className="relative z-10 min-h-screen">
        <Navbar />
          <ToastContainer />

        <main className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-7xl flex-col px-3 sm:px-6 lg:px-8">
          <Outlet />

        </main>

      </div>
    </div>
  );
};

export default MainLayout;
