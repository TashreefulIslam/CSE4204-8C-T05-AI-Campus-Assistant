import {
  LayoutGrid,
  User,
  CalendarDays,
  ClipboardList,
  Bell,
  FileText,
  BookOpen,
  FolderOpen,
  MessageSquareText,
  BrainCircuit,
  Sparkles,
  NotebookPen,
  FileCheck2,
} from "lucide-react";

const studentSidebar = [
  { title: "Dashboard", icon: LayoutGrid, path: "/student/dashboard", group: "main" },
  { title: "Profile", icon: User, path: "/student-profile", group: "main" },
  { title: "Routine", icon: CalendarDays, path: "/student-routine", group: "main" },
  { title: "Exam Routine", icon: ClipboardList, path: "/student-exam-routine", group: "main" },
  { title: "Notices", icon: Bell, path: "/student-notices", group: "main" },
  { title: "Assignments", icon: FileText, path: "/student-assignments", group: "main" },
  { title: "Courses", icon: BookOpen, path: "/student-courses", group: "main" },
  { title: "Course Materials", icon: FolderOpen, path: "/student-materials", group: "main" },
  { title: "AI Chat Assistant", icon: MessageSquareText, path: "/ai-chat", group: "ai" },
  { title: "AI Study Planner", icon: BrainCircuit, path: "/study-planner", group: "ai" },
  { title: "AI Assignment Helper", icon: Sparkles, path: "/ai-assignment-helper", group: "ai" },
  { title: "AI Quiz Generator", icon: FileCheck2, path: "/quiz-generator", group: "ai" },
  { title: "AI Note Summarizer", icon: NotebookPen, path: "/note-summarizer", group: "ai" },
];

export default studentSidebar;
