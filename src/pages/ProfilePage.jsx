import { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth";
import { getProfile, updateProfile } from "../services/api";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    company_name: "",
    website: "",
    company_description: "",
    contact_email: "",
    contact_phone: "",
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const data = await getProfile();
        if (data) {
          setFormData({
            full_name: data.full_name || "",
            company_name: data.company_name || "",
            website: data.website || "",
            company_description: data.company_description || "",
            contact_email: data.contact_email || "",
            contact_phone: data.contact_phone || "",
          });
        }
      } catch (err) {
        console.error("Profile Fetch Error:", err);
        toast.error("Failed to load profile details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile(formData);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Profile Update Error:", err);
      toast.error("Could not update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-slate-500">
        Loading profile configuration...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-surfacedark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-surfacemb-1">
          Employer Profile
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          Manage your contact credentials and corporate brand details.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent px-4 py-2.5 text-sm dark:text-surface outline-none focus:border-indigo-500"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Company Name
              </label>
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent px-4 py-2.5 text-sm dark:text-surface outline-none focus:border-indigo-500"
                placeholder="Strata AI"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Contact Email
              </label>
              <input
                type="email"
                name="contact_email"
                value={formData.contact_email}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent px-4 py-2.5 text-sm dark:text-surface outline-none focus:border-indigo-500"
                placeholder="hiring@company.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Contact Phone
              </label>
              <input
                type="text"
                name="contact_phone"
                value={formData.contact_phone}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent px-4 py-2.5 text-sm dark:text-surface outline-none focus:border-indigo-500"
                placeholder="+1 234 567 890"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Company Website URL
            </label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent px-4 py-2.5 text-sm dark:text-surface outline-none focus:border-indigo-500"
              placeholder="https://company.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Company Description
            </label>
            <textarea
              name="company_description"
              value={formData.company_description}
              onChange={handleChange}
              rows="4"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent px-4 py-2.5 text-sm dark:text-surface outline-none focus:border-indigo-500 resize-none"
              placeholder="Tell applicants about your organization..."></textarea>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-surfacedark:hover:bg-slate-100 px-5 py-2.5 text-sm font-semibold text-surfacedark:text-slate-950 shadow transition-colors disabled:opacity-50">
              {saving ? "Saving Updates..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
