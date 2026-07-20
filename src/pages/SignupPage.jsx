

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
      const { error } = await signup({
        email: form.email,
        password: form.password,
      });

      if (error) {
        // Map known backend error messages to friendly copy.
        const msg = error.message || "";
        if (
          msg.toLowerCase().includes("already in use") ||
          msg.toLowerCase().includes("already registered") ||
          msg.toLowerCase().includes("unique constraint") ||
          msg.includes("409")
        ) {
          setErrorMsg("This email is already registered. Try logging in instead.");
        } else {
          setErrorMsg(msg || "Unable to create your account.");
        }
        return; // stop here — don't navigate on error
      }

      navigate("/login", {
        replace: true,
        state: { email: form.email.trim().toLowerCase() },
      });
    } catch (err) {
      const msg = err.message || "";
      if (
        msg.toLowerCase().includes("already in use") ||
        msg.toLowerCase().includes("already registered") ||
        msg.toLowerCase().includes("unique constraint") ||
        msg.includes("409")
      ) {
        setErrorMsg("This email is already registered. Try logging in instead.");
      } else {
        setErrorMsg(msg || "Unable to create your account.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-page-bg dark:bg-page-bg px-4 py-24">
      <div className="mx-auto max-w-md rounded-2xl border border-surface/10 bg-white/10 dark:bg-[#0d1f25] p-8 text-text-primary dark:text-text-primary  shadow-2xl">
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
      </div>
    </section>
  );
};

export default SignupPage;
