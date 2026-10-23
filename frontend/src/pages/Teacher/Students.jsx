import { useEffect, useState } from "react";
import TeacherResource from "../../components/teacher/TeacherResource";
import { getTeacherStudents } from "../../services/teacherService";

const Students = () => {
  const [students, setStudents] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState("");
  useEffect(() => { getTeacherStudents().then((data) => setStudents(Array.isArray(data) ? data : [])).catch((requestError) => setError(requestError?.response?.data?.message || "Unable to load enrolled students.")).finally(() => setLoading(false)); }, []);
  return <TeacherResource title="Students" subtitle="Students enrolled in your assigned courses.">
    {error && <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{error}</div>}
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">{loading ? <p className="p-6 text-sm text-slate-500">Loading students...</p> : students.length === 0 ? <p className="p-6 text-sm text-slate-500">No enrollment data is available yet.</p> : <div className="overflow-x-auto"><table className="w-full min-w-[650px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-5 py-4">Student</th><th className="px-5 py-4">Email</th><th className="px-5 py-4">Student ID</th><th className="px-5 py-4">Course</th></tr></thead><tbody>{students.map((enrollment) => <tr key={enrollment.id} className="border-t border-slate-100"><td className="px-5 py-4 font-semibold text-slate-800">{enrollment.student?.name || "-"}</td><td className="px-5 py-4 text-slate-600">{enrollment.student?.email || "-"}</td><td className="px-5 py-4 text-slate-600">{enrollment.student?.university_id || "-"}</td><td className="px-5 py-4 text-slate-600">{enrollment.course?.course_code || enrollment.course_id}</td></tr>)}</tbody></table></div>}</div>
  </TeacherResource>;
};
export default Students;
