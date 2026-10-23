import { useEffect, useRef, useState } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";

import StudentLayout from "../../components/student/StudentLayout";
import { chatWithAI } from "../../services/aiService";

const AIChat = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const messagesEndRef = useRef(null);

    // Scroll to the latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, loading]);

    const handleSendMessage = async () => {
        const trimmedMessage = message.trim();

        // Don't send an empty message
        if (!trimmedMessage || loading) {
            return;
        }

        // Add user's message to the chat
        setMessages((previousMessages) => [
            ...previousMessages,
            {
                role: "user",
                content: trimmedMessage,
            },
        ]);

        setMessage("");
        setError("");
        setLoading(true);

        try {
            const data = await chatWithAI(trimmedMessage);
            

            // Add AI response to the chat
            const aiResponse = data["data"]["response"];

setMessages((previousMessages) => [
    ...previousMessages,
    {
        role: "assistant",
        content: aiResponse,
    },
]);
        } catch (err) {
            console.error("AI Chat Error:", err);

            setError(
                err.response?.data?.message ||
                    "Something went wrong while contacting the AI assistant."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <StudentLayout
            title="AI Chat Assistant"
            subtitle="Academic support"
        >
            <div className="mx-auto flex h-[calc(100vh-180px)] max-w-5xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                {/* Chat Header */}
                <div className="border-b border-slate-200 px-5 py-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                            <Bot size={21} className="text-blue-600" />
                        </div>

                        <div>
                            <h2 className="font-bold text-slate-800">
                                AI Campus Assistant
                            </h2>

                            <p className="text-xs text-slate-400">
                                Ask me anything about your studies
                            </p>
                        </div>

                        <div className="ml-auto flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>

                            <span className="text-xs font-medium text-emerald-600">
                                Online
                            </span>
                        </div>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto bg-slate-50 p-4 sm:p-6">
                    {messages.length === 0 ? (
                        <div className="flex h-full items-center justify-center">
                            <div className="max-w-md text-center">
                                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
                                    <Bot size={28} className="text-blue-600" />
                                </div>

                                <h3 className="text-lg font-bold text-slate-800">
                                    How can I help you?
                                </h3>

                                <p className="mt-2 text-sm text-slate-500">
                                    Ask me about programming, courses,
                                    assignments, concepts, or anything related
                                    to your studies.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {messages.map((chatMessage, index) => (
                                <div
                                    key={index}
                                    className={`flex gap-3 ${
                                        chatMessage.role === "user"
                                            ? "justify-end"
                                            : "justify-start"
                                    }`}
                                >
                                    {chatMessage.role === "assistant" && (
                                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100">
                                            <Bot
                                                size={16}
                                                className="text-blue-600"
                                            />
                                        </div>
                                    )}

                                    <div
                                        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                                            chatMessage.role === "user"
                                                ? "rounded-br-md bg-blue-600 text-white"
                                                : "rounded-bl-md border border-slate-200 bg-white text-slate-700"
                                        }`}
                                    >
                                        <p className="whitespace-pre-wrap">
                                            {chatMessage.content}
                                        </p>
                                    </div>

                                    {chatMessage.role === "user" && (
                                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-slate-200">
                                            <User
                                                size={16}
                                                className="text-slate-600"
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* AI loading indicator */}
                            {loading && (
                                <div className="flex items-start gap-3">
                                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100">
                                        <Bot
                                            size={16}
                                            className="text-blue-600"
                                        />
                                    </div>

                                    <div className="rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <Loader2
                                                size={16}
                                                className="animate-spin text-blue-600"
                                            />

                                            <span className="text-sm text-slate-400">
                                                AI is thinking...
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>

                {/* Error */}
                {error && (
                    <div className="border-t border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                {/* Input */}
                <div className="border-t border-slate-200 bg-white p-4">
                    <div className="flex items-end gap-3">
                        <textarea
                            value={message}
                            onChange={(event) =>
                                setMessage(event.target.value)
                            }
                            onKeyDown={handleKeyDown}
                            placeholder="Ask your AI assistant..."
                            rows={1}
                            disabled={loading}
                            className="min-h-[44px] flex-1 resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
                        />

                        <button
                            type="button"
                            onClick={handleSendMessage}
                            disabled={!message.trim() || loading}
                            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                        >
                            {loading ? (
                                <Loader2
                                    size={18}
                                    className="animate-spin"
                                />
                            ) : (
                                <Send size={18} />
                            )}
                        </button>
                    </div>

                    <p className="mt-2 text-center text-[11px] text-slate-400">
                        Press Enter to send • Shift + Enter for a new line
                    </p>
                </div>
            </div>
        </StudentLayout>
    );
};

export default AIChat;