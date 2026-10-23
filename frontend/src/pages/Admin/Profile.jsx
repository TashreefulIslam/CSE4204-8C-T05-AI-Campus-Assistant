import { useEffect, useMemo, useState } from "react";
import { Edit2 } from "lucide-react";
import DashboardLayout from "../../components/admin/DashboardLayout";
import Modal from "../../components/admin/Modal";
import LoadingSpinner from "../../components/admin/LoadingSpinner";
import { getAdminProfile, updateAdminProfile } from "../../services/adminService";
import { updatePassword } from "../../services/profileService";

const emptyFormData = {
  name: "",
  email: "",
  phone: "",
  university_id: "",
  old_password: "",
  new_password: "",
  confirm_password: "",
};

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState(emptyFormData);
  const [saving, setSaving] = useState(false);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const data = await getAdminProfile();
      setProfile(data || null);
    } catch {
      setError("Failed to load profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const initials = useMemo(() => {
    if (!profile?.name) return "AD";
    return profile.name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() || "")
      .join("") || "AD";
  }, [profile]);

  const openEditModal = () => {
    setEditFormData({
      name: profile?.name || "",
      email: profile?.email || "",
      phone: profile?.phone || "",
      university_id: profile?.university_id || "",
      old_password: "",
      new_password: "",
      confirm_password: "",
    });
    setError("");
    setSuccess("");
    setEditModalOpen(true);
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();

    // Validate password fields if trying to change password
    if (editFormData.new_password || editFormData.old_password || editFormData.confirm_password) {
      if (!editFormData.old_password) {
        setError("Old password is required to change password.");
        return;
      }
      if (!editFormData.new_password) {
        setError("New password is required.");
        return;
      }
      if (editFormData.new_password !== editFormData.confirm_password) {
        setError("New password and confirm password do not match.");
        return;
      }
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const payload = {
        name: editFormData.name,
        email: editFormData.email,
        role: profile.role,
        department: profile.department,
        university_id: editFormData.university_id,
        phone: editFormData.phone,
      };

      await updateAdminProfile(profile.id, payload);

      if (editFormData.new_password) {
        await updatePassword({
          current_password: editFormData.old_password,
          new_password: editFormData.new_password,
          new_password_confirmation: editFormData.confirm_password,
        });
      }
      setSuccess("Profile updated successfully.");
      setEditModalOpen(false);
      await loadProfile();
    } catch (err) {
      const message = err?.response?.data?.message || "Failed to update profile.";
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout title="Profile" subtitle="Administrator account information">
      <div className="space-y-4">
        {error ? <div className="animate-in fade-in slide-in-from-top-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 shadow-sm">{error}</div> : null}
        {success ? <div className="animate-in fade-in slide-in-from-top-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 shadow-sm">{success}</div> : null}

        <div className="max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg sm:p-8">
          {loading ? (
            <div className="flex justify-center p-8">
              <LoadingSpinner size="lg" />
            </div>
          ) : error && !success ? (
            <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>
          ) : profile ? (
            <div className="space-y-8">
              <div className="flex animate-in fade-in items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-blue-200 text-3xl font-bold text-blue-700 shadow-md">{initials}</div>
                  <div>
                    <h2 className="text-3xl font-bold text-slate-800">{profile.name}</h2>
                    <p className="mt-1 inline-flex rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold uppercase tracking-wider text-blue-700">{profile.role}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={openEditModal}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg hover:from-blue-700 hover:to-blue-800 active:scale-95"
                >
                  <Edit2 size={16} />
                  Edit Profile
                </button>
              </div>

              <div className="grid animate-in fade-in gap-4 md:grid-cols-2" style={{ animationDelay: "100ms" }}>
                <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-6 transition-all duration-200 hover:shadow-md">
                  <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">Email Address</p>
                  <p className="mt-3 text-lg font-semibold text-slate-800">{profile.email || "-"}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-purple-50 to-purple-100 p-6 transition-all duration-200 hover:shadow-md">
                  <p className="text-xs uppercase tracking-widest text-purple-600 font-bold">Role</p>
                  <p className="mt-3 text-lg font-semibold text-purple-800">{profile.role || "-"}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-amber-50 to-amber-100 p-6 transition-all duration-200 hover:shadow-md">
                  <p className="text-xs uppercase tracking-widest text-amber-600 font-bold">Department</p>
                  <p className="mt-3 text-lg font-semibold text-amber-800">{profile.department || "-"}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-green-50 to-green-100 p-6 transition-all duration-200 hover:shadow-md">
                  <p className="text-xs uppercase tracking-widest text-green-600 font-bold">University ID</p>
                  <p className="mt-3 text-lg font-semibold text-green-800">{profile.university_id || "-"}</p>
                </div>
                {profile.phone && (
                  <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-teal-50 to-teal-100 p-6 transition-all duration-200 hover:shadow-md">
                    <p className="text-xs uppercase tracking-widest text-teal-600 font-bold">Phone</p>
                    <p className="mt-3 text-lg font-semibold text-teal-800">{profile.phone || "-"}</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-500">No profile data available.</p>
          )}
        </div>
      </div>

      <Modal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit Profile"
        footer={
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setEditModalOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-slate-50 hover:border-slate-300">
              Cancel
            </button>
            <button type="submit" form="edit-profile-form" disabled={saving} className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg hover:from-blue-700 hover:to-blue-800 disabled:cursor-not-allowed disabled:from-blue-300 disabled:to-blue-300 active:scale-95 disabled:active:scale-100 inline-flex items-center gap-2">
              {saving ? (
                <>
                  <LoadingSpinner size="sm" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        }
      >
        <form id="edit-profile-form" onSubmit={handleEditSubmit} className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Full Name</label>
              <input name="name" value={editFormData.name} onChange={handleEditChange} required className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all duration-200 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">University ID</label>
              <input name="university_id" value={editFormData.university_id} onChange={handleEditChange} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all duration-200 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
              <input type="email" name="email" value={editFormData.email} onChange={handleEditChange} required className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all duration-200 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Phone</label>
              <input name="phone" value={editFormData.phone} onChange={handleEditChange} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all duration-200 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100" />
            </div>
          </div>

          <div className="border-t border-slate-200 pt-5">
            <p className="mb-4 text-sm font-semibold text-slate-700">Change Password (Optional)</p>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Old Password</label>
                <input type="password" name="old_password" value={editFormData.old_password} onChange={handleEditChange} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all duration-200 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100" />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">New Password</label>
                  <input type="password" name="new_password" value={editFormData.new_password} onChange={handleEditChange} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all duration-200 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Confirm Password</label>
                  <input type="password" name="confirm_password" value={editFormData.confirm_password} onChange={handleEditChange} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all duration-200 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100" />
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default Profile;