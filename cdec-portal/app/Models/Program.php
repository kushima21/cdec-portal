<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
    protected $fillable = [
        'abbreviation',
        'program_name',
        'major',
        'college_duration',
        'description'
    ];
}
