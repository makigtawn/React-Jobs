import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainLayout = () => {
  return (
    <div className="relative z-10">
      <Navbar />
      <ToastContainer />
      <main className="mx-auto max-w-full px-0">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
