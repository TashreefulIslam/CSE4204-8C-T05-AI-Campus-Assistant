import { Bell, Menu } from "lucide-react";

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

const Header = ({ title = "Admin Dashboard", subtitle = "", onMenuClick = () => {} }) => {
	const user = getStoredUser();

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
						{subtitle ? <p className="text-sm text-slate-500">{subtitle}</p> : null}
					</div>
				</div>

				<div className="flex items-center gap-3 sm:gap-4">
					<button
						type="button"
						className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:bg-slate-100 hover:text-slate-800"
						aria-label="Notifications"
					>
						<Bell size={18} />
					</button>

					<div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
							{getInitials(user?.name)}
						</div>
						<div>
							<p className="text-sm font-semibold text-slate-800">{user?.name || "Administrator"}</p>
							<p className="text-xs text-slate-500">Administrator</p>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
