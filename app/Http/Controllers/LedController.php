<?php

namespace App\Http\Controllers;

use App\Models\Led;
use Illuminate\Http\Request;

class LedController extends Controller
{
    public function status()
    {
        $led = Led::firstOrCreate([]);

        return response()->json(
            ['status' => $led->status],
            200,
            [
                'Content-Type' => 'application/json',
                'Connection' => 'close',
                'Content-Length' => strlen(json_encode(['status' => $led->status]))
            ],
            JSON_UNESCAPED_SLASHES
        );
    }

    public function toggle()
    {
        $led = Led::latest()->first();
        $led->status = !$led->status;
        $led->save();

        return response()->json($led);
    }
}
