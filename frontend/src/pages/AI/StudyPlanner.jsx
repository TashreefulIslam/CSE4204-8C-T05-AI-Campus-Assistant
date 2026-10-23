import { useState } from "react";
import { BrainCircuit, Loader2, Sparkles } from "lucide-react";

import StudentLayout from "../../components/student/StudentLayout";
import { generateStudyPlan } from "../../services/aiService";

const StudyPlanner = () => {
    const [subjects, setSubjects] = useState("");
    const [studyDuration, setStudyDuration] = useState("");
    const [goal, setGoal] = useState("");

    const [plan, setPlan] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleGeneratePlan = async (event) => {
        event.preventDefault();

        if (!subjects.trim() || !studyDuration.trim() || !goal.trim()) {
            setError("Please fill in all fields.");
            return;
        }

        setLoading(true);
        setError("");
        setPlan("");

        try {
            const data = await generateStudyPlan({
                subjects: subjects.trim(),
                study_duration: studyDuration.trim(),
                goal: goal.trim(),
            });

            console.log("STUDY PLAN RESPONSE:", data);

            setPlan(
                data.data.response ||
                    "Sorry, I could not generate a study plan."
            );
        } catch (err) {
            console.error("Study Planner Error:", err);

            setError(
                err.response?.data?.message ||
                    "Something went wrong while generating the study plan."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <StudentLayout
            title="AI Study Planner"
            subtitle="Create a personalized study plan"
        >
            <div className="mx-auto max-w-5xl space-y-6">

                {/* Header */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                            <BrainCircuit
                                size={24}
                                className="text-blue-600"
                            />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-slate-800">
                                AI Study Planner
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Tell the AI what you need to study and it will
                                create a practical study plan for you.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleGeneratePlan}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                    <div className="space-y-5">

                        {/* Subjects */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Subjects
                            </label>

                            <textarea
                                value={subjects}
                                onChange={(event) =>
                                    setSubjects(event.target.value)
                                }
                                placeholder="Example: Data Structures, Database Systems, Computer Networks"
                                rows={3}
                                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        {/* Duration */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Study Duration
                            </label>

                            <input
                                type="text"
                                value={studyDuration}
                                onChange={(event) =>
                                    setStudyDuration(event.target.value)
                                }
                                placeholder="Example: 7 days, 2 weeks"
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        {/* Goal */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Your Goal
                            </label>

                            <textarea
                                value={goal}
                                onChange={(event) =>
                                    setGoal(event.target.value)
                                }
                                placeholder="Example: Prepare for my final examination and improve my understanding of algorithms"
                                rows={3}
                                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                                {error}
                            </div>
                        )}

                        {/* Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
                        >
                            {loading ? (
                                <>
                                    <Loader2
                                        size={18}
                                        className="animate-spin"
                                    />
                                    Creating Study Plan...
                                </>
                            ) : (
                                <>
                                    <Sparkles size={18} />
                                    Generate Study Plan
                                </>
                            )}
                        </button>
                    </div>
                </form>

                {/* Result */}
                {plan && (
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="mb-5 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                                <BrainCircuit
                                    size={20}
                                    className="text-emerald-600"
                                />
                            </div>

                            <div>
                                <h3 className="font-bold text-slate-800">
                                    Your Study Plan
                                </h3>

                                <p className="text-xs text-slate-400">
                                    Generated by AI Campus Assistant
                                </p>
                            </div>
                        </div>

                        <div className="whitespace-pre-wrap rounded-xl bg-slate-50 p-5 text-sm leading-7 text-slate-700">
                            {plan}
                        </div>
                    </div>
                )}
            </div>
        </StudentLayout>
    );
};

export default StudyPlanner;