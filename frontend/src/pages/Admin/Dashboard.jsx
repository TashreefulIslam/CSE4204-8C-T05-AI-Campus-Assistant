import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

import DashboardLayout from "../../components/admin/DashboardLayout";
import StatCard from "../../components/admin/StatCard";
import { getAdminDashboard } from "../../services/dashboardService";
import { getCourses } from "../../services/adminService";

import {
    Users,
    GraduationCap,
    BookOpen,
    UserCheck,
    Calendar,
    ClipboardList,
    Bell,
} from "lucide-react";

const isObject = (value) => value && typeof value === "object" && !Array.isArray(value);

const pickNumber = (sources, keys, fallback = 0) => {
    for (const source of sources) {
        if (!isObject(source)) {
            continue;
        }

        for (const key of keys) {
            const value = source?.[key];
            const numeric = Number(value);
            if (Number.isFinite(numeric)) {
                return numeric;
            }
        }
    }

    return fallback;
};

const pickArray = (sources, keys) => {
    for (const source of sources) {
        if (!isObject(source)) {
            continue;
        }

        for (const key of keys) {
            const value = source?.[key];
            if (Array.isArray(value)) {
                return value;
            }
        }
    }

    return [];
};

const formatDateTime = (value) => {
    if (!value) {
        return "-";
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return String(value);
    }

    return date.toLocaleString();
};

const getUserInitials = (name) => {
    if (!name || typeof name !== "string") {
        return "U";
    }

    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part?.[0]?.toUpperCase() || "")
        .join("") || "U";
};

const quickAccessItems = [
    { title: "Manage Users", path: "/admin/users", icon: Users },
    { title: "Manage Courses", path: "/admin/courses", icon: BookOpen },
    { title: "Manage Routine", path: "/admin/routine", icon: Calendar },
    { title: "Manage Exam Routine", path: "/admin/exam-routine", icon: ClipboardList },
    { title: "Publish Notice", path: "/admin/notices", icon: Bell },
];

