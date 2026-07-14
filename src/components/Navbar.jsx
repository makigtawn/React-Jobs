import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiArrowRight, FiMoon, FiSun, FiMenu } from "react-icons/fi";
import logo from "../assets/images/logo.png";
import { useAuth } from "../context/useAuth";
import Button from "./Button";

const getStoredTheme = () => {
  if (typeof window === "undefined") return "dark";
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(() => getStoredTheme());
  const [hideNavbar, setHideNavbar] = useState(false);
  const lastScrollY = useRef(0);
  const [menuOpen, setMenuOpen] = useState(false);

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
        setMenuOpen(false);
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

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
    navigate("/");
  };

  // const linkClass = ({ isActive }) =>
  //   `rounded-[0.2rem] px-4 py-2 text-sm font-medium transition duration-300 block text-center ${
  //     isActive
  //       ? " hover:border-border hover:bg-surface-muted text-text-primary dark:text-text-primary "
  //       : " text-text-primary dark:text-text-primary  hover:border-border hover:bg-surface-muted hover:text-text-primary"
  //   }`;

  const linkClass = ({ isActive }) =>
    `rounded-[0.5rem] px-4 py-2 text-sm font-medium transition duration-300 block text-center ${
      isActive
        ? "border border-border-strong bg-surface-strong text-text-primary dark:text-text-primary "
        : "border border-transparent text-text-secondary hover:border-border hover:bg-surface-muted hover:text-text-primary"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 lg:px-4 ${hideNavbar ? "-translate-y-full" : "translate-y-0 bg-page-bg"}`}
      aria-hidden={hideNavbar}
      inert={hideNavbar ? "" : undefined}>
      <nav className="mx-auto flex max-w-7xl flex-col lg:rounded-[1.6rem] bg-nav-bg px-3 shadow py-3 transition duration-300 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between gap-3">
          <NavLink to="/" className="flex items-center gap-3">
            <img src={logo} alt="Strata Logo" className="h-9 w-auto" />
            <div className="min-w-0">
              <span className="block text-lg font-black tracking-[0.2em] sm:text-xl text-text-primary dark:text-text-primary ">
                Strata
              </span>
              <span className="hidden text-xs tracking-[0.24em] sm:block text-text-secondary">
                hire fast and smart
              </span>
            </div>
          </NavLink>

          <div>
            {/* the hamburger menu button */}
            <Button
              type="button"
              aria-label="Toggle menu"
              onClick={toggleMenu}
              className="inline-flex h-11 w-11 rounded-full border border-border  text-text-primary dark:text-text-primary  text-xl transition duration-300 lg:hidden"
              style={{ padding: 0 }}>
              <FiMenu />
            </Button>
            {/* the menu lists */}
            <div className="hidden items-center gap-3 lg:flex">
              <ul className="flex items-center gap-2">
                <li>
                  <NavLink to="/" className={linkClass}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about" className={linkClass}>
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/jobs" className={linkClass}>
                    Jobs
                  </NavLink>
                </li>
              </ul>

              {!user && (
                <>
                  <NavLink
                    to="/login"
                    // className="text-sm font-medium transition duration-300 text-text-primary dark:text-text-primary ">
                    className={linkClass}>
                    Login
                  </NavLink>

                  <NavLink
                    to="/signup"
                    // className="text-sm font-medium transition duration-300 text-text-primary dark:text-text-primary ">
                    className={linkClass}>
                    Signup
                  </NavLink>
                </>
              )}
              {user && (
                <>
                  <NavLink to="/dashboard" className={linkClass}>
                    Dashboard
                  </NavLink>

                  <NavLink
                    to="/add-job"
                    className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-lg transition duration-300 ">
                    Add Job
                    <FiArrowRight />
                  </NavLink>

                  <Button
                    type="button"
                    onClick={handleLogout}
                    className="text-text-secondary">
                    {" "}
                    Logout
                  </Button>
                </>
              )}

              <Button
                type="button"
                onClick={toggleTheme}
                className="inline-flex cursor-pointer h-11 w-11 rounded-full border border-border bg-surface text-text-primary dark:text-text-primary  shadow-sm transition duration-300  hover:bg-surface-strong"
                style={{ padding: 0 }}>
                {theme === "dark" ? <FiSun /> : <FiMoon />}
              </Button>
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className="mt-4 space-y-4 rounded-[1.5rem] bg-black/10 p-4 text-center lg:hidden">
            <ul className="space-y-2 flex flex-col items-center justify-center">
              <li className="w-full max-w-[200px]">
                <NavLink
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className={linkClass}>
                  Home
                </NavLink>
              </li>
              <li className="w-full max-w-[200px]">
                <NavLink
                  to="/about"
                  onClick={() => setMenuOpen(false)}
                  className={linkClass}>
                  About
                </NavLink>
              </li>
              <li className="w-full max-w-[200px]">
                <NavLink
                  to="/jobs"
                  onClick={() => setMenuOpen(false)}
                  className={linkClass}>
                  Jobs
                </NavLink>
              </li>
            </ul>

            <div className="flex flex-col items-center gap-3 pt-2">
              {!user && (
                <>
                  <NavLink
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="w-full rounded-full border border-surface/20 px-4 py-3 text-center text-sm font-medium text-surface/90 transition hover:bg-surface/10">
                    Login
                  </NavLink>
                  <NavLink
                    to="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="w-full rounded-full border border-surface/20 px-4 py-3 text-center text-sm font-medium text-surface/90  transition hover:bg-surface/10">
                    Signup
                  </NavLink>
                </>
              )}

              {user && (
                <>
                  <NavLink
                    to="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="w-full rounded-full border border-surface/20 px-4 py-3 text-center text-sm font-medium text-surface/90 transition hover:bg-surface/10">
                    Dashboard
                  </NavLink>

                  <NavLink
                    to="/add-job"
                    onClick={() => setMenuOpen(false)}
                    className="w-full rounded-full border border-border-strong bg-accent px-4 py-3 text-center text-sm font-semibold text-accent-foreground shadow-lg transition hover:-translate-y-0.5">
                    Add Job
                  </NavLink>

                  <Button
                    type="button"
                    onClick={handleLogout}
                    className="bg-surface/10 w-full rounded-full dark:text-surface border border-surface/20 text-center text-sm font-medium text-surface/90 hover:bg-surface/10"
                    style={{ padding: "12px 16px" }}>
                    Logout
                  </Button>
                </>
              )}

              <div className="pt-2 w-full flex justify-center">
                <Button
                  type="button"
                  onClick={toggleTheme}
                  className="inline-flex h-12 items-center justify-center gap-3 rounded-full border border-surface/20 bg-surface/10 text-surfacetext-sm font-medium shadow-sm transition duration-300"
                  style={{ padding: "0 24px" }}>
                  {theme === "dark" ? (
                    <>
                      <FiSun /> Light Mode
                    </>
                  ) : (
                    <>
                      <FiMoon /> Dark Mode
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
