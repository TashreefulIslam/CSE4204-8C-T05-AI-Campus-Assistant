import { useEffect, useState } from "react";
import TeacherResource from "../../components/teacher/TeacherResource";
import { getTeacherDashboard } from "../../services/teacherService";

const Courses = () => {
  const [courses, setCourses] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState("");
  useEffect(() => { getTeacherDashboard().then((data) => setCourses(data.courses || [])).catch(() => setError("Unable to load your assigned courses.")).finally(() => setLoading(false)); }, []);
  return <TeacherResource title="My Courses" subtitle="Courses assigned to your teaching account.">
    {error && <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{error}</div>}
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {loading ? <p className="p-6 text-sm text-slate-500">Loading courses...</p> : courses.length === 0 ? <p className="p-6 text-sm text-slate-500">No courses are assigned to you.</p> : <div className="overflow-x-auto"><table className="w-full min-w-[600px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-5 py-4">Code</th><th className="px-5 py-4">Course</th><th className="px-5 py-4">Credit</th><th className="px-5 py-4">Students</th></tr></thead><tbody>{courses.map((course) => <tr key={course.id} className="border-t border-slate-100"><td className="px-5 py-4 font-semibold text-slate-800">{course.course_code || "-"}</td><td className="px-5 py-4 text-slate-600">{course.course_name || "-"}</td><td className="px-5 py-4 text-slate-600">{course.credit ?? "-"}</td><td className="px-5 py-4 text-slate-500">{course.enrollments_count ?? "Not available"}</td></tr>)}</tbody></table></div>}
    </div>
  </TeacherResource>;
};
export default Courses;
