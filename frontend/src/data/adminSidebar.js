import {
    LayoutDashboard,
    User,
    Users,
    BookOpen,
    Calendar,
    ClipboardList,
    Bell,
    GraduationCap,
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
        title: "Courses",
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
        title: "Logout",
        icon: LogOut,
        action: "logout",
    },
];

export default adminSidebar;