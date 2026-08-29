import { useState } from "react";
import { FileCheck2, Loader2, Sparkles } from "lucide-react";

import StudentLayout from "../../components/student/StudentLayout";
import { generateQuiz } from "../../services/aiService";

const QuizGenerator = () => {
    const [topic, setTopic] = useState("");
    const [numberOfQuestions, setNumberOfQuestions] = useState("5");
    const [difficulty, setDifficulty] = useState("medium");

    const [quiz, setQuiz] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleGenerateQuiz = async (event) => {
        event.preventDefault();

        if (!topic.trim()) {
            setError("Please enter a topic.");
            return;
        }

        setLoading(true);
        setError("");
        setQuiz("");

        try {
            const data = await generateQuiz({
                topic: topic.trim(),
                number_of_questions: numberOfQuestions,
                difficulty: difficulty,
            });

            console.log("QUIZ RESPONSE:", data);

            setQuiz(
                data.data.response ||
                    "Sorry, I could not generate a quiz."
            );
        } catch (err) {
            console.error("Quiz Generator Error:", err);

            setError(
                err.response?.data?.message ||
                    "Something went wrong while generating the quiz."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <StudentLayout
            title="AI Quiz Generator"
            subtitle="Create quizzes for practice"
        >
            <div className="mx-auto max-w-5xl space-y-6">

                {/* Header */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
                            <FileCheck2
                                size={24}
                                className="text-orange-600"
                            />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-slate-800">
                                AI Quiz Generator
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Generate practice questions from any academic
                                topic.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleGenerateQuiz}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                    <div className="space-y-5">

                        {/* Topic */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Topic
                            </label>

                            <input
                                type="text"
                                value={topic}
                                onChange={(event) =>
                                    setTopic(event.target.value)
                                }
                                placeholder="Example: Database Normalization"
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        {/* Number */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Number of Questions
                            </label>

                            <select
                                value={numberOfQuestions}
                                onChange={(event) =>
                                    setNumberOfQuestions(event.target.value)
                                }
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                            >
                                <option value="5">5 Questions</option>
                                <option value="10">10 Questions</option>
                                <option value="15">15 Questions</option>
                                <option value="20">20 Questions</option>
                            </select>
                        </div>

                        {/* Difficulty */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Difficulty
                            </label>

                            <select
                                value={difficulty}
                                onChange={(event) =>
                                    setDifficulty(event.target.value)
                                }
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                            >
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
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
                                    Generating Quiz...
                                </>
                            ) : (
                                <>
                                    <Sparkles size={18} />
                                    Generate Quiz
                                </>
                            )}
                        </button>
                    </div>
                </form>

                {/* Result */}
                {quiz && (
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h3 className="mb-4 font-bold text-slate-800">
                            Generated Quiz
                        </h3>

                        <div className="whitespace-pre-wrap rounded-xl bg-slate-50 p-5 text-sm leading-7 text-slate-700">
                            {quiz}
                        </div>
                    </div>
                )}
            </div>
        </StudentLayout>
    );
};

export default QuizGenerator;