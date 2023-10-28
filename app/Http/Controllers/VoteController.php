<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vote;

class VoteController extends Controller
{
    public function store(Request $request)
    {
        try {
            //create vote
            $vote = Vote::create([
                'user_id' => $request->user_id,
                'post_id' => $request->post_id,
                'type' => $request->type
            ]);

            return response()->json([
                'success' => true,
                'vote' => $vote
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Vote not created!' . $e->getMessage()
            ]);
        }
    }
}
