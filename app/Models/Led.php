<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Led extends Model
{
    /** @use HasFactory<\Database\Factories\LedFactory> */
    use HasFactory;
    
    protected $fillable = [
        'status',
    ];
}
