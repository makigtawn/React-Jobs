import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { FiArrowRight, FiMoon, FiSun } from "react-icons/fi";
import logo from "../assets/images/logo.png";

const getStoredTheme = () => {
  if (typeof window === "undefined") return "dark";
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const Navbar = () => {
  const [theme, setTheme] = useState(() => getStoredTheme());
  const [hideNavbar, setHideNavbar] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDifference = currentScrollY - lastScrollY.current;

      if (currentScrollY <= 16) {
        setHideNavbar(false);
      } else if (scrollDifference > 4) {
        setHideNavbar(true);
      } else if (scrollDifference < -4) {
        setHideNavbar(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-white font-semibold"
      : "text-white/70 transition hover:text-white";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ${
        hideNavbar
          ? "pointer-events-none -translate-y-16"
          : "translate-y-0"
      }`}>
      <nav className="relative z-50 w-full bg-[#112830]/95 px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <NavLink to="/" className="flex items-center gap-3">
            <img src={logo} alt="Spering logo" className="h-10 w-auto" />
            <span className="text-lg font-black tracking-[0.2em] text-white sm:text-xl">
              Spering
            </span>
          </NavLink>

          <div className="hidden items-center gap-8 lg:flex">
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/about" className={linkClass}>
              About
            </NavLink>
            <NavLink to="/jobs" className={linkClass}>
              Jobs
            </NavLink>
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <NavLink
              to="/login"
              className="text-sm font-medium text-white/80 transition hover:text-white">
              Login
            </NavLink>

            <NavLink
              to="/add-job"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white/90">
              Add Job
              <FiArrowRight />
            </NavLink>

            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/15">
              {theme === "dark" ? <FiSun /> : <FiMoon />}
            </button>
          </div>

          <button
            type="button"
            aria-label="Toggle navigation menu"
            onClick={toggleMenu}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/0 text-white shadow-sm transition hover:bg-white/10 lg:hidden">
            <span className="flex h-5 w-5 flex-col justify-between">
              <span className="block h-[2px] w-full bg-white" />
              <span className="block h-[2px] w-full bg-white" />
              <span className="block h-[2px] w-full bg-white" />
            </span>
          </button>
        </div>

        <div
          className={`absolute inset-x-0 top-full overflow-hidden bg-[#0f232a]/95 transition-all duration-300 ${
            menuOpen ? "max-h-[420px] py-6" : "max-h-0"
          }`}>
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-3 border-b border-white/10 pb-5">
              <NavLink
                to="/"
                className={linkClass}
                onClick={() => setMenuOpen(false)}>
                Home
              </NavLink>
              <NavLink
                to="/about"
                className={linkClass}
                onClick={() => setMenuOpen(false)}>
                About
              </NavLink>
              <NavLink
                to="/jobs"
                className={linkClass}
                onClick={() => setMenuOpen(false)}>
                Jobs
              </NavLink>
            </div>

            <div className="flex flex-wrap gap-3">
              <NavLink
                to="/login"
                className="text-sm font-medium text-white/80 transition hover:text-white"
                onClick={() => setMenuOpen(false)}>
                Login
              </NavLink>

              <NavLink
                to="/add-job"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white/90"
                onClick={() => setMenuOpen(false)}>
                Add Job
                <FiArrowRight />
              </NavLink>

              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/15">
                {theme === "dark" ? <FiSun /> : <FiMoon />}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
