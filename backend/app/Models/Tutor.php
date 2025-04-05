<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tutor extends Model
{
    public $timestamps = false;

    
    protected $table = 'tutor';
    protected $primaryKey = 'idTutor';
}
