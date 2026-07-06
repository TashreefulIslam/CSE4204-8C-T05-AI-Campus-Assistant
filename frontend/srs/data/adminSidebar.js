import {
    LayoutDashboard,
    User,
    Users,
    BookOpen,
    Calendar,
    ClipboardList,
    Bell,
    GraduationCap,
    Settings,
    LogOut,
} from "lucide-react";

const adminSidebar = [
    {
        title: "Dashboard",
        icon: LayoutDashboard,
        path: "/admin/dashboard",
    },
    {
        title: "Profile",
        icon: User,
        path: "/admin/profile",
    },
    {
        title: "User Management",
        icon: Users,
        path: "/admin/users",
    },
    {
        title: "Course Management",
        icon: BookOpen,
        path: "/admin/courses",
    },
    {
        title: "Routine",
        icon: Calendar,
        path: "/admin/routine",
    },
    {
        title: "Exam Routine",
        icon: ClipboardList,
        path: "/admin/exam-routine",
    },
    {
        title: "Notice",
        icon: Bell,
        path: "/admin/notices",
    },
    {
        title: "Enrollments",
        icon: GraduationCap,
        path: "/admin/enrollments",
    },
    {
        title: "Settings",
        icon: Settings,
        path: "/admin/settings",
    },
    {
        title: "Logout",
        icon: LogOut,
        path: "/logout",
    },
];

export default adminSidebar;
