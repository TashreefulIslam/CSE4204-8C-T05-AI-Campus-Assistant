import { useEffect, useState } from "react";
import StudentLayout from "../../components/student/StudentLayout";
import {
  completeStudentAssignment, downloadStudentMaterial, getStudentAssignments, getStudentCourses,
  getStudentExamRoutines, getStudentMaterials, getStudentNotices, getStudentRoutines,
} from "../../services/studentService";

const configs = {
  routine: ["Routine", "Class timetable", getStudentRoutines],
  exams: ["Exam Routine", "Upcoming examinations", getStudentExamRoutines],
  notices: ["Notices", "Academic announcements", getStudentNotices],
  assignments: ["Assignments", "Track your course tasks", getStudentAssignments],
  courses: ["Courses", "Current course list", getStudentCourses],
  materials: ["Course Materials", "Study resources", getStudentMaterials],
};

const courseName = (item) => item.course?.course_name || item.course?.course_code || item.course_id || "-";
const courseCode = (item) => item.course?.course_code || "-";
const date = (value) => value ? new Date(value).toLocaleDateString() : "-";
const errorMessage = (err) => err.response?.data?.message || "Unable to load this page.";

const ResourcePage = ({ type }) => {
  const [title, subtitle, load] = configs[type];
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(null);

  const refresh = () => {
    setLoading(true); setError("");
    load().then((response) => setItems(response.data || response || [])).catch((err) => setError(errorMessage(err))).finally(() => setLoading(false));
  };
  useEffect(() => {
    let active = true;
    load().then((response) => {
      if (active) setItems(response.data || response || []);
    }).catch((err) => {
      if (active) setError(errorMessage(err));
    }).finally(() => {
      if (active) setLoading(false);
    });
    return () => { active = false; };
  }, [load]);

  const complete = async (id) => {
    try { setBusy(id); await completeStudentAssignment(id); refresh(); } catch (err) { setError(errorMessage(err)); } finally { setBusy(null); }
  };
  const download = async (item) => {
    try {
      setBusy(item.id);
      const blob = await downloadStudentMaterial(item.id);
      const url = URL.createObjectURL(blob); const link = document.createElement("a");
      link.href = url; link.download = item.title || "course-material.pdf"; link.click(); URL.revokeObjectURL(url);
    } catch (err) { setError(errorMessage(err)); } finally { setBusy(null); }
  };

  const renderItem = (item) => {
    if (type === "courses") return <tr key={item.id} className="border-t border-slate-100"><td className="px-5 py-4 font-semibold">{item.course_code}</td><td className="px-5 py-4">{item.course_name}</td><td className="px-5 py-4">{item.credit}</td><td className="px-5 py-4">{item.teacher?.name || "-"}</td></tr>;
    if (type === "assignments") return <div key={item.id} className="flex flex-col gap-3 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-semibold">{item.title}</p><p className="text-sm text-slate-500">{courseName(item)} · Due {date(item.deadline)}</p><p className="mt-1 text-sm text-slate-600">{item.description}</p></div>{item.completed ? <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Completed</span> : <button disabled={busy === item.id} onClick={() => complete(item.id)} className="rounded-xl bg-blue-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50">{busy === item.id ? "Saving..." : "Mark completed"}</button>}</div>;
    if (type === "materials") return <div key={item.id} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-4"><div><p className="font-semibold">{item.title}</p><p className="text-sm text-slate-500">{courseName(item)} · Uploaded {date(item.upload_date)}</p></div><button disabled={busy === item.id} onClick={() => download(item)} className="rounded-xl border border-blue-200 px-3 py-2 text-xs font-semibold text-blue-700 disabled:opacity-50">{busy === item.id ? "Loading..." : "View / Download"}</button></div>;
    if (type === "notices") return <div key={`${item.notice_type}-${item.id}`} className="rounded-xl border border-slate-200 bg-slate-50 p-4"><div className="flex justify-between gap-3"><div><p className="font-semibold">{item.title}</p><p className="mt-1 text-sm text-slate-600">{item.description || `Exam: ${date(item.exam_date)}`}</p>{item.course && <p className="mt-1 text-xs text-slate-500">{courseCode(item)}</p>}</div><span className="text-xs text-slate-400">{date(item.created_at || item.exam_date)}</span></div></div>;
    return <div key={item.id} className="rounded-xl border border-slate-200 p-4"><p className="font-semibold">{courseName(item)}</p><p className="text-sm text-slate-500">{type === "routine" ? `${item.day} · ${item.start_time} - ${item.end_time} · Room ${item.room}` : `${date(item.exam_date)} · ${item.start_time} - ${item.end_time} · Room ${item.room}`}</p></div>;
  };

  return <StudentLayout title={title} subtitle={subtitle}><div className="space-y-4">{error && <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{error}</div>}{loading ? <p className="text-sm text-slate-500">Loading...</p> : items.length === 0 ? <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">No records found.</div> : type === "courses" ? <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm"><table className="w-full min-w-[650px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-5 py-4">Code</th><th className="px-5 py-4">Course</th><th className="px-5 py-4">Credit</th><th className="px-5 py-4">Teacher</th></tr></thead><tbody>{items.map(renderItem)}</tbody></table></div> : <div className="space-y-3">{items.map(renderItem)}</div>}</div></StudentLayout>;
};

export default ResourcePage;
