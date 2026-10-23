import { NavLink, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import teacherSidebar from "../../data/teacherSidebar";

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
};

const TeacherSidebar = ({ mobile = false, isOpen = false, onClose = () => {} }) => {
  const navigate = useNavigate();
  const user = getStoredUser();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    onClose();
  };

  const asideClass = mobile
    ? `fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-200 bg-white shadow-xl transition-transform duration-200 lg:hidden ${isOpen ? "translate-x-0" : "-translate-x-full"}`
    : "hidden h-screen w-72 shrink-0 border-r border-slate-200 bg-white shadow-sm lg:flex lg:flex-col";

  return (
    <>
      {mobile && (
        <div
          className={`fixed inset-0 z-30 bg-slate-900/50 transition ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside className={asideClass}>
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">AI Campus</p>
            <h2 className="mt-1 text-lg font-bold text-slate-800">Teacher Portal</h2>
          </div>
          {mobile && (
            <button type="button" onClick={onClose} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Close menu">
              <X size={18} />
            </button>
          )}
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {teacherSidebar.filter((item) => !item.action).map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.title}
                to={item.path}
                onClick={mobile ? onClose : undefined}
                className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${isActive ? "bg-blue-600 text-white shadow-sm" : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"}`}
              >
                <Icon size={18} />
                <span>{item.title}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-slate-200 p-4">
          <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="truncate text-sm font-semibold text-slate-800">{user?.name || "Teacher"}</p>
            <p className="text-xs capitalize text-slate-500">{user?.role || "teacher"}</p>
          </div>
          <button type="button" onClick={handleLogout} className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
            <span aria-hidden="true">&larr;</span>
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default TeacherSidebar;
