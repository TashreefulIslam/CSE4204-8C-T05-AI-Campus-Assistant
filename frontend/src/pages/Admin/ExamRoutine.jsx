import { useEffect, useState } from "react";
import { Plus, Trash2, Edit2 } from "lucide-react";
import DashboardLayout from "../../components/admin/DashboardLayout";
import Modal from "../../components/admin/Modal";
import LoadingSpinner from "../../components/admin/LoadingSpinner";
import { createExamRoutine, deleteExamRoutine, getExamRoutines, updateExamRoutine, getCourses } from "../../services/adminService";

const emptyForm = {
  course_id: "",
  exam_date: "",
  start_time: "",
  end_time: "",
  room: "",
};

const ExamRoutine = () => {
  const [examRoutines, setExamRoutines] = useState([]);
  const [courses, setCourses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingExamRoutine, setEditingExamRoutine] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadExamRoutines = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getExamRoutines();
      setExamRoutines(Array.isArray(data) ? data : data?.data || []);
    } catch {
      setError("Failed to load exam routines. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadCourses = async () => {
    try {
      const data = await getCourses();
      const list = Array.isArray(data) ? data : data?.data || [];
      setCourses(list);
    } catch {
      console.error("Failed to load courses");
      setCourses([]);
    }
  };

  useEffect(() => {
    loadExamRoutines();
    loadCourses();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openCreate = () => {
    setEditingExamRoutine(null);
    setFormData(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (examRoutine) => {
    setEditingExamRoutine(examRoutine);
    setFormData({
      course_id: examRoutine?.course_id || "",
      exam_date: examRoutine?.exam_date || "",
      start_time: examRoutine?.start_time || "",
      end_time: examRoutine?.end_time || "",
      room: examRoutine?.room || "",
    });
    setModalOpen(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      if (editingExamRoutine) {
        await updateExamRoutine(editingExamRoutine.id, formData);
        setSuccess("Exam routine updated successfully.");
      } else {
        await createExamRoutine(formData);
        setSuccess("Exam routine created successfully.");
      }

      setModalOpen(false);
      setFormData(emptyForm);
      setEditingExamRoutine(null);
      await loadExamRoutines();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to save exam routine.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (examRoutine) => {
    const confirmed = window.confirm("Are you sure you want to delete this exam routine?");
    if (!confirmed) return;

    try {
      await deleteExamRoutine(examRoutine.id);
      setSuccess("Exam routine deleted successfully.");
      await loadExamRoutines();
    } catch {
      setError("Failed to delete exam routine. Please try again.");
    }
  };

  return (
    <DashboardLayout title="Exam Routine" subtitle="Exam schedule management">
      <div className="space-y-4">
        {error ? <div className="animate-in fade-in slide-in-from-top-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 shadow-sm">{error}</div> : null}
        {success ? <div className="animate-in fade-in slide-in-from-top-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 shadow-sm">{success}</div> : null}

        <div className="flex justify-end">
          <button type="button" onClick={openCreate} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg hover:from-blue-700 hover:to-blue-800 active:scale-95">
            <Plus size={16} />
            Add Exam Schedule
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition-shadow duration-300 hover:shadow-lg">
          {loading ? (
            <div className="flex justify-center p-8">
              <LoadingSpinner size="lg" />
            </div>
          ) : examRoutines.length === 0 ? (
            <div className="p-4">
              <p className="text-sm text-slate-500">No exam schedules found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Course</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Time</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Room</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {examRoutines.map((exam, idx) => (
                    <tr key={exam.id} className={`border-b border-slate-100 transition-colors duration-200 hover:bg-slate-50 ${idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
                      <td className="px-6 py-4 text-slate-700 font-medium">{exam.course?.course_name || exam.course_id}</td>
                      <td className="px-6 py-4"><span className="inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">{new Date(exam.exam_date).toLocaleDateString("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
})}</span></td>
                      <td className="px-6 py-4 text-slate-600 text-sm">{exam.start_time} - {exam.end_time}</td>
                      <td className="px-6 py-4 text-slate-600">{exam.room}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button type="button" onClick={() => openEdit(exam)} className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 transition-all duration-200 hover:bg-slate-100 hover:border-slate-300">
                            <Edit2 size={14} />
                            Edit
                          </button>
                          <button type="button" onClick={() => handleDelete(exam)} className="inline-flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-600 transition-all duration-200 hover:bg-rose-100 hover:border-rose-300">
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
        title={editingExamRoutine ? "Edit Exam Routine" : "Create Exam Routine"}
        footer={
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setModalOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-slate-50 hover:border-slate-300">
              Cancel
            </button>
            <button type="submit" form="exam-routine-form" disabled={saving} className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg hover:from-blue-700 hover:to-blue-800 disabled:cursor-not-allowed disabled:from-blue-300 disabled:to-blue-300 active:scale-95 disabled:active:scale-100 inline-flex items-center gap-2">
              {saving ? (
                <>
                  <LoadingSpinner size="sm" />
                  Saving...
                </>
              ) : editingExamRoutine ? (
                "Save Changes"
              ) : (
                "Create Schedule"
              )}
            </button>
          </div>
        }
      >
        <form id="exam-routine-form" onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Course</label>
              <select name="course_id" value={formData.course_id} onChange={handleChange} required className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all duration-200 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100">
                <option value="">Select a course...</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.course_code} - {course.course_name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Exam Date</label>
              <input type="date" name="exam_date" value={formData.exam_date} onChange={handleChange} required className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all duration-200 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100" />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Start Time</label>
              <input type="time" name="start_time" value={formData.start_time} onChange={handleChange} required className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all duration-200 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">End Time</label>
              <input type="time" name="end_time" value={formData.end_time} onChange={handleChange} required className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all duration-200 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100" />
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Room</label>
            <input name="room" value={formData.room} onChange={handleChange} required className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all duration-200 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100" />
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default ExamRoutine;