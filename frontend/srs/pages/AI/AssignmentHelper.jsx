import { useState } from "react";
import { Loader2, Sparkles, FileText } from "lucide-react";

import StudentLayout from "../../components/student/StudentLayout";
import { getAssignmentHelp } from "../../services/aiService";

const AssignmentHelper = () => {
    const [assignment, setAssignment] = useState("");
    const [question, setQuestion] = useState("");
    const [help, setHelp] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleGetHelp = async (event) => {
        event.preventDefault();

        if (!assignment.trim() || !question.trim()) {
            setError("Please fill in all fields.");
            return;
        }

        setLoading(true);
        setError("");
        setHelp("");

        try {
            const data = await getAssignmentHelp({
                assignment: assignment.trim(),
                question: question.trim(),
            });

            console.log("ASSIGNMENT HELPER RESPONSE:", data);

            setHelp(
                data.data.response ||
                    "Sorry, I could not generate assignment help."
            );
        } catch (err) {
            console.error("Assignment Helper Error:", err);

            setError(
                err.response?.data?.message ||
                    "Something went wrong while contacting the AI assistant."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <StudentLayout
            title="AI Assignment Helper"
            subtitle="Get guidance for your assignments"
        >
            <div className="mx-auto max-w-5xl space-y-6">

                {/* Header */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
                            <FileText
                                size={24}
                                className="text-purple-600"
                            />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-slate-800">
                                AI Assignment Helper
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Get explanations, guidance, and ideas to help
                                you complete your assignment.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleGetHelp}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                    <div className="space-y-5">

                        {/* Assignment */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Assignment Details
                            </label>

                            <textarea
                                value={assignment}
                                onChange={(event) =>
                                    setAssignment(event.target.value)
                                }
                                placeholder="Describe your assignment, topic, requirements, or question..."
                                rows={5}
                                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        {/* Question */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                What do you need help with?
                            </label>

                            <textarea
                                value={question}
                                onChange={(event) =>
                                    setQuestion(event.target.value)
                                }
                                placeholder="Example: Explain how I should approach this assignment..."
                                rows={4}
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
                                    Getting Help...
                                </>
                            ) : (
                                <>
                                    <Sparkles size={18} />
                                    Get Assignment Help
                                </>
                            )}
                        </button>
                    </div>
                </form>

                {/* Result */}
                {help && (
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h3 className="mb-4 font-bold text-slate-800">
                            AI Guidance
                        </h3>

                        <div className="whitespace-pre-wrap rounded-xl bg-slate-50 p-5 text-sm leading-7 text-slate-700">
                            {help}
                        </div>
                    </div>
                )}
            </div>
        </StudentLayout>
    );
};

export default AssignmentHelper;