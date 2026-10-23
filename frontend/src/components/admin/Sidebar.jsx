import { NavLink, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import adminSidebar from "../../data/adminSidebar";
import { logoutUser } from "../../services/authService";

const getStoredUser = () => {
	try {
		return JSON.parse(localStorage.getItem("user") || "null");
	} catch {
		return null;
	}
};

const getInitials = (name) => {
	if (!name || typeof name !== "string") {
		return "AD";
	}

	const parts = name.trim().split(/\s+/).filter(Boolean);
	if (parts.length === 0) {
		return "AD";
	}

	return parts
		.slice(0, 2)
		.map((part) => part[0]?.toUpperCase() || "")
		.join("") || "AD";
};

const Sidebar = ({ mobile = false, isOpen = false, onClose = () => {} }) => {
	const navigate = useNavigate();
	const user = getStoredUser();

	const handleLogout = async () => {
		try {
			await logoutUser();
		} catch {
			// Frontend still clears auth data even if backend logout fails.
		} finally {
			localStorage.removeItem("token");
			localStorage.removeItem("user");
			navigate("/login", { replace: true });
			if (mobile) {
				onClose();
			}
		}
	};

	const overlayClass = mobile
		? `fixed inset-0 z-30 bg-slate-900/50 transition duration-200 ${
				isOpen ? "opacity-100" : "pointer-events-none opacity-0"
			} lg:hidden`
		: "hidden";

	const asideClass = mobile
		? `fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-200 bg-white shadow-xl transition-transform duration-200 lg:hidden ${
				isOpen ? "translate-x-0" : "-translate-x-full"
			}`
		: "hidden h-screen w-72 shrink-0 border-r border-slate-200 bg-white shadow-sm lg:flex lg:flex-col";

	return (
		<>
			<div className={overlayClass} onClick={onClose} aria-hidden="true" />

			<aside className={asideClass}>
				<div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
					<div>
						<p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">AI Campus</p>
						<h2 className="mt-1 text-lg font-bold text-slate-800">Admin Portal</h2>
					</div>

					{mobile && (
						<button
							type="button"
							onClick={onClose}
							className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 lg:hidden"
							aria-label="Close menu"
						>
							<X size={18} />
						</button>
					)}
				</div>

				<nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
					{adminSidebar.map((item) => {
						const Icon = item.icon;

						if (item.action === "logout") {
							return (
								<button
									key={item.title}
									type="button"
									onClick={handleLogout}
									className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-700"
								>
									<Icon size={18} />
									<span>{item.title}</span>
								</button>
							);
						}

						return (
							<NavLink
								key={item.title}
								to={item.path}
								onClick={mobile ? onClose : undefined}
								className={({ isActive }) =>
									`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
										isActive
											? "bg-blue-600 text-white shadow-sm"
											: "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
									}`
								}
							>
								<Icon size={18} />
								<span>{item.title}</span>
							</NavLink>
						);
					})}
				</nav>

				<div className="border-t border-slate-200 p-4">
					<div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
								{getInitials(user?.name)}
							</div>
							<div className="min-w-0">
								<p className="truncate text-sm font-semibold text-slate-800">{user?.name || "Administrator"}</p>
								<p className="text-xs text-slate-500">Administrator</p>
							</div>
						</div>
					</div>
				</div>
			</aside>
		</>
	);
};

export default Sidebar;
