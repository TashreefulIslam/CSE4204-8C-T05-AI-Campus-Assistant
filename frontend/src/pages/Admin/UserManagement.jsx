import { useEffect, useMemo, useState } from "react";
import { Plus, Trash2, Edit2 } from "lucide-react";
import DashboardLayout from "../../components/admin/DashboardLayout";
import Modal from "../../components/admin/Modal";
import LoadingSpinner from "../../components/admin/LoadingSpinner";
import { createUser, deleteUser, getUsers, updateUser } from "../../services/adminService";

const emptyForm = {
  name: "",
  email: "",
  department: "",
  role: "student",
  password: "",
  password_confirmation: "",
  university_id: "",
  phone: "",
  semester: "",
};

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getUsers();
      setUsers(Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : []);
    } catch {
      setError("Failed to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const search = query.toLowerCase();

    return users.filter((user) => {
      const haystack = [user?.name, user?.email, user?.role, user?.department, user?.university_id]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = !search || haystack.includes(search);
      const matchesRole = roleFilter === "all" || user?.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [users, query, roleFilter]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openCreate = () => {
    setEditingUser(null);
    setFormData(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      department: user?.department || "",
      role: user?.role || "student",
      password: "",
      password_confirmation: "",
      university_id: user?.university_id || "",
      phone: user?.phone || "",
      semester: user?.semester || "",
    });
    setModalOpen(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const payload = { ...formData };
      if (editingUser) {
        await updateUser(editingUser.id, payload);
        setSuccess("User updated successfully.");
      } else {
        await createUser(payload);
        setSuccess("User created successfully.");
      }

      setModalOpen(false);
      setFormData(emptyForm);
      setEditingUser(null);
      await loadUsers();
    } catch (err) {
      const validationErrors = err?.response?.data?.errors;
      const apiMessage = validationErrors
        ? Object.values(validationErrors).flat().join(" ")
        : err?.response?.data?.message || "Failed to save user.";
      setError(apiMessage);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (user) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");
      await deleteUser(user.id);
      setSuccess("User deleted successfully.");
      await loadUsers();
    } catch {
      setError("Failed to delete user. Please try again.");
    }
  };

  return (
    <DashboardLayout title="User Management" subtitle="Manage student and teacher accounts">
      <div className="space-y-4">
        {error ? (
          <div className="animate-in fade-in slide-in-from-top-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 shadow-sm">{error}</div>
        ) : null}

        {success ? (
          <div className="animate-in fade-in slide-in-from-top-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 shadow-sm">{success}</div>
        ) : null}

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-md transition-shadow duration-300 hover:shadow-lg">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-1 flex-col gap-3 md:flex-row">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search users..."
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              >
                <option value="all">All roles</option>
                <option value="admin">Admin</option>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
              </select>
            </div>

            <button type="button" onClick={openCreate} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg hover:from-blue-700 hover:to-blue-800 active:scale-95">
              <Plus size={16} />
              Add User
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition-shadow duration-300 hover:shadow-lg">
          {loading ? (
            <div className="flex justify-center p-8">
              <LoadingSpinner size="lg" />
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-4">
              <p className="text-sm text-slate-500">No users found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Role</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Department</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Semester</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Joined</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, idx) => (
                    <tr key={user.id} className={`border-b border-slate-100 transition-colors duration-200 hover:bg-slate-50 ${idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-slate-800">{user.name}</p>
                          <p className="text-xs text-slate-500">{user.university_id || "-"}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          user.role === "admin" ? "bg-purple-100 text-purple-700" :
                          user.role === "teacher" ? "bg-amber-100 text-amber-700" :
                          "bg-blue-100 text-blue-700"
                        }`}>{user.role}</span>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{user.department || "-"}</td>
                      <td className="px-6 py-4 text-slate-600">{user.phone || "-"}</td>
                      <td className="px-6 py-4 text-slate-600">{user.semester || "-"}</td>
                      <td className="px-6 py-4 text-slate-600 text-sm">{user.created_at ? new Date(user.created_at).toLocaleDateString() : "-"}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button type="button" onClick={() => openEdit(user)} className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 transition-all duration-200 hover:bg-slate-100 hover:border-slate-300">
                            <Edit2 size={14} />
                            Edit
                          </button>
                          <button type="button" onClick={() => handleDelete(user)} className="inline-flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-600 transition-all duration-200 hover:bg-rose-100 hover:border-rose-300">
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingUser ? "Edit User" : "Create User"}
        footer={
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setModalOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-slate-50 hover:border-slate-300">
              Cancel
            </button>
            <button type="submit" form="user-form" disabled={saving} className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg hover:from-blue-700 hover:to-blue-800 disabled:cursor-not-allowed disabled:from-blue-300 disabled:to-blue-300 active:scale-95 disabled:active:scale-100 inline-flex items-center gap-2">
              {saving ? (
                <>
                  <LoadingSpinner size="sm" />
                  Saving...
                </>
              ) : editingUser ? (
                "Save Changes"
              ) : (
                "Create User"
              )}
            </button>
          </div>
        }
      >
        <form id="user-form" onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Full Name</label>
              <input name="name" value={formData.name} onChange={handleChange} required className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all duration-200 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">University ID</label>
              <input name="university_id" value={formData.university_id} onChange={handleChange} required className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all duration-200 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all duration-200 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Role</label>
              <select name="role" value={formData.role} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all duration-200 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100">
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Department</label>
            <input name="department" value={formData.department} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all duration-200 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Phone</label>
              <input name="phone" value={formData.phone} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all duration-200 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Semester</label>
              <input name="semester" value={formData.semester} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all duration-200 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100" />
            </div>
          </div>

          {!editingUser ? (
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all duration-200 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Confirm Password</label>
                <input type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} required className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all duration-200 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100" />
              </div>
            </div>
          ) : null}
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default UserManagement;