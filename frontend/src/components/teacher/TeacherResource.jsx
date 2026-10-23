import TeacherLayout from "./TeacherLayout";

export const getApiError = (error, fallback) => {
  const validation = error?.response?.data?.errors;
  if (validation) return Object.values(validation).flat().join(" ");
  return error?.response?.data?.message || fallback;
};

export const Field = ({ label, ...props }) => (
  <label className="block text-sm font-medium text-slate-700">
    <span className="mb-2 block">{label}</span>
    <input {...props} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-blue-500 focus:bg-white" />
  </label>
);

export const SelectField = ({ label, children, ...props }) => (
  <label className="block text-sm font-medium text-slate-700">
    <span className="mb-2 block">{label}</span>
    <select {...props} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-blue-500 focus:bg-white">{children}</select>
  </label>
);

const TeacherResource = ({ title, subtitle, children }) => (
  <TeacherLayout>
    <div className="space-y-5">
      <div><h2 className="text-2xl font-bold text-slate-800">{title}</h2><p className="mt-1 text-sm text-slate-500">{subtitle}</p></div>
      {children}
    </div>
  </TeacherLayout>
);

export default TeacherResource;
