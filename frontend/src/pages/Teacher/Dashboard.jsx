import { useEffect, useState } from "react";
import { BookOpen, CalendarDays, FileText, FolderOpen, Plus, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import TeacherLayout from "../../components/teacher/TeacherLayout";
import { getTeacherDashboard } from "../../services/teacherService";

const emptyData = { stats: { totalCourses: 0, totalAssignments: 0, totalCtNotices: 0, totalCourseMaterials: 0 }, courses: [], assignments: [], ctNotices: [] };

const formatDate = (value) => {
    if (!value) return "Date not provided";
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleDateString();
};

const courseLabel = (item) => {
    const course = item?.course;
    if (course?.course_code || course?.course_name) return `${course.course_code || ""}${course.course_code && course.course_name ? " - " : ""}${course.course_name || ""}`;
    return item?.course_id ? `Course #${item.course_id}` : "Course not provided";
};

const StatCard = ({ title, value, icon: Icon, tone }) => (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between gap-3"><div><p className="text-sm font-medium text-slate-500">{title}</p><p className="mt-2 text-3xl font-bold text-slate-800">{value}</p></div><div className={`flex h-11 w-11 items-center justify-center rounded-xl ${tone}`}><Icon size={21} /></div></div>
    </div>
);

const EmptyState = ({ children }) => <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm text-slate-500">{children}</p>;

const Dashboard = () => {
    const [dashboard, setDashboard] = useState(emptyData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;
        getTeacherDashboard().then((data) => { if (active) setDashboard(data); }).catch((requestError) => { if (active) { setDashboard(emptyData); setError(requestError?.response?.data?.message || "Unable to load your dashboard right now."); } }).finally(() => { if (active) setLoading(false); });
        return () => { active = false; };
    }, []);

    const stats = dashboard?.stats || emptyData.stats;

    return (
        <TeacherLayout>
            <div className="space-y-6">
                <section><p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Overview</p><h2 className="mt-2 text-2xl font-bold text-slate-800 sm:text-3xl">Your teaching workspace</h2><p className="mt-2 text-sm text-slate-500">Manage your assigned courses and keep academic work moving.</p></section>
                {error && <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>}

                <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <StatCard title="Total Courses" value={loading ? "..." : stats.totalCourses} icon={BookOpen} tone="bg-blue-100 text-blue-700" />
                    <StatCard title="Total Assignments" value={loading ? "..." : stats.totalAssignments} icon={FileText} tone="bg-amber-100 text-amber-700" />
                    <StatCard title="Total CT Notices" value={loading ? "..." : stats.totalCtNotices} icon={CalendarDays} tone="bg-emerald-100 text-emerald-700" />
                    <StatCard title="Course Materials" value={loading ? "..." : stats.totalCourseMaterials} icon={FolderOpen} tone="bg-violet-100 text-violet-700" />
                </section>

                <section className="grid gap-6 xl:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><div className="mb-4 flex items-center justify-between gap-3"><div><h3 className="text-lg font-bold text-slate-800">My Courses</h3><p className="text-sm text-slate-500">Courses assigned to your account.</p></div><Link to="/teacher/courses" className="text-sm font-semibold text-blue-600">View all</Link></div>{loading ? <EmptyState>Loading assigned courses...</EmptyState> : dashboard.courses.length === 0 ? <EmptyState>No assigned courses found.</EmptyState> : <div className="space-y-3">{dashboard.courses.slice(0, 5).map((course) => <div key={course.id} className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4"><div className="min-w-0"><p className="font-semibold text-slate-800">{course.course_code || "Course code unavailable"}</p><p className="truncate text-sm text-slate-500">{course.course_name || "Course name unavailable"}</p></div><span className="shrink-0 text-sm font-medium text-slate-600">{course.credit ?? "-"} credits</span></div>)}</div>}</div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><div className="mb-4 flex items-center justify-between gap-3"><div><h3 className="text-lg font-bold text-slate-800">Recent Assignments</h3><p className="text-sm text-slate-500">Your latest assignment activity.</p></div><Link to="/teacher/assignments" className="text-sm font-semibold text-blue-600">View all</Link></div>{loading ? <EmptyState>Loading assignments...</EmptyState> : dashboard.assignments.length === 0 ? <EmptyState>No assignments found.</EmptyState> : <div className="space-y-3">{dashboard.assignments.slice(0, 5).map((assignment) => <div key={assignment.id} className="rounded-xl border border-slate-200 p-4"><div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"><p className="font-semibold text-slate-800">{assignment.title || "Untitled assignment"}</p><span className="text-xs font-medium text-slate-500">Due {formatDate(assignment.deadline)}</span></div><p className="mt-1 text-sm text-slate-500">{courseLabel(assignment)}</p></div>)}</div>}</div>
                </section>

                <section className="grid gap-6 xl:grid-cols-[1fr_auto]"><div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><div className="mb-4 flex items-center justify-between gap-3"><div><h3 className="text-lg font-bold text-slate-800">Upcoming CT Notices</h3><p className="text-sm text-slate-500">Recent notices attached to your courses.</p></div><Link to="/teacher/ct-notices" className="text-sm font-semibold text-blue-600">View all</Link></div>{loading ? <EmptyState>Loading CT notices...</EmptyState> : dashboard.ctNotices.length === 0 ? <EmptyState>No CT notices found.</EmptyState> : <div className="grid gap-3 md:grid-cols-2">{dashboard.ctNotices.slice(0, 6).map((notice) => <div key={notice.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4"><p className="font-semibold text-slate-800">{notice.title || "Untitled CT notice"}</p><p className="mt-1 text-sm text-slate-500">{courseLabel(notice)}</p><p className="mt-3 text-sm font-medium text-emerald-700">{formatDate(notice.exam_date)}</p></div>)}</div>}</div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 xl:w-80"><h3 className="text-lg font-bold text-slate-800">Quick Actions</h3><div className="mt-4 grid gap-3"><Link to="/teacher/assignments/create" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"><Plus size={17} />Create Assignment</Link><Link to="/teacher/ct-notices" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"><CalendarDays size={17} />Create CT Notice</Link><Link to="/teacher/course-materials" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"><FolderOpen size={17} />Upload Material</Link><Link to="/teacher/ai-quiz" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"><Sparkles size={17} />Generate AI Quiz</Link></div></div>
                </section>
            </div>
        </TeacherLayout>
    );
};

export default Dashboard;