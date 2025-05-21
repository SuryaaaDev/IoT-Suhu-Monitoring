<?php

namespace App\Http\Controllers;

use App\Models\Suhu;
use Illuminate\Http\Request;

class SuhuController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'suhu' => 'required|numeric|between:-50,100',
            'kelembaban' => 'required|numeric|between:0,100',
        ]);

        $suhu = new Suhu();
        $suhu->suhu = $validated['suhu'];
        $suhu->kelembaban = $validated['kelembaban'];
        $suhu->save();

        return response()->json(['message' => 'Data saved']);
    }


    public function latest()
    {
        $latest = Suhu::latest()->first();
        return response()->json($latest);
    }

    public function chart()
    {
        $chart = Suhu::latest()->take(100)->get()->reverse()->values();
        return response()->json($chart);
    }

    public function history(Request $request)
    {
        $perPage = $request->get('per_page', 10);
        $history = Suhu::orderBy('created_at', 'desc')->paginate($perPage);

        return response()->json($history);
    }

    public function suhuSummary()
    {
        $over30 = Suhu::where('suhu', '>', 30)->count();
        $underOrEqual30 = Suhu::where('suhu', '<=', 30)->count();

        return response()->json([
            'over30' => $over30,
            'underOrEqual30' => $underOrEqual30,
        ]);
    }
}
