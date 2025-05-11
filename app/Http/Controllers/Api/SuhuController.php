<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Suhu;
use Illuminate\Http\Request;

class SuhuController extends Controller
{
    public function store(Request $request)
    {
        $suhu = new Suhu();
        $suhu->suhu = $request->input('suhu');
        $suhu->kelembaban = $request->input('kelembaban');
        $suhu->save();

        return response()->json(['message' => 'Data saved']);
    }

    public function latest()
    {
        $latest = Suhu::latest()->first();
        return response()->json($latest);
    }

    public function history()
    {
        return response()->json(Suhu::latest()->take(50)->get()->reverse()->values());
    }
}
