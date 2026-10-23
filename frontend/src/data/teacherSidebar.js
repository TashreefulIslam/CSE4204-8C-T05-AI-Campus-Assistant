import {
  Bell,
  BookOpen,
  ClipboardList,
  FileText,
  FolderOpen,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Sparkles,
  User,
} from "lucide-react";

const teacherSidebar = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/teacher/dashboard" },
  { title: "Profile", icon: User, path: "/teacher/profile" },
  { title: "Courses", icon: BookOpen, path: "/teacher/courses" },
  { title: "Students", icon: GraduationCap, path: "/teacher/students" },
  { title: "Assignments", icon: FileText, path: "/teacher/assignments" },
  { title: "CT Notices", icon: Bell, path: "/teacher/ct-notices" },
  { title: "Course Materials", icon: FolderOpen, path: "/teacher/course-materials" },
  { title: "AI Quiz Generator", icon: Sparkles, path: "/teacher/ai-quiz" },
  { title: "Logout", icon: LogOut, action: "logout" },
];

export default teacherSidebar;
