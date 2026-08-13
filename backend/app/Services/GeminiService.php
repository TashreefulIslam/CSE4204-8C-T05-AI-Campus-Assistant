<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Exception;

class GeminiService
{
    private string $apiKey;
    private string $model;

    public function __construct()
    {
        $this->apiKey = config('services.gemini.key');
        $this->model = env('GEMINI_MODEL', 'gemini-3.5-flash');
    }

    /**
     * Send a prompt to Gemini and return the generated text.
     */
    public function generate(string $prompt): string
    {
        $url = 'https://generativelanguage.googleapis.com/v1beta/interactions';

        $response = Http::timeout(60)
            ->withHeaders([
                'x-goog-api-key' => $this->apiKey,
                'Content-Type' => 'application/json',
            ])
            ->post($url, [
                'model' => $this->model,
                'input' => $prompt,
            ]);

        if ($response->failed()) {
            throw new Exception(
                'Gemini API request failed: ' .
                $response->status() .
                ' - ' .
                $response->body()
            );
        }

        $data = $response->json();

        $text = null;

        foreach ($data['steps'] ?? [] as $step) {
            if (($step['type'] ?? null) === 'model_output') {
                foreach ($step['content'] ?? [] as $content) {
                    if (($content['type'] ?? null) === 'text') {
                        $text = $content['text'];
                        break 2;
                    }
                }
            }
        }

        if (!$text) {
            throw new Exception(
                'Gemini returned an empty response: ' .
                $response->body()
            );
        }

        return $text;
    }
}
