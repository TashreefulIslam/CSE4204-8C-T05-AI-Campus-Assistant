<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AiRequest;
use App\Services\GeminiService;
use Illuminate\Http\Request;
use Exception;

class AiRequestController extends Controller
{
    /**
     * AI Chat Assistant
     */
    public function chat(Request $request, GeminiService $gemini)
    {
        $validated = $request->validate([
            'message' => 'required|string|max:5000',
        ]);

        try {
            $prompt = $validated['message'];

            $response = $gemini->generate($prompt);

            $aiRequest = AiRequest::create([
                'user_id' => $request->user()->id,
                'feature_type' => 'chat',
                'prompt' => $prompt,
                'response' => $response,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'AI response generated successfully.',
                'data' => [
                    'id' => $aiRequest->id,
                    'feature_type' => $aiRequest->feature_type,
                    'prompt' => $aiRequest->prompt,
                    'response' => $aiRequest->response,
                    'created_at' => $aiRequest->created_at,
                ],
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to generate AI response.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

/**
 * AI Study Planner
 */
public function studyPlan(Request $request, GeminiService $gemini)
{
    $validated = $request->validate([
        'subjects' => 'required|string|max:2000',
        'study_duration' => 'required|string|max:100',
        'goal' => 'required|string|max:1000',
    ]);

    try {
        $prompt = "
You are an academic study planning assistant.

Create a practical and personalized study plan for a university student.

Subjects:
{$validated['subjects']}

Study duration:
{$validated['study_duration']}

Student goal:
{$validated['goal']}

Requirements:
- Divide the study plan logically across the available days.
- Allocate reasonable time to each subject.
- Include revision and practice sessions.
- Keep the plan realistic for a university student.
- Use clear headings and bullet points.
- Do not invent specific university dates.
";

        $response = $gemini->generate($prompt);

        $aiRequest = AiRequest::create([
            'user_id' => $request->user()->id,
            'feature_type' => 'study_plan',
            'prompt' => $prompt,
            'response' => $response,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Study plan generated successfully.',
            'data' => [
                'id' => $aiRequest->id,
                'feature_type' => $aiRequest->feature_type,
                'response' => $aiRequest->response,
                'created_at' => $aiRequest->created_at,
            ],
        ], 200);

    } catch (Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Failed to generate study plan.',
            'error' => $e->getMessage(),
        ], 500);
    }
}

/**
 * AI Assignment Helper
 */
public function assignmentHelper(Request $request, GeminiService $gemini)
{
    $validated = $request->validate([
        'assignment_title' => 'required|string|max:500',
        'assignment_description' => 'required|string|max:3000',
        'question' => 'required|string|max:3000',
    ]);

    try {
        $prompt = "
You are an academic assignment assistant for university students.

Help the student understand and complete their assignment responsibly.

Assignment title:
{$validated['assignment_title']}

Assignment description:
{$validated['assignment_description']}

Student's question:
{$validated['question']}

Requirements:
- Explain the relevant concept clearly.
- Break the problem into manageable steps.
- Provide guidance and examples where useful.
- Identify important concepts the student should understand.
- Do not pretend to know requirements that were not provided.
- Do not simply provide a complete ready-to-submit assignment.
- Encourage the student to understand the solution.
";

        $response = $gemini->generate($prompt);

        $aiRequest = AiRequest::create([
            'user_id' => $request->user()->id,
            'feature_type' => 'assignment_helper',
            'prompt' => $prompt,
            'response' => $response,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Assignment guidance generated successfully.',
            'data' => [
                'id' => $aiRequest->id,
                'feature_type' => $aiRequest->feature_type,
                'response' => $aiRequest->response,
                'created_at' => $aiRequest->created_at,
            ],
        ], 200);

    } catch (Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Failed to generate assignment guidance.',
            'error' => $e->getMessage(),
        ], 500);
    }
}


/**
 * AI Quiz Generator
 */
public function quiz(Request $request, GeminiService $gemini)
{
    $validated = $request->validate([
        'topic' => 'required|string|max:1000',
        'number_of_questions' => 'required|integer|min:1|max:20',
        'difficulty' => 'required|string|in:easy,medium,hard',
    ]);

    try {
        $prompt = "
You are an AI quiz generator for university students.

Generate a multiple-choice quiz based on the following information.

Topic:
{$validated['topic']}

Number of questions:
{$validated['number_of_questions']}

Difficulty:
{$validated['difficulty']}

For every question:
1. Write one clear question.
2. Provide exactly four options.
3. Provide the correct answer.
4. Provide a short explanation of the correct answer.

Important:
- Questions should be academically meaningful.
- Do not create duplicate questions.
- Make sure only one option is correct.
- Keep the difficulty appropriate.
- Return the result in clear numbered sections.
";

        $response = $gemini->generate($prompt);

        $aiRequest = AiRequest::create([
            'user_id' => $request->user()->id,
            'feature_type' => 'quiz',
            'prompt' => $prompt,
            'response' => $response,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Quiz generated successfully.',
            'data' => [
                'id' => $aiRequest->id,
                'feature_type' => $aiRequest->feature_type,
                'response' => $aiRequest->response,
                'created_at' => $aiRequest->created_at,
            ],
        ], 200);

    } catch (Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Failed to generate quiz.',
            'error' => $e->getMessage(),
        ], 500);
    }
}


/**
 * AI Note Summarizer
 */
public function summarize(Request $request, GeminiService $gemini)
{
    $validated = $request->validate([
        'notes' => 'required|string|max:15000',
    ]);

    try {
        $prompt = "
You are an AI academic note summarization assistant for university students.

Summarize the following study notes clearly and concisely.

Notes:
{$validated['notes']}

Requirements:
- Identify the main concepts and important points.
- Remove unnecessary repetition.
- Preserve important technical terms and definitions.
- Organize the summary using clear headings and bullet points.
- Do not add information that is not present in the provided notes.
- Make the summary useful for exam revision.
";

        $response = $gemini->generate($prompt);

        $aiRequest = AiRequest::create([
            'user_id' => $request->user()->id,
            'feature_type' => 'summarize',
            'prompt' => $prompt,
            'response' => $response,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Notes summarized successfully.',
            'data' => [
                'id' => $aiRequest->id,
                'feature_type' => $aiRequest->feature_type,
                'response' => $aiRequest->response,
                'created_at' => $aiRequest->created_at,
            ],
        ], 200);

    } catch (Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Failed to summarize notes.',
            'error' => $e->getMessage(),
        ], 500);
    }
}

}
