<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (auth()->user()) {
            return response()->json([
                'posts' => Post::with('user')
                    ->with('comments')
                    ->with('votes')
                    ->orderBy('created_at', 'DESC')
                    ->get(),
            ]);
        } else {
            return response()->json([
                'posts' => Post::with('user')
                    ->with('comments')
                    ->with('votes')
                    ->orderBy('created_at', 'DESC')
                    ->where('is_published', 1)
                    ->get(),
            ]);
        }
    }

    /**
     * Display a listing of THIS user's posts.
     *
     * @return \Illuminate\Http\Response
     */
    public function userIndex($id)
    {
        return response()->json([
            'posts' => Post::with('user')
                ->with('comments')
                ->with('votes')
                ->orderBy('created_at', 'DESC')
                ->where('user_id', $id)
                ->get(),
        ]);
    }

    /**
     * Display a single post.
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response()->json([
            'post' => Post::with('user')
                ->with('comments')
                ->with('votes')
                ->find($id),
        ]);
    }

    /**
     * Create a new post.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            //create slug from request title
            $slug = str_replace(' ', '-', strtolower($request->title));

            //create post
            $post = Post::create([
                'user_id' => $request->user_id,
                'title' => $request->title,
                'slug' => $slug,
                'content' => $request->content,
                'is_published' => 1,
            ]);

            return response()->json([
                'post' => $post,
                'success' => true,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Post not created!'.$e->getMessage(),
            ]);
        }
    }

    /**
     * Update a post.
     *
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            //create slug from request title
            $slug = str_replace(' ', '-', strtolower($request->title));

            //find post
            $post = Post::find($id);

            //update post
            $post->update([
                'user_id' => $request->user_id,
                'title' => $request->title,
                'slug' => $slug,
                'content' => $request->content,
                'is_published' => 1,
            ]);

            return response()->json([
                'post' => $post,
                'success' => true,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Post not updated!'.$e->getMessage(),
            ]);
        }
    }

    /**
     * Delete a post.
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $post = Post::find($id);

            //delete all post comments first
            $post->comments()->delete();

            $post->delete();

            return response()->json([
                'success' => true,
                'message' => 'Post deleted successfully!',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Post not deleted!'.$e->getMessage(),
            ]);
        }
    }
}
