import { useState } from "react";
import { Navigate } from "react-router-dom";
import TeacherHeader from "./TeacherHeader";
import TeacherSidebar from "./TeacherSidebar";

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
};

const getRedirectPath = (role) => {
  if (role === "admin") return "/admin/dashboard";
  if (role === "student") return "/student/dashboard";
  return "/login";
};

const TeacherLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const user = getStoredUser();
  const token = localStorage.getItem("token");

  if (!token || !user) return <Navigate to="/login" replace />;
  if (String(user.role || "").toLowerCase() !== "teacher") {
    return <Navigate to={getRedirectPath(String(user.role || "").toLowerCase())} replace />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800">
      <div className="flex min-h-screen">
        <TeacherSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <TeacherHeader onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
      <TeacherSidebar mobile isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
    </div>
  );
};

export default TeacherLayout;
