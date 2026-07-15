import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import Button from "../components/Button";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/jobs";

  const [form, setForm] = useState({
    email: location.state?.email || "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (location.state?.email) {
      setForm((prev) => ({ ...prev, email: location.state.email }));
    }
  }, [location.state?.email]);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    if (!emailRegex.test(form.email))
      return "Please enter a valid email address !";
    if (form.password.length < 8)
      return "Password must be at least 8 characters !";
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
      const { error } = await login(form.email, form.password);
      if (error) {
        if (
          error.message?.toLowerCase().includes("invalid login credentials") ||
          error.message?.toLowerCase().includes("invalid credentials")
        ) {
          setErrorMsg(
            "Invalid email or password. Please check your credentials and ensure you've verified your email.",
          );
        } else if (
          error.message?.toLowerCase().includes("email not confirmed")
        ) {
          setErrorMsg(
            "Please verify your email address first. Check your inbox for the verification link.",
          );
        } else {
          setErrorMsg(error.message || "Unable to log in.");
        }
        return;
      }

      navigate(redirectTo, { replace: true });
    } catch (err) {
      console.error("Login error:", err);
      setErrorMsg(err.message || "Unable to log in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-page-bg  dark:bg-page-bg px-4 py-24">
      <div className="mx-auto max-w-md rounded-2xl text-text-primary dark:text-text-primary  border border-surface/10 bg-white/10 dark:bg-[#0d1f25] p-8  shadow-2xl">
        <h1 className="text-3xl text-center font-black">Login</h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label className="block">
            <span className="text-sm ">Email</span>
            <input
              type="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              disabled={loading}
              className="mt-2 w-full rounded-xl border border-border-strong bg-surface-strong px-4 py-3  outline-none focus:border-border"
            />
          </label>

          <label className="block">
            <span className="text-sm ">Password</span>
            <input
              type="password"
              value={form.password}
              onChange={(e) => updateField("password", e.target.value)}
              disabled={loading}
              className="mt-2 w-full rounded-xl border border-border-strong bg-surface-strong px-4 py-3 outline-none focus:border-border"
            />
          </label>

          {errorMsg && (
            <p className="text-sm text-center text-text-primary dark:text-text-primary ">
              {errorMsg}
            </p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-accent font-semibold hover:bg-[#1aa69f] disabled:cursor-not-allowed"
            style={{ padding: "12px 20px" }}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="mt-6 text-text-secondary rounded-lg bg-blue-900/20 border border-blue-700/30 p-4">
          <p className="text-xs ">
            <strong> Tip:</strong> After signing up, check your email for a
            verification link. You'll need to verify your email before you can
            log in.
          </p>
        </div>

        <p className="mt-6 text-center text-text-secondary text-sm ">
          Need an account?{" "}
          <Link to="/signup" className="font-semibold hover:font-bold">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default LoginPage;
