import { useEffect, useMemo, useState } from "react";
import { Plus, Trash2, Edit2 } from "lucide-react";
import DashboardLayout from "../../components/admin/DashboardLayout";
import Modal from "../../components/admin/Modal";
import LoadingSpinner from "../../components/admin/LoadingSpinner";
import { createCourse, deleteCourse, getCourses, updateCourse, getUsers } from "../../services/adminService";

const emptyForm = {
  course_code: "",
  course_name: "",
  credit: "",
  teacher_id: "",
};

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadCourses = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getCourses();
      const list = Array.isArray(data) ? data : data?.data || [];
      setCourses(list);
    } catch {
      setError("Failed to load courses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadTeachers = async () => {
    try {
      const data = await getUsers();
      const list = Array.isArray(data) ? data : data?.data || [];
      const filteredTeachers = list.filter((user) => String(user?.role || "").toLowerCase() === "teacher");
      setTeachers(filteredTeachers);
    } catch {
      console.error("Failed to load teachers");
      setTeachers([]);
    }
  };

  useEffect(() => {
    loadCourses();
    loadTeachers();
  }, []);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const haystack = [course?.course_code, course?.course_name, course?.teacher?.name]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return !search || haystack.includes(search.toLowerCase());
    });
  }, [courses, search]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openCreate = () => {
    setEditingCourse(null);
    setFormData(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (course) => {
    setEditingCourse(course);
    setFormData({
      course_code: course?.course_code || "",
      course_name: course?.course_name || "",
      credit: course?.credit ?? "",
      teacher_id: course?.teacher_id || course?.teacher?.id || "",
    });
    setModalOpen(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      if (editingCourse) {
        await updateCourse(editingCourse.id, formData);
        setSuccess("Course updated successfully.");
      } else {
        await createCourse(formData);
        setSuccess("Course created successfully.");
      }

      setModalOpen(false);
      setFormData(emptyForm);
      setEditingCourse(null);
      await loadCourses();
    } catch (err) {
      const apiMessage = err?.response?.data?.message || "Failed to save course.";
      setError(apiMessage);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (course) => {
    const confirmed = window.confirm("Are you sure you want to delete this course?");
    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");
      await deleteCourse(course.id);
      setSuccess("Course deleted successfully.");
      await loadCourses();
    } catch {
      setError("Failed to delete course. Please try again.");
    }
  };

  return (
    <DashboardLayout title="Courses" subtitle="Manage offered courses and curriculum data">
      <div className="space-y-4">
        {error ? <div className="animate-in fade-in slide-in-from-top-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 shadow-sm">{error}</div> : null}
        {success ? <div className="animate-in fade-in slide-in-from-top-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 shadow-sm">{success}</div> : null}

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-md transition-shadow duration-300 hover:shadow-lg">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 md:max-w-xs"
            />
            <button type="button" onClick={openCreate} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg hover:from-blue-700 hover:to-blue-800 active:scale-95">
              <Plus size={16} />
              Add Course
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition-shadow duration-300 hover:shadow-lg">
          {loading ? (
            <div className="flex justify-center p-8">
              <LoadingSpinner size="lg" />
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="p-4">
              <p className="text-sm text-slate-500">No courses found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Course</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Credit</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Teacher</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.map((course, idx) => (
                    <tr key={course.id} className={`border-b border-slate-100 transition-colors duration-200 hover:bg-slate-50 ${idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-slate-800">{course.course_code}</p>
                          <p className="text-xs text-slate-500">{course.course_name}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{course.credit}</td>
                      <td className="px-6 py-4 text-slate-600">{course.teacher?.name || "-"}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button type="button" onClick={() => openEdit(course)} className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 transition-all duration-200 hover:bg-slate-100 hover:border-slate-300">
                            <Edit2 size={14} />
                            Edit
                          </button>
                          <button type="button" onClick={() => handleDelete(course)} className="inline-flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-600 transition-all duration-200 hover:bg-rose-100 hover:border-rose-300">
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
        title={editingCourse ? "Edit Course" : "Create Course"}
        footer={
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setModalOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-slate-50 hover:border-slate-300">
              Cancel
            </button>
            <button type="submit" form="course-form" disabled={saving} className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg hover:from-blue-700 hover:to-blue-800 disabled:cursor-not-allowed disabled:from-blue-300 disabled:to-blue-300 active:scale-95 disabled:active:scale-100 inline-flex items-center gap-2">
              {saving ? (
                <>
                  <LoadingSpinner size="sm" />
                  Saving...
                </>
              ) : editingCourse ? (
                "Save Changes"
              ) : (
                "Create Course"
              )}
            </button>
          </div>
        }
      >
        <form id="course-form" onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Course Code</label>
              <input name="course_code" value={formData.course_code} onChange={handleChange} required className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all duration-200 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Credit</label>
              <input type="number" step="0.1" name="credit" value={formData.credit} onChange={handleChange} required className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all duration-200 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100" />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Course Name</label>
            <input name="course_name" value={formData.course_name} onChange={handleChange} required className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all duration-200 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Teacher</label>
            <select name="teacher_id" value={formData.teacher_id} onChange={handleChange} required className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all duration-200 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100">
              <option value="">Select a teacher...</option>
              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default CourseManagement;