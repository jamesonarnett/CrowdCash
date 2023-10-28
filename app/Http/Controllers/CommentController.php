<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;

class CommentController extends Controller
{
    /**
     * Get all comments belonging to a post
     *
     * @return \Illuminate\Http\Response
     */

    public function index(Request $request)
    {
        try {
            $post = $request->post_id;
            
            //get comments by post id sorted by latest
            $comments = Comment::where('post_id', $post)
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'comments' => $comments
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Comments not found!' . $e->getMessage()
            ]);
        }
    } 

    /**
     * Get comment by id
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */

    public function show($id)
    {
        try {
            //get comment by id
            $comment = Comment::find($id);

            return response()->json([
                'success' => true,
                'comment' => $comment
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Comment not found!' . $e->getMessage()
            ]);
        }
    }

    /**
     * Create new comment
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            // Create comment
            $comment = Comment::create([
                'post_id' => $request->post_id,
                'user_id' => $request->user_id,
                'content' => $request->comment
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Comment created successfully!',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Comment not created!' . $e->getMessage()
            ]);
        }
    }

    /**
     * Update comment by id
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */

    public function update(Request $request, $id)
    {
        try {
            //update comment
            $comment = Comment::find($id);
            $comment->update($request->all());

            return response()->json([
                'success' => true,
                'comment' => $comment
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Comment not updated!' . $e->getMessage()
            ]);
        }
    }

    /**
     * Delete comment by id
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
     public function destroy($id)
     {
         try {
             //delete comment
             $comment = Comment::find($id);
             $comment->delete();

             return response()->json([
                 'success' => true,
                 'comment' => $comment
             ]);
         } catch (\Exception $e) {
             return response()->json([
                 'success' => false,
                 'message' => 'Comment not deleted!' . $e->getMessage()
             ]);
         }
    }
}
