import { useState } from "react";
import { Loader2, NotebookPen, Sparkles } from "lucide-react";

import StudentLayout from "../../components/student/StudentLayout";
import { summarizeNotes } from "../../services/aiService";

const NoteSummarizer = () => {
    const [notes, setNotes] = useState("");
    const [summary, setSummary] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSummarize = async (event) => {
        event.preventDefault();

        if (!notes.trim()) {
            setError("Please enter your notes.");
            return;
        }

        setLoading(true);
        setError("");
        setSummary("");

        try {
            const data = await summarizeNotes(notes.trim());

            console.log("NOTE SUMMARIZER RESPONSE:", data);

            setSummary(
                data.data.response ||
                    "Sorry, I could not generate a summary."
            );
        } catch (err) {
            console.error("Note Summarizer Error:", err);

            setError(
                err.response?.data?.message ||
                    "Something went wrong while summarizing the notes."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <StudentLayout
            title="AI Note Summarizer"
            subtitle="Turn lengthy notes into concise summaries"
        >
            <div className="mx-auto max-w-5xl space-y-6">

                {/* Header */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                            <NotebookPen
                                size={24}
                                className="text-green-600"
                            />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-slate-800">
                                AI Note Summarizer
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Paste your lecture notes and let AI create a
                                concise summary.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSummarize}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                    <div className="space-y-5">

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Your Notes
                            </label>

                            <textarea
                                value={notes}
                                onChange={(event) =>
                                    setNotes(event.target.value)
                                }
                                placeholder="Paste your lecture notes, study material, or academic text here..."
                                rows={12}
                                className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
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
                                    Summarizing Notes...
                                </>
                            ) : (
                                <>
                                    <Sparkles size={18} />
                                    Summarize Notes
                                </>
                            )}
                        </button>
                    </div>
                </form>

                {/* Result */}
                {summary && (
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
                                <NotebookPen
                                    size={20}
                                    className="text-green-600"
                                />
                            </div>

                            <div>
                                <h3 className="font-bold text-slate-800">
                                    AI Summary
                                </h3>

                                <p className="text-xs text-slate-400">
                                    Generated by AI Campus Assistant
                                </p>
                            </div>
                        </div>

                        <div className="whitespace-pre-wrap rounded-xl bg-slate-50 p-5 text-sm leading-7 text-slate-700">
                            {summary}
                        </div>
                    </div>
                )}
            </div>
        </StudentLayout>
    );
};

export default NoteSummarizer;