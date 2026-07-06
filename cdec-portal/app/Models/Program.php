<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
    protected $table = 'programs';
    
    // Explicit primary key name definition matching schema configs
    protected $primaryKey = 'program_id';

    protected $fillable = [
        'abbreviation',
        'program_name',
        'major',
        'college_duration',
        'description',
        'program_head',
        'college_name',
        'program_status',
    ];
}