import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import Button from "../components/Button";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/jobs";

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    if (!emailRegex.test(form.email))
      return "Please enter a valid email address.";
    if (form.password.length < 6)
      return "Password must be at least 6 characters.";
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
    const { error } = await login(form.email, form.password);
    setLoading(false);

    if (error) {
      if (
        error.message?.toLowerCase().includes("invalid login credentials") ||
        error.message?.toLowerCase().includes("invalid credentials")
      ) {
        setErrorMsg(
          "Invalid email or password. Please check your credentials and ensure you've verified your email.",
        );
      } else if (error.message?.toLowerCase().includes("email not confirmed")) {
        setErrorMsg(
          "Please verify your email address first. Check your inbox for the verification link.",
        );
      } else {
        setErrorMsg(error.message || "Unable to log in.");
      }
      return;
    }

    navigate(redirectTo, { replace: true });
  };

  return (
    <section className="min-h-screen bg-[#1f3238] dark:bg-[#152a31] px-4 py-24">
      <div className="mx-auto max-w-md rounded-2xl border border-surface/10 bg-[#21b8b2] dark:bg-[#0d1f25] p-8 text-surfaceshadow-2xl">
        <h1 className="text-3xl font-black">Welcome back</h1>
        <p className="mt-2 text-sm text-surface/65">
          Log in to post jobs, apply, and review candidates.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label className="block">
            <span className="text-sm text-surface/75">Email</span>
            <input
              type="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              disabled={loading}
              className="mt-2 w-full rounded-xl border border-surface/10 bg-[#1f3238] px-4 py-3 text-surfaceoutline-none focus:border-[#21b8b2]"
            />
          </label>

          <label className="block">
            <span className="text-sm text-surface/75">Password</span>
            <input
              type="password"
              value={form.password}
              onChange={(e) => updateField("password", e.target.value)}
              disabled={loading}
              className="mt-2 w-full rounded-xl border border-surface/10 bg-[#1f3238] px-4 py-3 text-surfaceoutline-none focus:border-[#21b8b2]"
            />
          </label>

          {errorMsg && (
            <div className="rounded-lg bg-red-900/20 border border-red-700/30 p-3">
              <p className="text-sm text-red-200">{errorMsg}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#21b8b2] font-semibold text-slate-950 hover:bg-[#1aa69f] disabled:cursor-not-allowed"
            style={{ padding: "12px 20px" }}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="mt-6 rounded-lg bg-blue-900/20 border border-blue-700/30 p-4">
          <p className="text-xs text-blue-200">
            <strong> Tip:</strong> After signing up, check your email for a
            verification link. You'll need to verify your email before you can
            log in.
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-surface/65">
          Need an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-surfacehover:text-[#1f3238]">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default LoginPage;
