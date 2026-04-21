import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FiArrowRight, FiMoon, FiSun, FiSearch } from "react-icons/fi";
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

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? "rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface-strong)] px-4 py-2 text-sm font-semibold text-[var(--color-text-primary)] shadow-sm transition duration-300"
      : "rounded-full border border-transparent px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] transition duration-300 hover:border-[var(--color-border)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text-primary)]";

  return (
    <header className="sticky top-0 z-50 px-2 pt-2 sm:px-6 lg:px-4 header_section">
      <nav className="mx-auto max-w-7xl rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-nav-bg)] shadow-xl shadow-black/10 navbar navbar-expand-lg custom_nav-container">

        <div className="flex min-h-20 items-center justify-between gap-3 px-4 py-3 sm:px-3 lg:px-8 container-fluid">
          

          <div className="flex min-w-0 flex-1 items-center">
            <NavLink to="/" className="navbar-brand flex items-center gap-3">
              <div className="rounded-2xl">
                <img src={logo} alt="Spering Logo" className="h-9 w-auto" />
              </div>
              <div className="min-w-0">
                <span className="block text-lg font-black tracking-[0.2em] text-[var(--color-text-primary)] sm:text-xl">
                  Spering
                </span>
                <span className="hidden text-xs tracking-[0.24em] text-[var(--color-text-secondary)] sm:block">
                  PREMIUM DEVELOPER ROLES
                </span>
              </div>

              <div>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-surface-strong)]">
                  {theme === "dark" ? <FiSun /> : <FiMoon />}
                </button>
              </div>
            </NavLink>
          </div>

          <div className="bg-color-white flex flex-wrap items-center justify-end gap-2 sm:gap-3">
            <ul className="navbar-nav flex items-center gap-2">
              <li className="">
                <NavLink to="/" className={linkClass}>
                  Home
                </NavLink>
              </li>
              <li className="">
                <NavLink to="/about" className={linkClass}>
                  About
                </NavLink>
              </li>

              <NavLink to="/jobs" className={linkClass}>
                Jobs
              </NavLink>
            </ul>

            <div className=" flex items-center gap-3 ml-lg-4">
              <NavLink
                to="/login"
                className="text-sm font-medium text-[var(--color-text-primary)]">
                Login
              </NavLink>

              <NavLink
                to="/add-job"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-[var(--color-accent-foreground)] shadow-lg transition duration-300 hover:-translate-y-0.5">
                Add Job
                <FiArrowRight />
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
