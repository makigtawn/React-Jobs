// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FiEdit2, FiSave, FiX, FiGlobe, FiMapPin, FiBriefcase, FiUsers, FiArrowLeft } from 'react-icons/fi';
// import { getEmployerProfile, updateEmployerProfile } from '../services/api';

// const EmployerProfilePage = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [imageError, setImageError] = useState(false);

//   const [profile, setProfile] = useState({
//     company_name: '',
//     logo_url: '',
//     website: '',
//     industry: '',
//     company_size: '',
//     location: '',
//     bio: '',
//   });

//   const [formData, setFormData] = useState({ ...profile });

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const data = await getEmployerProfile();

//       if (data?.profile) {
//         setProfile(data.profile);
//         setFormData(data.profile);
//       } else {
//         setIsEditMode(true);
//       }
//     } catch (err) {
//       setError(err.message || 'Failed to load profile');
//       console.error('Fetch profile error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'logo_url') setImageError(false);

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setSaving(true);
//       setError(null);
//       setSuccess(null);

//       const data = await updateEmployerProfile(formData);

//       setProfile(data.profile);
//       setFormData(data.profile);
//       setSuccess('Profile updated successfully!');
//       setIsEditMode(false);

//       setTimeout(() => setSuccess(null), 3000);
//     } catch (err) {
//       setError(err.message || 'Failed to update profile');
//       console.error('Update profile error:', err);
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleCancel = () => {
//     setFormData(profile);
//     setIsEditMode(false);
//     setError(null);
//     setImageError(false);
//   };

//   const formatWebsiteUrl = (url) => {
//     if (!url) return '';
//     return url.startsWith('http://') || url.startsWith('https://')
//       ? url
//       : `https://${url}`;
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-page-bg flex items-center justify-center">
//         <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-accent"></div>
//       </div>
//     );
//   }

//   return (
//     <section className="min-h-screen bg-page-bg px-4 py-12 text-text-primary md:px-8">
//       <div className="mx-auto w-full max-w-4xl">
        
//         {/* Navigation Link */}
//         <div className="mb-6">
//           <button
//             onClick={() => navigate('/dashboard')}
//             className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-accent transition-colors"
//           >
//             <FiArrowLeft /> Back to Dashboard
//           </button>
//         </div>

//         {/* Main Card */}
//         <div className="bg-surface rounded-2xl shadow-sm border border-border mb-6 overflow-hidden">
          
//           {/* Header Bar */}
//           <div className="px-6 py-5 border-b border-border flex justify-between items-center bg-surface-muted/30">
//             <div>
//               <h1 className="text-2xl font-bold text-text-primary">Employer Profile</h1>
//               <p className="mt-1 text-sm text-text-secondary">
//                 Manage your company information and branding
//               </p>
//             </div>
//             {!isEditMode && (
//               <button
//                 onClick={() => setIsEditMode(true)}
//                 className="inline-flex items-center px-4 py-2 border border-border-strong text-sm font-medium rounded-xl text-text-primary bg-surface hover:bg-surface-strong focus:outline-none focus:ring-2 focus:ring-accent transition-colors shadow-sm"
//               >
//                 <FiEdit2 className="mr-2 text-accent" />
//                 Edit Profile
//               </button>
//             )}
//           </div>

//           {/* Alert Messages */}
//           {error && (
//             <div className="mx-6 mt-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-500 dark:text-red-300">
//               {error}
//             </div>
//           )}

//           {success && (
//             <div className="mx-6 mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-600 dark:text-emerald-400">
//               {success}
//             </div>
//           )}

//           {/* Form / Profile Display */}
//           {isEditMode ? (
//             <form onSubmit={handleSubmit} className="p-6">
//               <div className="space-y-6">
//                 <div>
//                   <label htmlFor="logo_url" className="block text-sm font-medium text-text-secondary mb-2">
//                     Company Logo URL
//                   </label>
//                   <input
//                     type="url"
//                     id="logo_url"
//                     name="logo_url"
//                     value={formData.logo_url || ''}
//                     onChange={handleInputChange}
//                     placeholder="https://example.com/logo.png"
//                     className="w-full px-4 py-2.5 bg-surface-muted border border-border rounded-xl text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
//                   />
//                   {formData.logo_url && !imageError && (
//                     <div className="mt-3">
//                       <img
//                         src={formData.logo_url}
//                         alt="Company logo preview"
//                         className="h-20 w-20 object-contain rounded-xl border border-border bg-surface p-2"
//                         onError={() => setImageError(true)}
//                       />
//                     </div>
//                   )}
//                 </div>

//                 <div>
//                   <label htmlFor="company_name" className="block text-sm font-medium text-text-secondary mb-2">
//                     Company Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="company_name"
//                     name="company_name"
//                     value={formData.company_name || ''}
//                     onChange={handleInputChange}
//                     required
//                     maxLength={255}
//                     placeholder="Your Company Inc."
//                     className="w-full px-4 py-2.5 bg-surface-muted border border-border rounded-xl text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label htmlFor="website" className="block text-sm font-medium text-text-secondary mb-2">
//                       Website
//                     </label>
//                     <input
//                       type="url"
//                       id="website"
//                       name="website"
//                       value={formData.website || ''}
//                       onChange={handleInputChange}
//                       maxLength={500}
//                       placeholder="https://yourcompany.com"
//                       className="w-full px-4 py-2.5 bg-surface-muted border border-border rounded-xl text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="industry" className="block text-sm font-medium text-text-secondary mb-2">
//                       Industry
//                     </label>
//                     <input
//                       type="text"
//                       id="industry"
//                       name="industry"
//                       value={formData.industry || ''}
//                       onChange={handleInputChange}
//                       maxLength={100}
//                       placeholder="e.g., Technology, Healthcare"
//                       className="w-full px-4 py-2.5 bg-surface-muted border border-border rounded-xl text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label htmlFor="company_size" className="block text-sm font-medium text-text-secondary mb-2">
//                       Company Size
//                     </label>
//                     <select
//                       id="company_size"
//                       name="company_size"
//                       value={formData.company_size || ''}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-2.5 bg-surface-muted border border-border rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
//                     >
//                       <option value="">Select company size</option>
//                       <option value="1-10">1-10 employees</option>
//                       <option value="11-50">11-50 employees</option>
//                       <option value="51-200">51-200 employees</option>
//                       <option value="201-500">201-500 employees</option>
//                       <option value="501-1000">501-1000 employees</option>
//                       <option value="1000+">1000+ employees</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label htmlFor="location" className="block text-sm font-medium text-text-secondary mb-2">
//                       Location
//                     </label>
//                     <input
//                       type="text"
//                       id="location"
//                       name="location"
//                       value={formData.location || ''}
//                       onChange={handleInputChange}
//                       maxLength={255}
//                       placeholder="City, State, Country"
//                       className="w-full px-4 py-2.5 bg-surface-muted border border-border rounded-xl text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label htmlFor="bio" className="block text-sm font-medium text-text-secondary mb-2">
//                     Company Bio
//                   </label>
//                   <textarea
//                     id="bio"
//                     name="bio"
//                     value={formData.bio || ''}
//                     onChange={handleInputChange}
//                     rows={5}
//                     placeholder="Tell us about your company, mission, and culture..."
//                     className="w-full px-4 py-2.5 bg-surface-muted border border-border rounded-xl text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none transition-all"
//                   />
//                 </div>

//                 <div className="flex gap-3 pt-4 border-t border-border">
//                   <button
//                     type="submit"
//                     disabled={saving}
//                     className="inline-flex items-center px-6 py-2.5 rounded-xl font-semibold text-accent-foreground bg-accent hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
//                   >
//                     <FiSave className="mr-2" />
//                     {saving ? 'Saving...' : 'Save Changes'}
//                   </button>
//                   <button
//                     type="button"
//                     onClick={handleCancel}
//                     disabled={saving}
//                     className="inline-flex items-center px-6 py-2.5 border border-border-strong rounded-xl text-text-primary bg-surface hover:bg-surface-strong disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//                   >
//                     <FiX className="mr-2" />
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </form>
//           ) : (
//             <div className="p-6">
//               <div className="space-y-6">
//                 <div className="flex items-start gap-6 pb-6 border-b border-border">
//                   {profile.logo_url && !imageError ? (
//                     <img
//                       src={profile.logo_url}
//                       alt={`${profile.company_name} logo`}
//                       className="h-24 w-24 object-contain rounded-2xl border border-border bg-surface-muted p-2 flex-shrink-0"
//                       onError={() => setImageError(true)}
//                     />
//                   ) : (
//                     <div className="h-24 w-24 bg-surface-strong rounded-2xl border border-border flex items-center justify-center flex-shrink-0">
//                       <FiBriefcase className="text-text-secondary text-3xl" />
//                     </div>
//                   )}
//                   <div className="flex-1">
//                     <h2 className="text-3xl font-bold text-text-primary">
//                       {profile.company_name || 'Company Name Not Set'}
//                     </h2>
//                     {profile.industry && (
//                       <p className="mt-1 text-lg text-text-secondary font-medium">{profile.industry}</p>
//                     )}
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {profile.website && (
//                     <div className="flex items-start gap-3">
//                       <div className="p-2 rounded-lg bg-surface-strong text-accent">
//                         <FiGlobe className="text-lg" />
//                       </div>
//                       <div>
//                         <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">Website</h3>
//                         <a
//                           href={formatWebsiteUrl(profile.website)}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-accent hover:underline break-all font-medium"
//                         >
//                           {profile.website}
//                         </a>
//                       </div>
//                     </div>
//                   )}

//                   {profile.location && (
//                     <div className="flex items-start gap-3">
//                       <div className="p-2 rounded-lg bg-surface-strong text-accent">
//                         <FiMapPin className="text-lg" />
//                       </div>
//                       <div>
//                         <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">Location</h3>
//                         <p className="text-text-primary font-medium">{profile.location}</p>
//                       </div>
//                     </div>
//                   )}

//                   {profile.company_size && (
//                     <div className="flex items-start gap-3">
//                       <div className="p-2 rounded-lg bg-surface-strong text-accent">
//                         <FiUsers className="text-lg" />
//                       </div>
//                       <div>
//                         <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">Company Size</h3>
//                         <p className="text-text-primary font-medium">{profile.company_size} employees</p>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {profile.bio && (
//                   <div className="pt-6 border-t border-border">
//                     <h3 className="text-lg font-semibold text-text-primary mb-3">About Us</h3>
//                     <p className="text-text-secondary leading-relaxed whitespace-pre-wrap">
//                       {profile.bio}
//                     </p>
//                   </div>
//                 )}

//                 {!profile.company_name && !profile.bio && !profile.website && (
//                   <div className="text-center py-12">
//                     <FiBriefcase className="mx-auto text-text-secondary/50 text-5xl mb-4" />
//                     <h3 className="text-lg font-medium text-text-primary mb-2">
//                       No profile information yet
//                     </h3>
//                     <p className="text-text-secondary mb-6">
//                       Add your company details to help candidates learn more about you
//                     </p>
//                     <button
//                       onClick={() => setIsEditMode(true)}
//                       className="inline-flex items-center px-5 py-2.5 rounded-xl font-semibold text-accent-foreground bg-accent hover:opacity-90 transition-all shadow-sm"
//                     >
//                       <FiEdit2 className="mr-2" />
//                       Add Profile Information
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default EmployerProfilePage;


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEdit2, FiSave, FiX, FiGlobe, FiMapPin, FiBriefcase, FiUsers, FiTrash2, FiArrowLeft } from 'react-icons/fi';
import { getEmployerProfile, createEmployerProfile, updateEmployerProfile, deleteEmployerProfile } from '../services/api';

const EmployerProfilePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const initialProfileState = {
    company_name: '',
    logo_url: '',
    website: '',
    industry: '',
    company_size: '',
    location: '',
    bio: '',
  };

  const [profile, setProfile] = useState(initialProfileState);
  const [formData, setFormData] = useState(initialProfileState);

  useEffect(() => {
    fetchProfile();
  }, []);

  // READ (Fetch Profile)
  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getEmployerProfile();

      if (data?.profile && (data.profile.company_name || data.profile.id)) {
        setProfile(data.profile);
        setFormData(data.profile);
        setHasProfile(true);
        setIsEditMode(false);
      } else {
        setHasProfile(false);
        setIsEditMode(true);
      }
    } catch (err) {
      if (err.status === 404) {
        setHasProfile(false);
        setIsEditMode(true);
      } else {
        setError(err.message || 'Failed to load profile');
      }
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

  // CREATE / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      let data;
      if (hasProfile) {
        // UPDATE (PUT)
        data = await updateEmployerProfile(formData);
        setSuccess('Profile updated successfully!');
      } else {
        // CREATE (POST)
        data = await createEmployerProfile(formData);
        setSuccess('Profile created successfully!');
        setHasProfile(true);
      }

      setProfile(data.profile);
      setFormData(data.profile);
      setIsEditMode(false);

      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message || 'Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  // DELETE
  const handleDelete = async () => {
    try {
      setDeleting(true);
      setError(null);
      await deleteEmployerProfile();

      setProfile(initialProfileState);
      setFormData(initialProfileState);
      setHasProfile(false);
      setIsEditMode(true);
      setShowDeleteConfirm(false);
      setSuccess('Profile deleted successfully.');
      
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message || 'Failed to delete profile');
    } finally {
      setDeleting(false);
    }
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditMode(false);
    setError(null);
    setImageError(false);
  };

  const formatWebsiteUrl = (url) => {
    if (!url) return '';
    return url.startsWith('http://') || url.startsWith('https://')
      ? url
      : `https://${url}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-page-bg flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-page-bg px-4 py-12 text-text-primary md:px-8">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-accent transition-colors"
          >
            <FiArrowLeft /> Back to Dashboard
          </button>
        </div>

        <div className="bg-surface rounded-2xl shadow-sm border border-border mb-6 overflow-hidden">
          <div className="px-6 py-5 border-b border-border flex justify-between items-center bg-surface-muted/30">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Employer Profile</h1>
              <p className="mt-1 text-sm text-text-secondary">
                Manage your company information and branding
              </p>
            </div>
            {!isEditMode && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEditMode(true)}
                  className="inline-flex items-center px-4 py-2 border border-border-strong text-sm font-medium rounded-xl text-text-primary bg-surface hover:bg-surface-strong focus:outline-none focus:ring-2 focus:ring-accent transition-colors shadow-sm"
                >
                  <FiEdit2 className="mr-2 text-accent" />
                  Edit Profile
                </button>
                {hasProfile && (
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="inline-flex items-center px-3 py-2 border border-red-500/30 text-sm font-medium rounded-xl text-red-500 hover:bg-red-500/10 transition-colors"
                    title="Delete Profile"
                  >
                    <FiTrash2 />
                  </button>
                )}
              </div>
            )}
          </div>

          {error && (
            <div className="mx-6 mt-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-500 dark:text-red-300">
              {error}
            </div>
          )}

          {success && (
            <div className="mx-6 mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-600 dark:text-emerald-400">
              {success}
            </div>
          )}

          {isEditMode ? (
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-6">
                <div>
                  <label htmlFor="logo_url" className="block text-sm font-medium text-text-secondary mb-2">
                    Company Logo URL
                  </label>
                  <input
                    type="url"
                    id="logo_url"
                    name="logo_url"
                    value={formData.logo_url || ''}
                    onChange={handleInputChange}
                    placeholder="https://example.com/logo.png"
                    className="w-full px-4 py-2.5 bg-surface-muted border border-border rounded-xl text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  />
                  {formData.logo_url && !imageError && (
                    <div className="mt-3">
                      <img
                        src={formData.logo_url}
                        alt="Company logo preview"
                        className="h-20 w-20 object-contain rounded-xl border border-border bg-surface p-2"
                        onError={() => setImageError(true)}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="company_name" className="block text-sm font-medium text-text-secondary mb-2">
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
                    className="w-full px-4 py-2.5 bg-surface-muted border border-border rounded-xl text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-text-secondary mb-2">
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
                      className="w-full px-4 py-2.5 bg-surface-muted border border-border rounded-xl text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="industry" className="block text-sm font-medium text-text-secondary mb-2">
                      Industry
                    </label>
                    <input
                      type="text"
                      id="industry"
                      name="industry"
                      value={formData.industry || ''}
                      onChange={handleInputChange}
                      maxLength={100}
                      placeholder="e.g., Technology, Healthcare"
                      className="w-full px-4 py-2.5 bg-surface-muted border border-border rounded-xl text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company_size" className="block text-sm font-medium text-text-secondary mb-2">
                      Company Size
                    </label>
                    <select
                      id="company_size"
                      name="company_size"
                      value={formData.company_size || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 bg-surface-muted border border-border rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
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
                    <label htmlFor="location" className="block text-sm font-medium text-text-secondary mb-2">
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
                      className="w-full px-4 py-2.5 bg-surface-muted border border-border rounded-xl text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-text-secondary mb-2">
                    Company Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio || ''}
                    onChange={handleInputChange}
                    rows={5}
                    placeholder="Tell us about your company, mission, and culture..."
                    className="w-full px-4 py-2.5 bg-surface-muted border border-border rounded-xl text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none transition-all"
                  />
                </div>

                <div className="flex gap-3 pt-4 border-t border-border">
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center px-6 py-2.5 rounded-xl font-semibold text-accent-foreground bg-accent hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                  >
                    <FiSave className="mr-2" />
                    {saving ? 'Saving...' : hasProfile ? 'Save Changes' : 'Create Profile'}
                  </button>
                  {hasProfile && (
                    <button
                      type="button"
                      onClick={handleCancel}
                      disabled={saving}
                      className="inline-flex items-center px-6 py-2.5 border border-border-strong rounded-xl text-text-primary bg-surface hover:bg-surface-strong disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <FiX className="mr-2" />
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </form>
          ) : (
            <div className="p-6">
              <div className="space-y-6">
                <div className="flex items-start gap-6 pb-6 border-b border-border">
                  {profile.logo_url && !imageError ? (
                    <img
                      src={profile.logo_url}
                      alt={`${profile.company_name} logo`}
                      className="h-24 w-24 object-contain rounded-2xl border border-border bg-surface-muted p-2 flex-shrink-0"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="h-24 w-24 bg-surface-strong rounded-2xl border border-border flex items-center justify-center flex-shrink-0">
                      <FiBriefcase className="text-text-secondary text-3xl" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-text-primary">
                      {profile.company_name || 'Company Name Not Set'}
                    </h2>
                    {profile.industry && (
                      <p className="mt-1 text-lg text-text-secondary font-medium">{profile.industry}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {profile.website && (
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-surface-strong text-accent">
                        <FiGlobe className="text-lg" />
                      </div>
                      <div>
                        <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">Website</h3>
                        <a
                          href={formatWebsiteUrl(profile.website)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:underline break-all font-medium"
                        >
                          {profile.website}
                        </a>
                      </div>
                    </div>
                  )}

                  {profile.location && (
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-surface-strong text-accent">
                        <FiMapPin className="text-lg" />
                      </div>
                      <div>
                        <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">Location</h3>
                        <p className="text-text-primary font-medium">{profile.location}</p>
                      </div>
                    </div>
                  )}

                  {profile.company_size && (
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-surface-strong text-accent">
                        <FiUsers className="text-lg" />
                      </div>
                      <div>
                        <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">Company Size</h3>
                        <p className="text-text-primary font-medium">{profile.company_size} employees</p>
                      </div>
                    </div>
                  )}
                </div>

                {profile.bio && (
                  <div className="pt-6 border-t border-border">
                    <h3 className="text-lg font-semibold text-text-primary mb-3">About Us</h3>
                    <p className="text-text-secondary leading-relaxed whitespace-pre-wrap">
                      {profile.bio}
                    </p>
                  </div>
                )}

                {!profile.company_name && !profile.bio && !profile.website && (
                  <div className="text-center py-12">
                    <FiBriefcase className="mx-auto text-text-secondary/50 text-5xl mb-4" />
                    <h3 className="text-lg font-medium text-text-primary mb-2">
                      No profile information yet
                    </h3>
                    <p className="text-text-secondary mb-6">
                      Add your company details to help candidates learn more about you
                    </p>
                    <button
                      onClick={() => setIsEditMode(true)}
                      className="inline-flex items-center px-5 py-2.5 rounded-xl font-semibold text-accent-foreground bg-accent hover:opacity-90 transition-all shadow-sm"
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

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-surface border border-border rounded-2xl max-w-md w-full p-6 shadow-xl">
              <h3 className="text-xl font-bold text-text-primary mb-2">Delete Profile?</h3>
              <p className="text-text-secondary text-sm mb-6">
                Are you sure you want to delete your company profile? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={deleting}
                  className="px-4 py-2 border border-border-strong rounded-xl text-text-primary hover:bg-surface-strong transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="px-4 py-2 rounded-xl text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 transition-colors"
                >
                  {deleting ? 'Deleting...' : 'Delete Profile'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EmployerProfilePage;
