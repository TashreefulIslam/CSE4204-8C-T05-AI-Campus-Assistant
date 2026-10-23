import { useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const getStoredUser = () => {
	try {
		return JSON.parse(localStorage.getItem("user") || "null");
	} catch {
		return null;
	}
};

const getRedirectPathByRole = (role) => {
	if (role === "teacher") {
		return "/teacher/dashboard";
	}

	return "/student/dashboard";
};

const DashboardLayout = ({ title, subtitle, children }) => {
	const [isSidebarOpen, setSidebarOpen] = useState(false);

	const user = useMemo(() => getStoredUser(), []);
	const token = localStorage.getItem("token");

	if (!token || !user) {
		return <Navigate to="/login" replace />;
	}

	if (String(user?.role || "").toLowerCase() !== "admin") {
		return <Navigate to={getRedirectPathByRole(String(user?.role || "").toLowerCase())} replace />;
	}

	return (
		<div className="min-h-screen bg-[#F8FAFC] text-slate-800">
			<div className="flex min-h-screen">
				<Sidebar mobile={false} />

				<div className="flex min-w-0 flex-1 flex-col">
					<Header title={title} subtitle={subtitle} onMenuClick={() => setSidebarOpen(true)} />
					<main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
				</div>
			</div>

			<Sidebar mobile isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
		</div>
	);
};

export default DashboardLayout;