const Dashboard = () => {
    const [responseData, setResponseData] = useState({});
    const [coursesCount, setCoursesCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;

        const fetchDashboard = async () => {
            try {
                setLoading(true);
                setError("");
                const [dashboardResponse, coursesResponse] = await Promise.all([
                    getAdminDashboard(),
                    getCourses(),
                ]);

                if (!isMounted) {
                    return;
                }

                setResponseData(dashboardResponse?.data ?? dashboardResponse ?? {});
                
                const coursesList = Array.isArray(coursesResponse) ? coursesResponse : (coursesResponse?.data || []);
                setCoursesCount(coursesList.length);
            } catch {
                if (isMounted) {
                    setError("Failed to load dashboard data. Please try again.");
                    setResponseData({});
                    setCoursesCount(0);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchDashboard();

        return () => {
            isMounted = false;
        };
    }, []);

    const dashboardData = useMemo(() => {
        const root = isObject(responseData) ? responseData : {};
        const payload = isObject(root?.data) ? root.data : root;
        const stats = isObject(payload?.stats) ? payload.stats : {};
        const summary = isObject(payload?.summary) ? payload.summary : {};
        const counts = isObject(payload?.counts) ? payload.counts : {};
        const usersMeta = isObject(payload?.users) ? payload.users : {};
        const roles = isObject(payload?.roles) ? payload.roles : {};

        const sources = [payload, stats, summary, counts, usersMeta, roles];

        const totalUsers = pickNumber(sources, ["totalUsers", "total_users", "users", "users_count"]);
        const students = pickNumber(sources, ["students", "student", "student_count", "students_count"]);
        const teachers = pickNumber(sources, ["teachers", "teacher", "teacher_count", "teachers_count"]);

        const chartDataRaw = pickArray(
            [payload, stats, summary],
            ["userGrowth", "user_growth", "growth", "analytics", "analyticsData"]
        );

        const chartData = chartDataRaw
            .filter((item) => isObject(item))
            .map((item, index) => ({
                label: String(item?.label ?? item?.month ?? item?.date ?? `Point ${index + 1}`),
                users: Number(item?.users ?? item?.totalUsers ?? item?.count ?? 0),
            }))
            .filter((item) => Number.isFinite(item.users));

        const recentUsersRaw = pickArray(
            [payload, payload?.activity || {}, payload?.recent || {}],
            ["recentUsers", "recent_users", "users", "recentRegistrations", "recent_registrations"]
        );

        const recentUsers = recentUsersRaw
            .filter((item) => isObject(item))
            .map((item, index) => ({
                key: item?.id ?? item?.user_id ?? `${item?.email || "user"}-${index}`,
                name: item?.name ?? item?.full_name ?? "Unknown User",
                role: item?.role ?? item?.user_role ?? "-",
                email: item?.email ?? "-",
                joinedAt: item?.created_at ?? item?.createdAt ?? item?.joined_at ?? null,
            }));

        return {
            totalUsers,
            students,
            teachers,
            courses: coursesCount,
            chartData,
            recentUsers,
        };
    }, [responseData, coursesCount]);

    return (
        <DashboardLayout title="Admin Dashboard" subtitle="System Administration & Platform Analytics">
            <div className="space-y-6">
                {error ? (
                    <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>
                ) : null}

                <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <StatCard
                        title="Total Users"
                        value={loading ? "..." : dashboardData.totalUsers}
                        icon={Users}
                    />
                    <StatCard
                        title="Students"
                        value={loading ? "..." : dashboardData.students}
                        icon={GraduationCap}
                        iconBg="bg-emerald-100"
                        iconColor="text-emerald-600"
                    />
                    <StatCard
                        title="Teachers"
                        value={loading ? "..." : dashboardData.teachers}
                        icon={UserCheck}
                        iconBg="bg-amber-100"
                        iconColor="text-amber-600"
                    />
                    <StatCard
                        title="Courses"
                        value={loading ? "..." : dashboardData.courses}
                        icon={BookOpen}
                        iconBg="bg-violet-100"
                        iconColor="text-violet-600"
                    />
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                    <div className="mb-4">
                        <h2 className="text-lg font-bold text-slate-800">System Statistics</h2>
                        <p className="text-sm text-slate-500">Analytics are shown only when provided by the backend API.</p>
                    </div>

                    {dashboardData.chartData.length > 0 ? (
                        <div className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={dashboardData.chartData}>
                                    <defs>
                                        <linearGradient id="adminUsersGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#2563EB" stopOpacity={0.22} />
                                            <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                                    <XAxis dataKey="label" tick={{ fontSize: 12, fill: "#64748B" }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fontSize: 12, fill: "#64748B" }} axisLine={false} tickLine={false} />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="users" stroke="#2563EB" fill="url(#adminUsersGrad)" strokeWidth={2.5} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm text-slate-600">
                            Historical growth data is not available from the current backend response yet.
                        </div>
                    )}
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-bold text-slate-800">Recent Users</h2>
                    </div>

                    {loading ? (
                        <p className="text-sm text-slate-500">Loading recent users...</p>
                    ) : dashboardData.recentUsers.length === 0 ? (
                        <p className="text-sm text-slate-500">No recent users found.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-500">
                                        <th className="px-2 py-3">User</th>
                                        <th className="px-2 py-3">Role</th>
                                        <th className="px-2 py-3">Email</th>
                                        <th className="px-2 py-3">Registered</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dashboardData.recentUsers.map((user) => (
                                        <tr key={user.key} className="border-b border-slate-100">
                                            <td className="px-2 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                                                        {getUserInitials(user.name)}
                                                    </div>
                                                    <span className="font-medium text-slate-800">{user.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-2 py-3">
                                                <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-2 py-3 text-slate-600">{user.email}</td>
                                            <td className="px-2 py-3 text-slate-600">{formatDateTime(user.joinedAt)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                    <h2 className="mb-4 text-lg font-bold text-slate-800">Quick Access</h2>
                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                        {quickAccessItems.map((item) => {
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.title}
                                    to={item.path}
                                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                                >
                                    <Icon size={16} />
                                    <span>{item.title}</span>
                                </Link>
                            );
                        })}
                    </div>
                </section>
            </div>
        </DashboardLayout>
    );

};

export default Dashboard;