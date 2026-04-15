<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AcademicTerm extends Model
{
    protected $table = 'academic_terms';

    protected $primaryKey = 'academic_id'; // ✅ VERY IMPORTANT

    protected $fillable = [
        'academic_year',
        'academic_start',
        'academic_end',
        'academic_period',
        'academic_status',
        'status',
    ];
}