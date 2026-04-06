<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
    protected $fillable = [
        'program_id',
        'abbreviation',
        'program_name',
        'major',
        'college_duration',
        'description',
        'program_head',
        'program_status',
    ];
}
