<?php

use App\Http\Controllers\LedController;
use App\Http\Controllers\SuhuController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/suhu', [SuhuController::class, 'store']);
Route::get('/suhu/latest', [SuhuController::class, 'latest']);
Route::get('/suhu/chart', [SuhuController::class, 'chart']);
Route::get('/suhu/history', [SuhuController::class, 'history']);
Route::get('/suhu/summary', [SuhuController::class, 'suhuSummary']);

Route::get('/led/status', [LedController::class, 'status']);
Route::post('/led/toggle', [LedController::class, 'toggle']);
