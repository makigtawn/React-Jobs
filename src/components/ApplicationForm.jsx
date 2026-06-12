import { useState } from "react";
import { toast } from "react-toastify";
import { apiRequest } from "../services/api";
import { useAuth } from "../context/useAuth";

const initialForm = {
  fullName: "",
  email: "",
  resumeUrl: "",
  resumeText: "",
  skills: "",
  experience: "",
  education: "",
  portfolioUrl: "",
  githubUrl: "",
};

const ApplicationForm = ({ jobId }) => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    ...initialForm,
    fullName: user?.user_metadata?.full_name || "",
    email: user?.email || "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    if (form.fullName.trim().length < 2) return "Full name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      return "A valid email is required.";
    }
    if (form.resumeText.trim().length < 80) {
      return "Resume text must be at least 80 characters.";
    }
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
      await apiRequest("/api/applications", {
        method: "POST",
        body: JSON.stringify({ ...form, jobId }),
      });
      toast.success("Application submitted and ranked successfully");
      setForm({
        ...initialForm,
        fullName: user?.user_metadata?.full_name || "",
        email: user?.email || "",
      });
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-black/80 p-6 rounded-lg shadow-md mt-6">
      <h3 className="text-xl font-bold mb-4">Apply for this job</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            value={form.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            placeholder="Full name"
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-[#21b8b2]"
          />
          <input
            type="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="Email"
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-[#21b8b2]"
          />
        </div>

        <input
          value={form.resumeUrl}
          onChange={(e) => updateField("resumeUrl", e.target.value)}
          placeholder="Resume URL"
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-[#21b8b2]"
        />

        <textarea
          value={form.resumeText}
          onChange={(e) => updateField("resumeText", e.target.value)}
          rows={7}
          placeholder="Paste resume text"
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-[#21b8b2]"
        />

        <div className="grid gap-4 sm:grid-cols-3">
          <textarea
            value={form.skills}
            onChange={(e) => updateField("skills", e.target.value)}
            rows={3}
            placeholder="Skills"
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-[#21b8b2]"
          />
          <textarea
            value={form.experience}
            onChange={(e) => updateField("experience", e.target.value)}
            rows={3}
            placeholder="Experience"
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-[#21b8b2]"
          />
          <textarea
            value={form.education}
            onChange={(e) => updateField("education", e.target.value)}
            rows={3}
            placeholder="Education"
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-[#21b8b2]"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <input
            value={form.portfolioUrl}
            onChange={(e) => updateField("portfolioUrl", e.target.value)}
            placeholder="Portfolio URL"
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-[#21b8b2]"
          />
          <input
            value={form.githubUrl}
            onChange={(e) => updateField("githubUrl", e.target.value)}
            placeholder="GitHub URL"
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-[#21b8b2]"
          />
        </div>

        {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-[#21b8b2] px-5 py-3 font-semibold text-slate-950 transition hover:bg-[#1aa69f] disabled:cursor-not-allowed disabled:opacity-70">
          {loading ? "Analyzing application..." : "Submit application"}
        </button>
      </form>
    </div>
  );
};

export default ApplicationForm;
