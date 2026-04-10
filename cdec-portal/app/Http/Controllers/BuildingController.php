<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Building;

class BuildingController extends Controller
{
    // Display page with buildings
    public function index()
    {
        $buildings = Building::all()->map(function ($building) {
            return [
                'building_id' => $building->building_id,
                'building_name' => $building->building_name,
                'floors' => json_decode($building->floors, true),
                'description' => $building->description,
            ];
        });

        return Inertia::render('Admin/Building', [
            'buildings' => $buildings
        ]);
    }

    // Store building
public function store(Request $request)
{
    $request->validate([
        'building_name' => 'required|string|max:255',
        'floors' => 'required|array',
        'description' => 'nullable|string',
    ]);

    Building::create([
        'building_name' => $request->building_name,
        'floors' => json_encode($request->floors),
        'description' => $request->description,
    ]);

    // ✅ Use Inertia::location or redirect to index
    return redirect()->route('building.index')
        ->with('success', 'Building created successfully!');
}
}