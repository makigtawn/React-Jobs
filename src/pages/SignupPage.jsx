import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignupPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
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
    if (!emailRegex.test(form.email)) return "Please enter a valid email address.";
    if (form.password.length < 6) return "Password must be at least 6 characters.";
    if (form.password !== form.confirmPassword) return "Passwords do not match.";
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
    const { error } = await signup({
      fullName: form.fullName.trim(),
      email: form.email,
      password: form.password,
    });
    setLoading(false);

    if (error) {
      // Handle specific signup errors
      if (error.message?.includes("already registered")) {
        setErrorMsg("This email is already registered. Try logging in instead.");
      } else {
        setErrorMsg(error.message || "Unable to create your account.");
      }
      return;
    }

    // Success! Show email verification message
    setSignupSuccess(true);
    setUserEmail(form.email);
  };

  return (
    <section className="min-h-screen bg-[#152a31] px-4 py-24">
      <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-[#0d1f25] p-8 text-white shadow-2xl">
        {signupSuccess ? (
          <>
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-900/30 text-3xl">
              ✓
            </div>
            <h1 className="text-3xl font-black">Check your email</h1>
            <p className="mt-4 text-sm text-white/75 leading-relaxed">
              We've sent a verification link to <span className="font-semibold text-white">{userEmail}</span>
            </p>
            <div className="mt-6 rounded-lg bg-blue-900/20 border border-blue-700/30 p-4">
              <p className="text-sm text-blue-200">
                <strong>📧 Next steps:</strong>
              </p>
              <ol className="mt-2 text-sm text-blue-200 space-y-2 list-decimal list-inside">
                <li>Check your email inbox</li>
                <li>Click the verification link</li>
                <li>Return here and log in</li>
              </ol>
            </div>
            <p className="mt-6 text-center text-sm text-white/65">
              Already verified?{" "}
              <Link to="/login" className="font-semibold text-[#21b8b2]">
                Log in here
              </Link>
            </p>
            <button
              onClick={() => {
                setSignupSuccess(false);
                setForm({ fullName: "", email: "", password: "", confirmPassword: "" });
              }}
              className="mt-4 w-full rounded-xl bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/20">
              Create another account
            </button>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-black">Create account</h1>
            <p className="mt-2 text-sm text-white/65">
              Join Strata to apply for roles or manage your hiring pipeline.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <label className="block">
                <span className="text-sm text-white/75">Full name</span>
                <input
                  value={form.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  disabled={loading}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-[#11212a] px-4 py-3 text-white outline-none focus:border-[#21b8b2]"
                />
              </label>

              <label className="block">
                <span className="text-sm text-white/75">Email</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  disabled={loading}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-[#11212a] px-4 py-3 text-white outline-none focus:border-[#21b8b2]"
                />
              </label>

              <label className="block">
                <span className="text-sm text-white/75">Password</span>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => updateField("password", e.target.value)}
                  disabled={loading}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-[#11212a] px-4 py-3 text-white outline-none focus:border-[#21b8b2]"
                />
              </label>

              <label className="block">
                <span className="text-sm text-white/75">Confirm password</span>
                <input
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) => updateField("confirmPassword", e.target.value)}
                  disabled={loading}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-[#11212a] px-4 py-3 text-white outline-none focus:border-[#21b8b2]"
                />
              </label>

              {errorMsg && <p className="text-sm text-red-300">{errorMsg}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#21b8b2] px-5 py-3 font-semibold text-slate-950 transition hover:bg-[#1aa69f] disabled:cursor-not-allowed disabled:opacity-70">
                {loading ? "Creating account..." : "Sign up"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-white/65">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-[#21b8b2]">
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
