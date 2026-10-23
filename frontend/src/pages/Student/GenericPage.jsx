import StudentLayout from "../../components/student/StudentLayout";

const GenericPage = ({
  title,
  subtitle,
  description,
  primaryActionLabel = "Go to Dashboard",
  primaryActionPath = "/student/dashboard",
}) => {
  return (
    <StudentLayout title={title} subtitle={subtitle}>
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-4 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
          Student area
        </div>

        <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
        <p className="mt-3 text-base text-slate-600">{description}</p>

        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
          This page is ready for the Laravel API and the current authenticated student data. Connect
          the backend response here when your endpoint is available.
        </div>

        <a
          href={primaryActionPath}
          className="mt-6 inline-flex items-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          {primaryActionLabel}
        </a>
      </div>
    </StudentLayout>
  );
};

export default GenericPage;
