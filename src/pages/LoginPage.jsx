// import { useState } from "react";
// import { useAuth } from "../context/AuthContext";

// const LoginPage = () => {
//   const { login } = useAuth();
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const { error } = await login(email);

//     if (error) {
//       alert(error.message);
//     } else {
//       alert("Check your email for the login link!");
//     }

//     setLoading(false);
//   };

//   return (
//     <div>
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           value={email}
//           required
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <button disabled={loading}>
//           {loading ? "Loading..." : "Send magic link"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;

import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const validateEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMsg("");
    setSuccessMsg("");

    if (!validateEmail(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    if (loading) return;

    setLoading(true);

    const { error } = await login(email);

    if (error) {
      setErrorMsg(error.message || "Something went wrong.");
    } else {
      setSuccessMsg("Check your email for the login link.");
      setEmail("");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-md bg-slate-800 rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-white mb-2">Welcome back</h1>
        <p className="text-sm text-slate-400 mb-6">
          Enter your email to receive a login link
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
            className="px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />

          {errorMsg && <p className="text-sm text-red-400">{errorMsg}</p>}

          {successMsg && <p className="text-sm text-green-400">{successMsg}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`py-2 rounded-lg font-medium transition 
              ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white`}>
            {loading ? "Sending..." : "Send link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
