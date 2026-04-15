    <?php

    use Illuminate\Database\Migrations\Migration;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Support\Facades\Schema;

    return new class extends Migration
    {
        public function up(): void
        {
Schema::create('academic_terms', function (Blueprint $table) {
    $table->id(); // ✅ FIXED (primary key)

    $table->string('academic_year');
    $table->date('academic_start');
    $table->date('academic_end');
    $table->string('academic_period');

    $table->string('academic_status')->default('Ongoing');
    $table->string('status')->default('Enabled');

    $table->timestamps();
});
        }

        public function down(): void
        {
            Schema::dropIfExists('academic_terms');
        }
    };