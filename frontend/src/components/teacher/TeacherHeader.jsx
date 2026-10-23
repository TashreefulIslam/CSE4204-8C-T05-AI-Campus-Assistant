import { Bell, Menu } from "lucide-react";

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
};

const getInitials = (name) => {
  if (!name) return "T";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("") || "T";
};

const TeacherHeader = ({ onMenuClick }) => {
  const user = getStoredUser();

  return (
    <header className="border-b border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50 lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
          <h1 className="truncate text-xl font-bold text-slate-800 sm:text-2xl">Teacher Dashboard</h1>
        </div>

        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:bg-slate-100"
            aria-label="Notifications"
          >
            <Bell size={18} />
          </button>
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-slate-800">{user?.name || "Teacher"}</p>
              <p className="text-xs capitalize text-slate-500">{user?.role || "teacher"}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
              {getInitials(user?.name)}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TeacherHeader;
