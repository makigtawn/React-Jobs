// import { useState, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/useAuth";
// import Button from "../components/Button";

// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// const SignupPage = () => {
//   const navigate = useNavigate();
//   const { signup } = useAuth();
//   // const { signup } = useContext(AuthContext);

//   const [form, setForm] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");
//   const [signupSuccess, setSignupSuccess] = useState(false);
//   const [userEmail, setUserEmail] = useState("");

//   const updateField = (field, value) => {
//     setForm((prev) => ({ ...prev, [field]: value }));
//   };

//   const validate = () => {
//     if (form.fullName.trim().length < 2) return "Full name is required.";
//     if (!emailRegex.test(form.email))
//       return "Please enter a valid email address.";
//     if (form.password.length < 6)
//       return "Password must be at least 6 characters.";
//     if (form.password !== form.confirmPassword)
//       return "Passwords do not match.";
//     return "";
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMsg("");

//     const validationError = validate();
//     if (validationError) {
//       setErrorMsg(validationError);
//       return;
//     }

//     setLoading(true);

//     // Call the context signup method instead of direct fetch
//     const { data, error } = await signup({
//       fullName: form.fullName.trim(),
//       email: form.email,
//       password: form.password,
//     });

//     setLoading(false);

//     if (error) {
//       if (error.message.includes("already registered")) {
//         setErrorMsg(
//           "This email is already registered. Try logging in instead.",
//         );
//       } else {
//         setErrorMsg(error.message || "Unable to create your account.");
//       }
//     } else {
//       setSignupSuccess(true);
//       setUserEmail(form.email);
//     }
//   };

//   return (
//     <section className="min-h-screen bg-page-bg dark:bg-page-bg px-4 py-24">
//       <div className="mx-auto max-w-md rounded-2xl border border-surface/10 bg-white/10 dark:bg-[#0d1f25] p-8 text-text-primary dark:text-text-primary  shadow-2xl">
//         {signupSuccess ? (
//           <>
//             <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-900/30 text-3xl">
//               ✓
//             </div>
//             <h1 className="text-3xl font-black text-center">
//               Account created!
//             </h1>
//             <p className="mt-4 text-sm text-text-secondary leading-relaxed">
//               Your account has been successfully set up with{" "}
//               <span className="font-semibold text-white">{userEmail}</span>.
//             </p>
//             <p className="mt-6 text-center text-sm text-text-secondary">
//               Ready to go?{" "}
//               <Link to="/login" className="font-semibold text-white">
//                 Log in here
//               </Link>
//             </p>
//             <Button
//               onClick={() => {
//                 setSignupSuccess(false);
//                 setForm({
//                   fullName: "",
//                   email: "",
//                   password: "",
//                   confirmPassword: "",
//                 });
//               }}
//               className="mt-4 w-full rounded-xl bg-surface/10 font-semibold text-text-secondary transition hover:bg-surface/20"
//               style={{ padding: "12px 20px" }}>
//               Create another account
//             </Button>
//           </>
//         ) : (
//           <>
//             <h1 className="text-3xltext-text-primary font-black text-center">
//               Create account
//             </h1>
//             <p className="mt-2 text-sm ">
//               Join Strata to apply for roles or manage your hiring pipeline.
//             </p>

//             <form onSubmit={handleSubmit} className="mt-8 space-y-4">
//               <label className="block">
//                 <span className="text-sm ">Full name</span>
//                 <input
//                   value={form.fullName}
//                   onChange={(e) => updateField("fullName", e.target.value)}
//                   disabled={loading}
//                   className="mt-2 w-full rounded-xl border border-border-strong bg-surface-strong px-4 py-3 outline-none focus:border-border"
//                 />
//               </label>

//               <label className="block">
//                 <span className="text-sm ">Email</span>
//                 <input
//                   type="email"
//                   value={form.email}
//                   onChange={(e) => updateField("email", e.target.value)}
//                   disabled={loading}
//                   className="mt-2 w-full rounded-xl border border-border-strong bg-surface-strong px-4 py-3 outline-none focus:border-border"
//                 />
//               </label>

//               <label className="block">
//                 <span className="text-sm ">Password</span>
//                 <input
//                   type="password"
//                   value={form.password}
//                   onChange={(e) => updateField("password", e.target.value)}
//                   disabled={loading}
//                   className="mt-2 w-full rounded-xl border border-border-strong bg-surface-strong px-4 py-3 outline-none focus:border-border"
//                 />
//               </label>

//               <label className="block">
//                 <span className="text-sm ">Confirm password</span>
//                 <input
//                   type="password"
//                   value={form.confirmPassword}
//                   onChange={(e) =>
//                     updateField("confirmPassword", e.target.value)
//                   }
//                   disabled={loading}
//                   className="mt-2 w-full rounded-xl border border-border-strong bg-surface-strong px-4 py-3 outline-none focus:border-border"
//                 />
//               </label>

