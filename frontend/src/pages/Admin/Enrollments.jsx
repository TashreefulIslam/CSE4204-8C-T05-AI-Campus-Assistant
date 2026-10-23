import { useEffect, useState } from "react";
import DashboardLayout from "../../components/admin/DashboardLayout";
import LoadingSpinner from "../../components/admin/LoadingSpinner";
import { createEnrollment, getCourses, getEnrollments, getUsers } from "../../services/adminService";

const Enrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ student_id: "", course_id: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadEnrollments = async () => {
      try {
        setLoading(true);
        setError("");

        const [enrollmentData, userData, courseData] = await Promise.all([
          getEnrollments(),
          getUsers(),
          getCourses(),
        ]);
        setEnrollments(Array.isArray(enrollmentData) ? enrollmentData : []);
        setStudents((Array.isArray(userData) ? userData : []).filter((user) => user.role === "student"));
        setCourses(Array.isArray(courseData) ? courseData : []);
      } catch (requestError) {
        setError(requestError?.response?.data?.message || "Unable to load enrollment data.");
      } finally {
        setLoading(false);
      }
    };

    loadEnrollments();
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    try {
      setSaving(true);
      setError("");
      setSuccess("");
      await createEnrollment(form);
      setForm({ student_id: "", course_id: "" });
      setSuccess("Enrollment saved successfully.");
      const data = await getEnrollments();
      setEnrollments(Array.isArray(data) ? data : []);
    } catch (requestError) {
      const validationErrors = requestError?.response?.data?.errors;
      setError(validationErrors ? Object.values(validationErrors).flat().join(" ") : requestError?.response?.data?.message || "Unable to save enrollment.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout title="Enrollments" subtitle="Enrollment information and operations">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition-shadow duration-300 hover:shadow-lg">
        <form onSubmit={submit} className="grid gap-4 border-b border-slate-200 bg-slate-50 p-6 md:grid-cols-[1fr_1fr_auto] md:items-end">
          <label className="text-sm font-semibold text-slate-700">Student
            <select required value={form.student_id} onChange={(event) => setForm((prev) => ({ ...prev, student_id: event.target.value }))} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm">
              <option value="">Select a student</option>
              {students.map((student) => <option key={student.id} value={student.id}>{student.name} ({student.university_id || student.email})</option>)}
            </select>
          </label>
          <label className="text-sm font-semibold text-slate-700">Course
            <select required value={form.course_id} onChange={(event) => setForm((prev) => ({ ...prev, course_id: event.target.value }))} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm">
              <option value="">Select a course</option>
              {courses.map((course) => <option key={course.id} value={course.id}>{course.course_code} - {course.course_name}</option>)}
            </select>
          </label>
          <button disabled={saving} className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50">{saving ? "Saving..." : "Assign Course"}</button>
        </form>
        {success && <p className="border-b border-emerald-200 bg-emerald-50 px-6 py-3 text-sm text-emerald-700">{success}</p>}
        {loading ? (
          <div className="flex justify-center p-8">
            <LoadingSpinner size="lg" />
          </div>
        ) : error ? (
          <div className="rounded-t-2xl border-b border-amber-200 bg-amber-50 px-6 py-4">
            <p className="text-sm font-medium text-amber-800">{error}</p>
          </div>
        ) : enrollments.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-sm text-slate-500">No enrollment records found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Student</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Course</th>
                </tr>
              </thead>
              <tbody>
                {enrollments.map((item, idx) => (
                  <tr key={item.id} className={`border-b border-slate-100 transition-colors duration-200 hover:bg-slate-50 ${idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
                    <td className="px-6 py-4 font-medium text-slate-800">{item.student?.name || item.student_id || "-"}</td>
                    <td className="px-6 py-4 text-slate-600">{item.course?.course_name || item.course_id || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Enrollments;