<?php

namespace App\Http\Controllers;

use App\Models\User;

class UserController extends Controller
{
    public function show($id)
    {
        return response()->json([
            'user' => User::find($id),
        ]);
    }
}