//               {errorMsg && (
//                 <p className="text-sm text-center text-text-primary dark:text-text-primary ">
//                   {errorMsg}
//                 </p>
//               )}

//               <Button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full rounded-xl bg-accent font-semibold hover:bg-[#1aa69f] disabled:cursor-not-allowed"
//                 style={{ padding: "12px 20px" }}>
//                 {loading ? "Creating account..." : "Sign up"}
//               </Button>
//             </form>
//             <p className="mt-6 text-center text-text-secondary text-sm ">
//               Already have an account?{" "}
//               <Link to="/login" className="font-semibold hover:font-bold">
//                 Login
//               </Link>
//             </p>
//           </>
//         )}
//       </div>
//     </section>
//   );
// };

// export default SignupPage;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import Button from "../components/Button";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    if (form.fullName.trim().length < 2) return "Full name is required.";
    if (!emailRegex.test(form.email))
      return "Please enter a valid email address.";
    if (form.password.length < 8)
      return "Password must be at least 8 characters.";
    if (form.password !== form.confirmPassword)
      return "Passwords do not match.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const validationError = validate();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    setLoading(true);

    try {
      await signup({
        fullName: form.fullName.trim(),
        email: form.email,
        password: form.password,
      });

      setUserEmail(form.email);
      setSignupSuccess(true);

      setTimeout(() => {
        navigate("/login", { replace: true, state: { email: form.email } });
      }, 800);
    } catch (error) {
      // 3. Catch custom error strings coming from your Express backend database
      if (
        error.message.includes("already registered") ||
        error.message.includes("unique constraint") ||
        error.message.includes("409")
      ) {
        setErrorMsg(
          "This email is already registered. Try logging in instead.",
        );
      } else {
        setErrorMsg(error.message || "Unable to create your account.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-page-bg dark:bg-page-bg px-4 py-24">
      <div className="mx-auto max-w-md rounded-2xl border border-surface/10 bg-white/10 dark:bg-[#0d1f25] p-8 text-text-primary dark:text-text-primary  shadow-2xl">
        {signupSuccess ? (
          <>
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-900/30 text-3xl">
              ✓
            </div>
            <h1 className="text-3xl font-black text-center">
              Account created!
            </h1>
            <p className="mt-4 text-sm text-text-secondary leading-relaxed">
              Your account has been successfully set up with{" "}
              <span className="font-semibold text-white">{userEmail}</span>.
            </p>
            <p className="mt-6 text-center text-sm text-text-secondary">
              Ready to go?{" "}
              <Link to="/login" className="font-semibold text-white">
                Log in here
              </Link>
            </p>
            <Button
              onClick={() => {
                setSignupSuccess(false);
                setForm({
                  fullName: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                });
              }}
              className="mt-4 w-full rounded-xl bg-surface/10 font-semibold text-text-secondary transition hover:bg-surface/20"
              style={{ padding: "12px 20px" }}>
              Create another account
            </Button>
          </>
        ) : (
          <>
            <h1 className="text-3xl text-text-primary dark:text-text-primary  font-black text-center">
              Create account
            </h1>
            <p className="mt-2 text-sm text-center text-text-secondary">
              Join Strata to apply for roles or manage your hiring pipeline.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <label className="block">
                <span className="text-sm">Full name</span>
                <input
                  value={form.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  disabled={loading}
                  className="mt-2 w-full rounded-xl border border-border-strong bg-surface-strong px-4 py-3 outline-none focus:border-border"
                />
              </label>

              <label className="block">
                <span className="text-sm">Email</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  disabled={loading}
                  className="mt-2 w-full rounded-xl border border-border-strong bg-surface-strong px-4 py-3 outline-none focus:border-border"
                />
              </label>

              <label className="block">
                <span className="text-sm">Password</span>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => updateField("password", e.target.value)}
                  disabled={loading}
                  className="mt-2 w-full rounded-xl border border-border-strong bg-surface-strong px-4 py-3 outline-none focus:border-border"
                />
              </label>

              <label className="block">
                <span className="text-sm">Confirm password</span>
                <input
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) =>
                    updateField("confirmPassword", e.target.value)
                  }
                  disabled={loading}
                  className="mt-2 w-full rounded-xl border border-border-strong bg-surface-strong px-4 py-3 outline-none focus:border-border"
                />
              </label>

              {errorMsg && (
                <p className="text-sm text-center text-red-400 font-medium">
                  {errorMsg}
                </p>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-accent font-semibold hover:bg-[#1aa69f] disabled:cursor-not-allowed"
                style={{ padding: "12px 20px" }}>
                {loading ? "Creating account..." : "Sign up"}
              </Button>
            </form>
            <p className="mt-6 text-center text-text-secondary text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold hover:font-bold text-text-secondary ml-1">
                Login
              </Link>
            </p>
          </>
        )}
      </div>
    </section>
  );
};

export default SignupPage;
