<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Assignment;
use App\Models\AssignmentCompletion;
use App\Models\Course;
use App\Models\CourseMaterial;
use App\Models\CtNotice;
use App\Models\Enrollment;
use App\Models\ExamRoutine;
use App\Models\Notice;
use App\Models\Routine;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class StudentController extends Controller
{
    private function courseIds(): \Illuminate\Support\Collection
    {
        return Enrollment::where('student_id', auth()->id())
            ->distinct()
            ->pluck('course_id');
    }

    private function buildAssignments($courseIds)
    {
        $assignments = Assignment::with('course')
            ->whereIn('course_id', $courseIds)
            ->orderBy('deadline')
            ->get();

        $completed = AssignmentCompletion::where('student_id', auth()->id())
            ->whereIn('assignment_id', $assignments->pluck('id'))
            ->pluck('assignment_id')
            ->flip();

        return $assignments->map(function ($assignment) use ($completed) {
            $assignment->completed = $completed->has($assignment->id);
            return $assignment;
        });
    }

    private function buildNotices($courseIds, $limit = null)
    {
        $general = Notice::with('creator')
            ->whereHas('creator', fn ($query) => $query->where('role', 'admin'))
            ->latest('created_at')
            ->get()
            ->map(fn ($notice) => tap($notice, fn ($item) => $item->notice_type = 'general'));

        $ct = CtNotice::with(['course', 'teacher'])
            ->whereIn('course_id', $courseIds)
            ->latest('created_at')
            ->get()
            ->map(fn ($notice) => tap($notice, fn ($item) => $item->notice_type = 'ct'));

        $items = $general->concat($ct)->sortByDesc('created_at')->values();

        return $limit ? $items->take($limit)->values() : $items;
    }

    public function dashboard()
    {
        $courseIds = $this->courseIds();
        $assignments = $this->buildAssignments($courseIds);
        $exams = ExamRoutine::with('course')
            ->whereIn('course_id', $courseIds)
            ->whereDate('exam_date', '>=', today())
            ->orderBy('exam_date')
            ->orderBy('start_time')
            ->get();
        $notices = $this->buildNotices($courseIds, 5);

        return response()->json([
            'message' => 'Student dashboard retrieved successfully.',
            'data' => [
                'total_enrolled_courses' => $courseIds->count(),
                'pending_assignments' => $assignments->where('completed', false)->count(),
                'upcoming_exams_count' => $exams->count(),
                'new_notices_count' => $notices->count(),
                'today_class_routines' => Routine::with('course')
                    ->whereIn('course_id', $courseIds)
                    ->where('day', now()->format('l'))
                    ->orderBy('start_time')
                    ->get(),
                'upcoming_assignments' => $assignments->where('completed', false)->take(5)->values(),
                'upcoming_exam_routines' => $exams->take(5)->values(),
                'latest_notices' => $notices,
            ],
        ]);
    }

    public function routines()
    {
        return response()->json([
            'data' => Routine::with('course')
                ->whereIn('course_id', $this->courseIds())
                ->orderBy('day')
                ->orderBy('start_time')
                ->get(),
        ]);
    }

    public function exams()
    {
        return response()->json([
            'data' => ExamRoutine::with('course')
                ->whereIn('course_id', $this->courseIds())
                ->whereDate('exam_date', '>=', today())
                ->orderBy('exam_date')
                ->orderBy('start_time')
                ->get(),
        ]);
    }

    public function notices()
    {
        return response()->json(['data' => $this->buildNotices($this->courseIds())]);
    }

    public function assignments()
    {
        return response()->json(['data' => $this->buildAssignments($this->courseIds())]);
    }

    public function completeAssignment(Assignment $assignment)
    {
        abort_unless($this->courseIds()->contains($assignment->course_id), 403);

        $completion = AssignmentCompletion::firstOrCreate([
            'student_id' => auth()->id(),
            'assignment_id' => $assignment->id,
        ]);

        return response()->json([
            'message' => $completion->wasRecentlyCreated
                ? 'Assignment marked as completed.'
                : 'Assignment is already completed.',
            'data' => $completion,
        ], $completion->wasRecentlyCreated ? 201 : 200);
    }

    public function courses()
    {
        return response()->json([
            'data' => Course::with('teacher')
                ->whereIn('id', $this->courseIds())
                ->get(),
        ]);
    }

    public function materials()
    {
        return response()->json([
            'data' => CourseMaterial::with(['course', 'teacher'])
                ->whereIn('course_id', $this->courseIds())
                ->latest('upload_date')
                ->get(),
        ]);
    }

    public function downloadMaterial(CourseMaterial $course_material)
    {
        abort_unless($this->courseIds()->contains($course_material->course_id), 403);

        abort_unless(Storage::disk('public')->exists($course_material->file_path), 404);

        return Storage::disk('public')->download($course_material->file_path, basename($course_material->file_path));
    }
}
