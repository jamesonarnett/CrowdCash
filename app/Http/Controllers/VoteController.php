<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vote;

class VoteController extends Controller
{
    /**
     * Store a newly created vote
     *
     * @param  \Illuminate\Http\Reques  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $vote = Vote::create([
                'user_id' => $request->user_id,
                'post_id' => $request->post_id,
                'type' => $request->type ?? 1
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Vote created successfully!',
                'votes' => $this->getPostVoteCount($request->post_id)
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Vote not created!' . $e->getMessage()
            ]);
        }
    }


    /**
     * Get post vote count
     *
     * @param int $postId
     * @return int
     */
    private function getPostVoteCount($postId)
    {
        $votes = Vote::where('post_id', $postId)
            ->where('type', 1)
            ->count();

        return $votes;
    }
}
