<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ct_notices', function (Blueprint $table) {
        $table->id();

        $table->foreignId('course_id')
              ->constrained()
              ->onDelete('cascade');

        $table->foreignId('teacher_id')
              ->constrained('users')
              ->onDelete('cascade');

        $table->string('title');
        $table->date('exam_date');
        $table->time('start_time');
        $table->time('end_time');

        $table->timestamp('created_at')->useCurrent();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ct_notices');
    }
};
