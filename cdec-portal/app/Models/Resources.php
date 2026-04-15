<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Resources extends Model
{
    protected $table = 'resources';
    protected $primaryKey = 'resources_id'; // 🔥 FIX THIS
    protected $fillable = [
        'room_name',
        'glossary',
        'description',
        'building_id',
        'floor',
        'capacity'
    ];
}