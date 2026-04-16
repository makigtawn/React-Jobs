import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FiArrowRight, FiMoon, FiSun } from "react-icons/fi";
import logo from "../assets/images/logo.png";

const getStoredTheme = () => {
  if (typeof window === "undefined") return "dark";

  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

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
    <header className="sticky top-0 z-50 px-2 pt-2 sm:px-6 lg:px-4">
      <nav className="mx-auto max-w-7xl rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-nav-bg)] shadow-xl shadow-black/10 ">
        <div className="flex min-h-20 items-center justify-between gap-3 px-4 py-3 sm:px-3 lg:px-8">
          <div className="flex min-w-0 flex-1 items-center">
            <NavLink to="/" className="flex items-center gap-3">
              <div className="rounded-2xl ">
                <img src={logo} alt="react jobs" className="h-9 w-auto" />
              </div>
              <div className="min-w-0">
                <span className="block text-lg font-black tracking-[0.2em] text-[var(--color-text-primary)] sm:text-xl">
                  REACT JOBS{" "}
                </span>
                <span className="hidden text-xs tracking-[0.24em] text-[var(--color-text-secondary)] sm:block">
                  PREMIUM DEVELOPER ROLES
                </span>
              </div>
            </NavLink>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Activate ${theme === "dark" ? "light" : "dark"} mode`}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-strong)]">
              {theme === "dark" ? (
                <FiSun className="text-base" />
              ) : (
                <FiMoon className="text-base" />
              )}
            </button>

            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>

            <NavLink to="/jobs" className={linkClass}>
              Jobs
            </NavLink>

            <NavLink
              to="/add-job"
             className=" inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-[var(--color-accent-foreground)] shadow-lg shadow-black/15 transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-accent-hover)]">
              Add Job
              <FiArrowRight className="text-base" />
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
