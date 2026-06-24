// import React, { useEffect, useRef, useState } from "react";
// import { NavLink, useLocation, useNavigate } from "react-router-dom";
// import { FiArrowRight, FiMoon, FiSun, FiMenu } from "react-icons/fi";
// import logo from "../assets/images/logo.png";
// import { useAuth } from "../context/useAuth";
// import Button from "./Button";
// const getStoredTheme = () => {
//   if (typeof window === "undefined") return "dark";
//   const savedTheme = localStorage.getItem("theme");
//   if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
//   return window.matchMedia("(prefers-color-scheme: dark)").matches
//     ? "dark"
//     : "light";
// };

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const [theme, setTheme] = useState(() => getStoredTheme());
//   const [hideNavbar, setHideNavbar] = useState(false);
//   const lastScrollY = useRef(0);
//   const [menuOpen, setMenuOpen] = useState(false);

//   useEffect(() => {
//     const root = document.documentElement;
//     root.classList.toggle("dark", theme === "dark");
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   useEffect(() => {
//     lastScrollY.current = window.scrollY;

//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;
//       const scrollDifference = currentScrollY - lastScrollY.current;

//       if (currentScrollY <= 16) {
//         setHideNavbar(false);
//       } else if (scrollDifference > 4) {
//         setHideNavbar(true);
//         setMenuOpen(false); 
//       } else if (scrollDifference < -4) {
//         setHideNavbar(false);
//       }

//       lastScrollY.current = currentScrollY;
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const toggleTheme = () => {
//     setTheme((prev) => (prev === "dark" ? "light" : "dark"));
//   };

//   const toggleMenu = () => {
//     setMenuOpen((prev) => !prev);
//   };

//   const handleLogout = async () => {
//     await logout();
//     setMenuOpen(false);
//     navigate("/");
//   };

//   const linkClass = ({ isActive }) =>
//     `rounded-full px-4 py-2 text-sm font-medium transition duration-300 block text-center ${
//       isActive
//         ? "border border-[var(--color-border-strong)] bg-[var(--color-surface-strong)] text-[var(--color-text-primary)]"
//         : "border border-transparent text-[var(--color-text-secondary)] hover:border-[var(--color-border)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text-primary)]"
//     }`;

//   return (
//     <header
//       className={`sticky top-0 z-50 px-2 pt-2 transition-transform duration-300 sm:px-6 lg:px-4 ${
//         hideNavbar ? "-translate-y-full" : "translate-y-0"
//       }`}
//       aria-hidden={hideNavbar}
//       inert={hideNavbar ? "" : undefined}>
//       <nav className="mx-auto flex max-w-7xl flex-col rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-nav-bg)] px-3 py-3 shadow-xl shadow-black/10 transition duration-300 sm:px-4 lg:px-6">
//         <div className="flex items-center justify-between gap-3">
//           <NavLink to="/" className="flex items-center gap-3">
//             <img src={logo} alt="Strata Logo" className="h-9 w-auto" />
//             <div className="min-w-0">
//               <span className="block text-lg font-black tracking-[0.2em] sm:text-xl text-[var(--color-text-primary)]">
//                 Strata
//               </span>
//               <span className="hidden text-xs tracking-[0.24em] sm:block text-[var(--color-text-secondary)]">
//                 hire fast and smart
//               </span>
//             </div>
//           </NavLink>

//           <div className="flex items-center gap-3">
//             <Button
//               type="button"
//               aria-label="Toggle menu"
//               onClick={toggleMenu}
//               className="inline-flex h-11 w-11 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] text-xl transition duration-300 lg:hidden"
//               style={{ padding: 0 }} 
//             >
//               <FiMenu />
//             </Button>

//             <div className="hidden items-center gap-3 lg:flex">
//               <ul className="flex items-center gap-2">
//                 <li>
//                   <NavLink to="/" className={linkClass}>
//                     Home
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink to="/about" className={linkClass}>
//                     About
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink to="/jobs" className={linkClass}>
//                     Jobs
//                   </NavLink>
//                 </li>
//               </ul>

//               {!user && (
//                 <>
//                   <NavLink
//                     to="/login"
//                     className="text-sm font-medium transition duration-300 text-[var(--color-text-primary)]">
//                     Login
//                   </NavLink>

//                   <NavLink
//                     to="/signup"
//                     className="text-sm font-medium transition duration-300 text-[var(--color-text-primary)]">
//                     Signup
//                   </NavLink>
//                 </>
//               )}
//               {user && (
//                 <>
//                   <NavLink to="/dashboard" className={linkClass}>
//                     Dashboard
//                   </NavLink>

//                   <Button
//                     type="button"
//                     onClick={handleLogout}
//                     className="text-sm bg-[none] font-medium cursor-pointer transition duration-300 text-[var(--color-text-primary)]"
//                   >  Logout
//                   </Button>
//                 </>
//               )}

//               <NavLink
//                 to="/add-job"
//                 className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-[var(--color-accent-foreground)] shadow-lg transition duration-300 hover:-translate-y-0.5">
//                 Add Job
//                 <FiArrowRight />
//               </NavLink>

//               <Button
//                 type="button"
//                 onClick={toggleTheme}
//                 className="inline-flex cursor-pointer h-11 w-11 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-surface-strong)]"
//                 style={{ padding: 0 }}>
//                 {theme === "dark" ? <FiSun /> : <FiMoon />}
//               </Button>
//             </div>
//           </div>
//         </div>

//         {menuOpen && (
//           <div className="mt-4 space-y-4 rounded-[1.5rem] bg-black/10 p-4 text-center lg:hidden">
//             <ul className="space-y-2 flex flex-col items-center justify-center">
//               <li className="w-full max-w-[200px]">
//                 <NavLink
//                   to="/"
//                   onClick={() => setMenuOpen(false)}
//                   className={linkClass}>
//                   Home
//                 </NavLink>
//               </li>
//               <li className="w-full max-w-[200px]">
//                 <NavLink
//                   to="/about"
//                   onClick={() => setMenuOpen(false)}
//                   className={linkClass}>
//                   About
//                 </NavLink>
//               </li>
//               <li className="w-full max-w-[200px]">
//                 <NavLink
//                   to="/jobs"
//                   onClick={() => setMenuOpen(false)}
//                   className={linkClass}>
//                   Jobs
//                 </NavLink>
//               </li>
//             </ul>

//             <div className="flex flex-col items-center gap-3 pt-2">
//               {!user && (
//                 <>
//                   <NavLink
//                     to="/login"
//                     onClick={() => setMenuOpen(false)}
//                     className="w-full rounded-full border border-white/20 px-4 py-3 text-center text-sm font-medium text-white/90 transition hover:bg-white/10">
//                     Login
//                   </NavLink>
//                   <NavLink
//                     to="/signup"
//                     onClick={() => setMenuOpen(false)}
//                     className="w-full rounded-full border border-white/20 px-4 py-3 text-center text-sm font-medium text-white/90 transition hover:bg-white/10">
//                     Signup
//                   </NavLink>
//                 </>
//               )}

//               {user && (
//                 <>
//                   <NavLink
//                     to="/dashboard"
//                     onClick={() => setMenuOpen(false)}
//                     className="w-full rounded-full border border-white/20 px-4 py-3 text-center text-sm font-medium text-white/90 transition hover:bg-white/10">
//                     Dashboard
//                   </NavLink>
//                   <Button
//                     type="button"
//                     onClick={handleLogout}
//                     className="bg-white/10 w-full rounded-full border border-white/20 text-center text-sm font-medium text-white/90 hover:bg-white/10"
//                     style={{ padding: "12px 16px" }}>
//                     Logout
//                   </Button>
//                 </>
//               )}

//               <NavLink
//                 to="/add-job"
//                 onClick={() => setMenuOpen(false)}
//                 className="w-full rounded-full border border-[var(--color-border-strong)] bg-[var(--color-accent)] px-4 py-3 text-center text-sm font-semibold text-[var(--color-accent-foreground)] shadow-lg transition hover:-translate-y-0.5">
//                 Add Job
//               </NavLink>

//               <div className="pt-2 w-full flex justify-center">
//                 <Button
//                   type="button"
//                   onClick={toggleTheme}
//                   className="inline-flex h-12 items-center justify-center gap-3 rounded-full border border-white/20 bg-white/10 text-white text-sm font-medium shadow-sm transition duration-300"
//                   style={{ padding: "0 24px" }}>
//                   {theme === "dark" ? (
//                     <>
//                       <FiSun /> Light Mode
//                     </>
//                   ) : (
//                     <>
//                       <FiMoon /> Dark Mode
//                     </>
//                   )}
//                 </Button>
//               </div>
//             </div>
//           </div>
//         )}
//       </nav>
//     </header>
//   );
// };

// export default Navbar;



























import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
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

  const linkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-medium transition duration-300 block text-center ${
      isActive
        ? "border border-[var(--color-border-strong)] bg-[var(--color-surface-strong)] text-[var(--color-text-primary)]"
        : "border border-transparent text-[var(--color-text-secondary)] hover:border-[var(--color-border)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text-primary)]"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 px-2 pt-2 transition-transform duration-300 sm:px-6 lg:px-4 ${
        hideNavbar ? "-translate-y-full" : "translate-y-0"
      }`}
      aria-hidden={hideNavbar}
      inert={hideNavbar ? "" : undefined}>
      <nav className="mx-auto flex max-w-7xl flex-col rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-nav-bg)] px-3 py-3 shadow-xl shadow-black/10 transition duration-300 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between gap-3">
          <NavLink to="/" className="flex items-center gap-3">
            <img src={logo} alt="Strata Logo" className="h-9 w-auto" />
            <div className="min-w-0">
              <span className="block text-lg font-black tracking-[0.2em] sm:text-xl text-[var(--color-text-primary)]">
                Strata
              </span>
              <span className="hidden text-xs tracking-[0.24em] sm:block text-[var(--color-text-secondary)]">
                hire fast and smart
              </span>
            </div>
          </NavLink>

          <div className="flex items-center gap-3">
            <Button
              type="button"
              aria-label="Toggle menu"
              onClick={toggleMenu}
              className="inline-flex h-11 w-11 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] text-xl transition duration-300 lg:hidden"
              style={{ padding: 0 }} 
            >
              <FiMenu />
            </Button>

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
                    className="text-sm font-medium transition duration-300 text-[var(--color-text-primary)]">
                    Login
                  </NavLink>

                  <NavLink
                    to="/signup"
                    className="text-sm font-medium transition duration-300 text-[var(--color-text-primary)]">
                    Signup
                  </NavLink>
                </>
              )}
              {user && (
                <>
                  <NavLink to="/dashboard" className={linkClass}>
                    Dashboard
                  </NavLink>

                  {/* <NavLink to="/profile" className={linkClass}>
                    Profile
                  </NavLink> */}

                  <Button
                    type="button"
                    onClick={handleLogout}
                    className="text-sm bg-[none] font-medium cursor-pointer transition duration-300 text-[var(--color-text-primary)]"
                  >  Logout
                  </Button>
                </>
              )}

              <NavLink
                to="/add-job"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-[var(--color-accent-foreground)] shadow-lg transition duration-300 hover:-translate-y-0.5">
                Add Job
                <FiArrowRight />
              </NavLink>

              <Button
                type="button"
                onClick={toggleTheme}
                className="inline-flex cursor-pointer h-11 w-11 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-surface-strong)]"
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
                    className="w-full rounded-full border border-white/20 px-4 py-3 text-center text-sm font-medium text-white/90 transition hover:bg-white/10">
                    Login
                  </NavLink>
                  <NavLink
                    to="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="w-full rounded-full border border-white/20 px-4 py-3 text-center text-sm font-medium text-white/90 transition hover:bg-white/10">
                    Signup
                  </NavLink>
                </>
              )}

              {user && (
                <>
                  <NavLink
                    to="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="w-full rounded-full border border-white/20 px-4 py-3 text-center text-sm font-medium text-white/90 transition hover:bg-white/10">
                    Dashboard
                  </NavLink>

                  {/* <NavLink
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="w-full rounded-full border border-white/20 px-4 py-3 text-center text-sm font-medium text-white/90 transition hover:bg-white/10">
                    Profile
                  </NavLink> */}

                  <Button
                    type="button"
                    onClick={handleLogout}
                    className="bg-white/10 w-full rounded-full border border-white/20 text-center text-sm font-medium text-white/90 hover:bg-white/10"
                    style={{ padding: "12px 16px" }}>
                    Logout
                  </Button>
                </>
              )}

              <NavLink
                to="/add-job"
                onClick={() => setMenuOpen(false)}
                className="w-full rounded-full border border-[var(--color-border-strong)] bg-[var(--color-accent)] px-4 py-3 text-center text-sm font-semibold text-[var(--color-accent-foreground)] shadow-lg transition hover:-translate-y-0.5">
                Add Job
              </NavLink>

              <div className="pt-2 w-full flex justify-center">
                <Button
                  type="button"
                  onClick={toggleTheme}
                  className="inline-flex h-12 items-center justify-center gap-3 rounded-full border border-white/20 bg-white/10 text-white text-sm font-medium shadow-sm transition duration-300"
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
