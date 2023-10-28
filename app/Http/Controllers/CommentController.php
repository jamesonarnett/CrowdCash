<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;

class CommentController extends Controller
{
    public function store(Request $request)
    {
        try {
            //create comment
            $comment = Comment::create([
                'user_id' => $request->user_id,
                'post_id' => $request->post_id,
                'content' => $request->content
            ]);

            return response()->json([
                'success' => true,
                'comment' => $comment
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Comment not created!' . $e->getMessage()
            ]);
        }
    }
}
