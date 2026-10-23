const DashboardStatCard = ({ title, value, subtitle, icon: Icon, accent = "blue" }) => {
  const accentMap = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-emerald-100 text-emerald-700",
    yellow: "bg-amber-100 text-amber-700",
    purple: "bg-violet-100 text-violet-700",
    red: "bg-rose-100 text-rose-700",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <h3 className="mt-2 text-3xl font-bold text-slate-800">{value}</h3>
        </div>

        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${accentMap[accent]}`}>
          {Icon && <Icon size={22} />}
        </div>
      </div>

      {subtitle && <p className="mt-4 text-sm text-slate-500">{subtitle}</p>}
    </div>
  );
};

export default DashboardStatCard;
