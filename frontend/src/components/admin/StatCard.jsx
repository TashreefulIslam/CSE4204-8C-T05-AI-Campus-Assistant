const StatCard = ({ title, value, icon: Icon, iconBg = "bg-blue-100", iconColor = "text-blue-600" }) => {
	return (
		<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
			<div className="flex items-start justify-between gap-3">
				<div>
					<p className="text-sm font-medium text-slate-500">{title}</p>
					<h3 className="mt-2 text-3xl font-bold text-slate-800">{value}</h3>
				</div>

				<div className={`rounded-xl p-2.5 ${iconBg}`}>
					<Icon size={20} className={iconColor} />
				</div>
			</div>
		</div>
	);
};

export default StatCard;
