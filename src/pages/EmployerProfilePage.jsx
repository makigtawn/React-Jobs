import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEdit2, FiSave, FiX, FiGlobe, FiMapPin, FiBriefcase, FiUsers } from 'react-icons/fi';
import { getEmployerProfile, updateEmployerProfile } from '../services/api';

const EmployerProfilePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [imageError, setImageError] = useState(false);

  const [profile, setProfile] = useState({
    company_name: '',
    logo_url: '',
    website: '',
    industry: '',
    company_size: '',
    location: '',
    bio: '',
  });

  const [formData, setFormData] = useState({ ...profile });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getEmployerProfile();

      if (data?.profile) {
        setProfile(data.profile);
        setFormData(data.profile);
      } else {
        setIsEditMode(true);
      }
    } catch (err) {
      setError(err.message || 'Failed to load profile');
      console.error('Fetch profile error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'logo_url') setImageError(false);

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      const data = await updateEmployerProfile(formData);

      setProfile(data.profile);
      setFormData(data.profile);
      setSuccess('Profile updated successfully!');
      setIsEditMode(false);

      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message || 'Failed to update profile');
      console.error('Update profile error:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditMode(false);
    setError(null);
    setImageError(false);
  };

  // Helper function to safely format website URLs
  const formatWebsiteUrl = (url) => {
    if (!url) return '';
    return url.startsWith('http://') || url.startsWith('https://')
      ? url
      : `https://${url}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Employer Profile</h1>
              <p className="mt-1 text-sm text-gray-600">
                Manage your company information and branding
              </p>
            </div>
            {!isEditMode && (
              <button
                onClick={() => setIsEditMode(true)}
                className="inline-flex items-center px-4 py-2 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                <FiEdit2 className="mr-2" />
                Edit Profile
              </button>
            )}
          </div>

          {error && (
            <div className="mx-6 mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {success && (
            <div className="mx-6 mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-800">{success}</p>
            </div>
          )}

          {isEditMode ? (
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-6">
                <div>
                  <label htmlFor="logo_url" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Logo URL
                  </label>
                  <input
                    type="url"
                    id="logo_url"
                    name="logo_url"
                    value={formData.logo_url || ''}
                    onChange={handleInputChange}
                    placeholder="https://example.com/logo.png"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  {formData.logo_url && !imageError && (
                    <div className="mt-3">
                      <img
                        src={formData.logo_url}
                        alt="Company logo preview"
                        className="h-20 w-20 object-contain rounded-lg border border-gray-200"
                        onError={() => setImageError(true)}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="company_name" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="company_name"
                    name="company_name"
                    value={formData.company_name || ''}
                    onChange={handleInputChange}
                    required
                    maxLength={255}
                    placeholder="Your Company Inc."
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website || ''}
                    onChange={handleInputChange}
                    maxLength={500}
                    placeholder="https://yourcompany.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">
                    Industry
                  </label>
                  <input
                    type="text"
                    id="industry"
                    name="industry"
                    value={formData.industry || ''}
                    onChange={handleInputChange}
                    maxLength={100}
                    placeholder="e.g., Technology, Healthcare, Finance"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="company_size" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Size
                  </label>
                  <select
                    id="company_size"
                    name="company_size"
                    value={formData.company_size || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Select company size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="501-1000">501-1000 employees</option>
                    <option value="1000+">1000+ employees</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location || ''}
                    onChange={handleInputChange}
                    maxLength={255}
                    placeholder="City, State, Country"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio || ''}
                    onChange={handleInputChange}
                    rows={6}
                    placeholder="Tell us about your company, mission, and culture..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <FiSave className="mr-2" />
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={saving}
                    className="inline-flex items-center px-6 py-2.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <FiX className="mr-2" />
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="p-6">
              <div className="space-y-6">
                <div className="flex items-start gap-6 pb-6 border-b border-gray-200">
                  {profile.logo_url && !imageError ? (
                    <img
                      src={profile.logo_url}
                      alt={`${profile.company_name} logo`}
                      className="h-24 w-24 object-contain rounded-lg border border-gray-200 flex-shrink-0"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="h-24 w-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FiBriefcase className="text-gray-400 text-3xl" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-gray-900">
                      {profile.company_name || 'Company Name Not Set'}
                    </h2>
                    {profile.industry && (
                      <p className="mt-1 text-lg text-gray-600">{profile.industry}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {profile.website && (
                    <div className="flex items-start gap-3">
                      <FiGlobe className="text-indigo-600 text-xl mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Website</h3>
                        <a
                          href={formatWebsiteUrl(profile.website)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-800 hover:underline break-all"
                        >
                          {profile.website}
                        </a>
                      </div>
                    </div>
                  )}

                  {profile.location && (
                    <div className="flex items-start gap-3">
                      <FiMapPin className="text-indigo-600 text-xl mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Location</h3>
                        <p className="text-gray-900">{profile.location}</p>
                      </div>
                    </div>
                  )}

                  {profile.company_size && (
                    <div className="flex items-start gap-3">
                      <FiUsers className="text-indigo-600 text-xl mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Company Size</h3>
                        <p className="text-gray-900">{profile.company_size} employees</p>
                      </div>
                    </div>
                  )}
                </div>

                {profile.bio && (
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">About Us</h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {profile.bio}
                    </p>
                  </div>
                )}

                {!profile.company_name && !profile.bio && !profile.website && (
                  <div className="text-center py-12">
                    <FiBriefcase className="mx-auto text-gray-400 text-5xl mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No profile information yet
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Add your company details to help candidates learn more about you
                    </p>
                    <button
                      onClick={() => setIsEditMode(true)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    >
                      <FiEdit2 className="mr-2" />
                      Add Profile Information
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployerProfilePage;
