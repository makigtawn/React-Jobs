import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FiArrowRight, FiMoon, FiSun, FiMenu } from "react-icons/fi";
import logo from "../assets/images/logo.png";
import { useAuth } from "../context/useAuth";

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
  const [theme, setTheme] = useState(() => getStoredTheme());
  const [hideNavbar, setHideNavbar] = useState(false);
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

  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
  };

  const linkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-medium transition duration-300 ${
      isHome
        ? isActive
          ? "border border-white/30 bg-white/10 text-white"
          : "border border-transparent text-white/80 hover:border-white/20 hover:text-white"
        : isActive
          ? "rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface-strong)] text-[var(--color-text-primary)]"
          : "rounded-full border border-transparent text-[var(--color-text-secondary)] hover:border-[var(--color-border)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text-primary)]"
    }`;

  return (
    <header
      className={`${
        isHome ? "fixed inset-x-0 top-0" : "sticky top-0"
      } z-50 px-2 pt-2 transition-transform duration-300 sm:px-6 lg:px-4`}
      aria-hidden={hideNavbar}
      inert={hideNavbar ? "" : undefined}>
      <nav
        className={`mx-auto flex max-w-7xl flex-col rounded-[1.75rem] border border-transparent px-3 py-3 shadow-xl shadow-black/10 transition duration-300 sm:px-4 lg:px-6 ${
          isHome
            ? "bg-[#12242f]/90 backdrop-blur-xl border-white/15"
            : "bg-[var(--color-nav-bg)] border-[var(--color-border)]"
        }`}>
        <div className="flex items-center justify-between gap-3">
          <NavLink to="/" className="flex items-center gap-3">
            <img src={logo} alt="Spering Logo" className="h-9 w-auto" />
            <div className="min-w-0">
              <span
                className={`block text-lg font-black tracking-[0.2em] sm:text-xl ${
                  isHome ? "text-white" : "text-[var(--color-text-primary)]"
                }`}>
                Spering
              </span>
              <span
                className={`hidden text-xs tracking-[0.24em] sm:block ${
                  isHome
                    ? "text-white/70"
                    : "text-[var(--color-text-secondary)]"
                }`}>
                PREMIUM DEVELOPER ROLES
              </span>
            </div>
          </NavLink>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={toggleMenu}
              className={`inline-flex h-11 w-11 items-center justify-center rounded-full border px-3 text-xl transition duration-300 lg:hidden ${
                isHome
                  ? "border-white/20 bg-white/10 text-white"
                  : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)]"
              }`}>
              <FiMenu />
            </button>

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
                    className={`text-sm font-medium transition duration-300 ${
                      isHome
                        ? "text-white/80 hover:text-white"
                        : "text-[var(--color-text-primary)]"
                    }`}>
                    Login
                  </NavLink>

                  <NavLink
                    to="/signup"
                    className={`text-sm font-medium transition duration-300 ${
                      isHome
                        ? "text-white/80 hover:text-white"
                        : "text-[var(--color-text-primary)]"
                    }`}>
                    Signup
                  </NavLink>
                </>
              )}

              {user && (
                <>
                  <NavLink to="/dashboard" className={linkClass}>
                    Dashboard
                  </NavLink>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className={`text-sm font-medium transition duration-300 ${
                      isHome
                        ? "text-white/80 hover:text-white"
                        : "text-[var(--color-text-primary)]"
                    }`}>
                    Logout
                  </button>
                </>
              )}

              <NavLink
                to="/add-job"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-[var(--color-accent-foreground)] shadow-lg transition duration-300 hover:-translate-y-0.5">
                Add Job
                <FiArrowRight />
              </NavLink>

              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-surface-strong)]">
                {theme === "dark" ? <FiSun /> : <FiMoon />}
              </button>
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className="mt-4 space-y-3 rounded-[1.5rem] bg-black/10 p-4 lg:hidden">
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className={linkClass}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  onClick={() => setMenuOpen(false)}
                  className={linkClass}>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/jobs"
                  onClick={() => setMenuOpen(false)}
                  className={linkClass}>
                  Jobs
                </NavLink>
              </li>
            </ul>
            <div className="flex flex-col gap-3 pt-2">
              {!user && (
                <>
                  <NavLink
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-full border border-white/20 px-4 py-3 text-center text-sm font-medium text-white/90 transition hover:bg-white/10">
                    Login
                  </NavLink>
                  <NavLink
                    to="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-full border border-white/20 px-4 py-3 text-center text-sm font-medium text-white/90 transition hover:bg-white/10">
                    Signup
                  </NavLink>
                </>
              )}

              {user && (
                <>
                  <NavLink
                    to="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-full border border-white/20 px-4 py-3 text-center text-sm font-medium text-white/90 transition hover:bg-white/10">
                    Dashboard
                  </NavLink>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-full border border-white/20 px-4 py-3 text-center text-sm font-medium text-white/90 transition hover:bg-white/10">
                    Logout
                  </button>
                </>
              )}
              <NavLink
                to="/add-job"
                onClick={() => setMenuOpen(false)}
                className="rounded-full border border-[var(--color-border-strong)] bg-[var(--color-accent)] px-4 py-3 text-center text-sm font-semibold text-[var(--color-accent-foreground)] shadow-lg transition hover:-translate-y-0.5">
                Add Job
              </NavLink>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
