import { useState } from "react";
import StudentHeader from "./StudentHeader";
import StudentSidebar from "./StudentSidebar";

const StudentLayout = ({ title, subtitle, children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800">
      <div className="flex min-h-screen">
        <StudentSidebar mobile={false} />

        <div className="flex min-w-0 flex-1 flex-col">
          <StudentHeader
            title={title}
            subtitle={subtitle}
            onMenuClick={() => setSidebarOpen(true)}
          />

          <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>

      <StudentSidebar mobile isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
    </div>
  );
};

export default StudentLayout;
