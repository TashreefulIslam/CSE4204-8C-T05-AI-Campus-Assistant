import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import DashboardLayout from "../../components/admin/DashboardLayout";
import Modal from "../../components/admin/Modal";
import LoadingSpinner from "../../components/admin/LoadingSpinner";
import { createNotice, deleteNotice, getNotices } from "../../services/adminService";

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
};

const emptyForm = {
  title: "",
  description: "",
  created_by: "",
};

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const currentUser = getStoredUser();

  const loadNotices = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getNotices();
      setNotices(Array.isArray(data) ? data : data?.data || []);
    } catch {
      setError("Failed to load notices. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotices();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");
      const dataToSubmit = {
        ...formData,
        created_by: currentUser?.id || "",
      };
      await createNotice(dataToSubmit);
      setSuccess("Notice published successfully.");
      setFormData(emptyForm);
      setModalOpen(false);
      await loadNotices();
    } catch (err) {
      const message = err?.response?.data?.message || "Failed to publish notice.";
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (notice) => {
    const confirmed = window.confirm("Are you sure you want to delete this notice?");
    if (!confirmed) return;

    try {
      await deleteNotice(notice.id);
      setSuccess("Notice deleted successfully.");
      await loadNotices();
    } catch {
      setError("Failed to delete notice. Please try again.");
    }
  };

  return (
    <DashboardLayout title="Notice" subtitle="Notice publication and management">
      <div className="space-y-4">
        {error ? <div className="animate-in fade-in slide-in-from-top-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 shadow-sm">{error}</div> : null}
        {success ? <div className="animate-in fade-in slide-in-from-top-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 shadow-sm">{success}</div> : null}

        <div className="flex justify-end">
          <button type="button" onClick={() => setModalOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg hover:from-blue-700 hover:to-blue-800 active:scale-95">
            <Plus size={16} />
            Publish Notice
          </button>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-md transition-shadow duration-300 hover:shadow-lg">
          {loading ? (
            <div className="flex justify-center p-8">
              <LoadingSpinner size="lg" />
            </div>
          ) : notices.length === 0 ? (
            <div className="p-4">
              <p className="text-sm text-slate-500">No notices found.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notices.map((notice, idx) => (
                <div key={notice.id} className="animate-in fade-in slide-in-from-left-2 rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-4 transition-all duration-200 hover:border-slate-300 hover:shadow-md" style={{ animationDelay: `${idx * 50}ms` }}>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-800">{notice.title}</h3>
                      <p className="mt-1 text-sm text-slate-600">{notice.description}</p>
                    </div>
                    <button type="button" onClick={() => handleDelete(notice)} className="inline-flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-600 transition-all duration-200 hover:bg-rose-100 hover:border-rose-300">
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                  {notice.created_at ? <p className="mt-3 text-xs text-slate-500">Published: {new Date(notice.created_at).toLocaleString()}</p> : null}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Publish Notice"
        footer={
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setModalOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-slate-50 hover:border-slate-300">
              Cancel
            </button>
            <button type="submit" form="notice-form" disabled={saving} className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg hover:from-blue-700 hover:to-blue-800 disabled:cursor-not-allowed disabled:from-blue-300 disabled:to-blue-300 active:scale-95 disabled:active:scale-100 inline-flex items-center gap-2">
              {saving ? (
                <>
                  <LoadingSpinner size="sm" />
                  Publishing...
                </>
              ) : (
                "Publish"
              )}
            </button>
          </div>
        }
      >
        <form id="notice-form" onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Title</label>
            <input name="title" value={formData.title} onChange={handleChange} required className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all duration-200 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required rows={5} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all duration-200 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Created By</label>
            <div className="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-700 font-medium">
              {currentUser?.name || "Administrator"}
            </div>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default Notices;