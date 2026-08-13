import api from "./api";

/**
 * AI Chat Assistant
 */
export const chatWithAI = async (message) => {
    const response = await api.post("/ai/chat", {
        message,
    });

    return response.data;
};

/**
 * AI Study Planner
 */
export const generateStudyPlan = async (data) => {
    const response = await api.post("/ai/study-plan", data);

    return response.data;
};

/**
 * AI Assignment Helper
 */
export const getAssignmentHelp = async (data) => {
    const response = await api.post("/ai/assignment-helper", data);

    return response.data;
};

/**
 * AI Quiz Generator
 */
export const generateQuiz = async (data) => {
    const response = await api.post("/ai/quiz", data);

    return response.data;
};

/**
 * AI Note Summarizer
 */
export const summarizeNotes = async (notes) => {
    const response = await api.post("/ai/summarize", {
        notes,
    });

    return response.data;
};
