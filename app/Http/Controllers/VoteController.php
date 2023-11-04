<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Vote;
use Illuminate\Http\Request;

class VoteController extends Controller
{
    /**
     * Store a newly created vote if the user has votes available
     *
     * @param  \Illuminate\Http\Reques  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $user = User::where('id', $request->user_id)->first();

        if ($user->votes_available > 0) {
            try {
                $vote = Vote::create([
                    'user_id' => $request->user_id,
                    'post_id' => $request->post_id,
                    'type' => $request->type ?? 1,
                ]);

                //remove 1 user vote
                $user->votes_available = $user->votes_available - 1;
                $user->save();

                return response()->json([
                    'success' => true,
                    'message' => 'Vote created successfully!',
                    'votes' => $this->getPostVoteCount($request->post_id),
                ]);
            } catch (\Exception $e) {
                return response()->json([
                    'success' => false,
                    'message' => 'Vote not created!'.$e->getMessage(),
                ]);
            }
        } else {
            return response()->json([
                'success' => false,
                'message' => 'You have no votes available!',
            ]);
        }
    }

    /**
     * Get post vote count
     *
     * @param  int  $postId
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
