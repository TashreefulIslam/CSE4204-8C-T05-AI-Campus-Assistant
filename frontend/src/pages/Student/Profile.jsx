import { useEffect, useState } from "react";
import StudentLayout from "../../components/student/StudentLayout";
import { getProfile, updatePassword, updateProfile } from "../../services/profileService";

const Field = ({ label, ...props }) => (
  <label className="block text-sm font-medium text-slate-700">
    {label}
    <input {...props} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500" />
  </label>
);

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ email: "", phone: "" });
  const [password, setPassword] = useState({ current_password: "", new_password: "", new_password_confirmation: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const change = (setter) => (event) => setter((value) => ({ ...value, [event.target.name]: event.target.value }));
  const apiError = (err) => err.response?.data?.message || Object.values(err.response?.data?.errors || {}).flat()[0] || "Request failed.";

  useEffect(() => {
    getProfile().then((data) => {
      setProfile(data);
      setForm({ email: data.email || "", phone: data.phone || "" });
    }).catch((err) => setError(apiError(err))).finally(() => setLoading(false));
  }, []);

  const saveProfile = async (event) => {
    event.preventDefault();
    try {
      setSaving(true); setError(""); setMessage("");
      const data = await updateProfile(form);
      setProfile(data); localStorage.setItem("user", JSON.stringify(data)); setMessage("Profile updated successfully.");
    } catch (err) { setError(apiError(err)); } finally { setSaving(false); }
  };

  const savePassword = async (event) => {
    event.preventDefault();
    try {
      setSaving(true); setError(""); setMessage("");
      await updatePassword(password);
      setPassword({ current_password: "", new_password: "", new_password_confirmation: "" });
      setMessage("Password updated successfully.");
    } catch (err) { setError(apiError(err)); } finally { setSaving(false); }
  };

  return (
    <StudentLayout title="Profile" subtitle="Manage your student account information.">
      {loading ? <p className="text-sm text-slate-500">Loading profile...</p> : (
        <div className="grid max-w-5xl gap-6 lg:grid-cols-2">
          <form onSubmit={saveProfile} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800">Personal information</h2>
            <Field label="Name" value={profile?.name || ""} readOnly />
            <Field label="UID" value={profile?.university_id || ""} readOnly />
            <Field label="Email" type="email" name="email" value={form.email} onChange={change(setForm)} required />
            <Field label="Phone" name="phone" value={form.phone} onChange={change(setForm)} />
            <button disabled={saving} className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50">Save Profile</button>
          </form>
          <form onSubmit={savePassword} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800">Change password</h2>
            <Field label="Current password" type="password" name="current_password" value={password.current_password} onChange={change(setPassword)} required />
            <Field label="New password" type="password" name="new_password" value={password.new_password} onChange={change(setPassword)} required />
            <Field label="Confirm new password" type="password" name="new_password_confirmation" value={password.new_password_confirmation} onChange={change(setPassword)} required />
            <button disabled={saving} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 disabled:opacity-50">Update Password</button>
          </form>
        </div>
      )}
      {message && <p className="mt-4 text-sm text-emerald-700">{message}</p>}
      {error && <p className="mt-4 text-sm text-rose-700">{error}</p>}
    </StudentLayout>
  );
};

export default Profile;
