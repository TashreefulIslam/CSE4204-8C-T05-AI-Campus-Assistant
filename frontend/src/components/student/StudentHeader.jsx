import { Bell, Menu, Search } from "lucide-react";

const StudentHeader = ({ title, subtitle, onMenuClick }) => {
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <header className="border-b border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50 lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>

          <div>
            <h1 className="text-xl font-bold text-slate-800 sm:text-2xl">{title}</h1>
            <p className="text-sm text-slate-500">{subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative hidden sm:block">
            <Search size={16} className="absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-52 rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white"
            />
          </div>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:bg-slate-100 hover:text-slate-800"
            aria-label="Notifications"
          >
            <Bell size={18} />
          </button>

          <div className="text-left sm:text-right">
            <p className="text-sm font-semibold text-slate-800">
              {storedUser?.name || "Student"}
            </p>
            <p className="text-xs text-slate-500">{storedUser?.role || "student"}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default StudentHeader;
