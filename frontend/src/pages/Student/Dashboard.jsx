import { useEffect, useMemo, useState } from "react";
import { BookOpen, BellRing, BrainCircuit, CalendarDays, ClipboardCheck, FileCheck2, FileText, FolderOpen, MessageSquareText, NotebookPen, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import StudentLayout from "../../components/student/StudentLayout";
import DashboardStatCard from "../../components/student/DashboardStatCard";
import { getStudentDashboard } from "../../services/studentService";

const quickAccessItems = [
  ["Class Routine", "/student-routine", CalendarDays], ["Exam Routine", "/student-exam-routine", ClipboardCheck],
  ["Assignments", "/student-assignments", FileText], ["Courses", "/student-courses", BookOpen],
  ["Course Materials", "/student-materials", FolderOpen], ["Notices", "/student-notices", BellRing],
];
const aiTools = [
  ["AI Chat Assistant", "Ask questions and get academic explanations.", "/ai-chat", MessageSquareText],
  ["AI Study Planner", "Create a personalized study schedule.", "/study-planner", BrainCircuit],
  ["AI Assignment Helper", "Get guidance for understanding assignments.", "/ai-assignment-helper", Sparkles],
  ["AI Quiz Generator", "Generate practice quizzes from topics.", "/quiz-generator", FileCheck2],
  ["AI Note Summarizer", "Summarize lecture notes and study materials.", "/note-summarizer", NotebookPen],
];
const date = (value) => value ? new Date(value).toLocaleDateString() : "-";
const course = (item) => item.course?.course_name || item.course?.course_code || item.course_id || "-";

const Dashboard = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const user = useMemo(() => JSON.parse(localStorage.getItem("user") || "null"), []);

  useEffect(() => {
    getStudentDashboard().then((response) => setData(response.data || {}))
      .catch(() => setError("Unable to load dashboard data right now."))
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    ["Enrolled Courses", data.total_enrolled_courses, "Current active courses", BookOpen, "blue"],
    ["Pending Assignments", data.pending_assignments, "Needs attention", FileText, "amber"],
    ["Upcoming Exams", data.upcoming_exams_count, "Future examinations", ClipboardCheck, "green"],
    ["New Notices", data.new_notices_count, "Latest academic updates", BellRing, "purple"],
  ];
  const routines = data.today_class_routines || [];
  const assignments = data.upcoming_assignments || [];
  const exams = data.upcoming_exam_routines || [];
  const notices = data.latest_notices || [];

  return <StudentLayout title="Dashboard" subtitle="Here's what's happening with your academic activities.">
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-600">Welcome back</p><h2 className="mt-2 text-2xl font-bold text-slate-800 sm:text-3xl">Welcome back, {(user?.name || "Student").split(" ")[0]}!</h2><p className="mt-2 text-sm text-slate-500 sm:text-base">Here's what's happening with your academic activities.</p></section>
      {error && <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{stats.map(([title, value, subtitle, icon, accent]) => <DashboardStatCard key={title} title={title} value={loading ? "..." : Number(value || 0)} subtitle={subtitle} icon={icon} accent={accent} />)}</section>
      <section className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2"><div className="mb-4 flex items-center justify-between"><h3 className="text-lg font-bold">Today's Classes</h3><span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">Live schedule</span></div><div className="space-y-3">{loading ? <p className="text-sm text-slate-500">Loading...</p> : routines.length ? routines.map((item) => <div key={item.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4"><div className="flex justify-between"><div><p className="font-semibold">{course(item)}</p><p className="text-sm text-slate-500">{item.course?.course_code || "-"}</p></div><span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">Today</span></div><div className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-2"><span>{item.start_time} - {item.end_time}</span><span>Room {item.room}</span></div></div>) : <p className="text-sm text-slate-500">No classes scheduled today.</p>}</div></div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="mb-4 flex items-center justify-between"><h3 className="text-lg font-bold">Upcoming Assignments</h3><Link to="/student-assignments" className="text-xs font-medium text-blue-600">View all</Link></div><div className="space-y-3">{loading ? <p className="text-sm text-slate-500">Loading...</p> : assignments.length ? assignments.map((item) => <div key={item.id} className="rounded-xl border border-slate-200 p-3.5"><p className="font-semibold">{item.title}</p><p className="text-sm text-slate-500">{course(item)}</p><span className="text-xs text-slate-500">Due {date(item.deadline)}</span></div>) : <p className="text-sm text-slate-500">No pending assignments.</p>}</div></div>
      </section>
      <section className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="mb-4 flex items-center justify-between"><h3 className="text-lg font-bold">Upcoming Exams</h3><Link to="/student-exam-routine" className="text-sm font-medium text-blue-600">View all</Link></div><div className="space-y-3">{exams.length ? exams.map((item) => <div key={item.id} className="rounded-xl border border-slate-200 p-3.5"><p className="font-semibold">{course(item)}</p><p className="mt-1 text-sm text-slate-500">{date(item.exam_date)} · {item.start_time}</p></div>) : <p className="text-sm text-slate-500">No upcoming exams.</p>}</div></div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2"><div className="mb-4 flex items-center justify-between"><h3 className="text-lg font-bold">Latest Notices</h3><Link to="/student-notices" className="text-sm font-medium text-blue-600">View all notices</Link></div><div className="space-y-3">{notices.length ? notices.map((item) => <div key={`${item.notice_type}-${item.id}`} className="rounded-xl border border-slate-200 bg-slate-50 p-3.5"><div className="flex justify-between gap-3"><div><p className="font-semibold">{item.title}</p><p className="mt-1 text-sm text-slate-500">{item.description || `Exam: ${date(item.exam_date)}`}</p></div><span className="text-xs text-slate-400">{date(item.created_at || item.exam_date)}</span></div></div>) : <p className="text-sm text-slate-500">No notices found.</p>}</div></div>
      </section>
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h3 className="mb-5 text-lg font-bold">Quick Access</h3><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{quickAccessItems.map(([title, path, Icon]) => <Link key={title} to={path} className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-200 hover:bg-blue-50"><div className="flex items-center justify-between"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm"><Icon size={20} /></div><span className="text-sm font-medium text-blue-600">Open</span></div><p className="mt-4 font-semibold">{title}</p></Link>)}</div></section>
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h3 className="mb-5 text-lg font-bold">AI Learning Tools</h3><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">{aiTools.map(([title, description, path, Icon]) => <Link key={title} to={path} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-200 hover:bg-blue-50"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm"><Icon size={20} /></div><p className="mt-4 font-semibold">{title}</p><p className="mt-2 text-sm text-slate-500">{description}</p><span className="mt-4 inline-flex text-sm font-medium text-blue-600">Open →</span></Link>)}</div></section>
    </div>
  </StudentLayout>;
};

export default Dashboard;
