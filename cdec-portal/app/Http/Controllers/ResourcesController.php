<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Building;
use Inertia\Inertia;
use App\Models\Resources;
class ResourcesController extends Controller
{
    public function index()
    {
        $buildings = Building::all()->map(function ($building) {
            return [
                'id' => $building->building_id,
                'name' => $building->building_name,
            ];
        });

        return Inertia::render('Admin/Resources', [
            'buildings' => $buildings
        ]);
    }

    public function store(Request $request)
{
    $request->validate([
        'room_name' => 'required',
        'building' => 'required',
        'floor' => 'required',
        'capacity' => 'required|integer'
    ]);

    Resources::create([
        'room_name' => $request->room_name,
        'glossary' => $request->glossary,
        'description' => $request->description,
        'building_id' => $request->building,
        'floor' => $request->floor,
        'capacity' => $request->capacity,
    ]);

    return redirect()->back()->with('success', 'Room created successfully');
}
}