import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Edit2, Plus, Trash2 } from "lucide-react";
import TeacherResource, { getApiError } from "../../components/teacher/TeacherResource";
import { deleteAssignment, getAssignments } from "../../services/assignmentService";

const Assignments = () => {
  const [items, setItems] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState("");
  const load = () => { setLoading(true); getAssignments().then((data) => setItems(Array.isArray(data) ? data : [])).catch((e) => setError(getApiError(e, "Unable to load assignments."))).finally(() => setLoading(false)); };
  useEffect(load, []);
  const remove = async (id) => { if (!window.confirm("Delete this assignment?")) return; try { await deleteAssignment(id); load(); } catch (e) { setError(getApiError(e, "Unable to delete assignment.")); } };
  return <TeacherResource title="Assignments" subtitle="Create and manage assignments for your courses.">
    <div className="flex justify-end"><Link to="/teacher/assignments/create" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"><Plus size={16} />Create Assignment</Link></div>
    {error && <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{error}</div>}
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">{loading ? <p className="p-6 text-sm text-slate-500">Loading assignments...</p> : items.length === 0 ? <p className="p-6 text-sm text-slate-500">No assignments found.</p> : <div className="overflow-x-auto"><table className="w-full min-w-[700px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-5 py-4">Title</th><th className="px-5 py-4">Course</th><th className="px-5 py-4">Deadline</th><th className="px-5 py-4">Actions</th></tr></thead><tbody>{items.map((item) => <tr key={item.id} className="border-t border-slate-100"><td className="px-5 py-4 font-semibold text-slate-800">{item.title}</td><td className="px-5 py-4 text-slate-600">{item.course?.course_code || item.course_id}</td><td className="px-5 py-4 text-slate-600">{item.deadline ? new Date(item.deadline).toLocaleString() : "-"}</td><td className="px-5 py-4"><div className="flex gap-2"><Link to={`/teacher/assignments/${item.id}/edit`} className="inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs"><Edit2 size={14} />Edit</Link><button type="button" onClick={() => remove(item.id)} className="inline-flex items-center gap-1 rounded-lg border border-rose-200 px-2.5 py-1.5 text-xs text-rose-700"><Trash2 size={14} />Delete</button></div></td></tr>)}</tbody></table></div>}</div>
  </TeacherResource>;
};
export default Assignments;
