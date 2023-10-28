<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    public function index()
    {
        // if auth, return all posts
        if(auth()->user()) {
            // return all posts ordered by created_at
            return response()->json([
                'posts' => Post::orderBy('created_at', 'DESC')->get()
            ]);
        } else {
            // if not auth, return only published posts
            return response()->json([
                'posts' => Post::orderBy('created_at', 'DESC')->where('is_published', 1)->get()
            ]);
        }
    }

    //find post by id
    public function show($id)
    {
        return response()->json([
            'post' => Post::find($id)
        ]);
    }


    //create new post
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
                'is_published' => 1
            ]);

            return response()->json([
                'post' => $post,
                'success' => true
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Post not created!' . $e->getMessage()
            ]);
        }
    }

    //update post
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
                'is_published' => 1
            ]);

            return response()->json([
                'post' => $post,
                'success' => true
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Post not updated!' . $e->getMessage()
            ]);
        }
    }

    //delete post
    public function destroy($id)
    {
        try {
            $post = Post::find($id);

            //delete all post comments first
            $post->comments()->delete();

            $post->delete();

            return response()->json([
                'success' => true,
                'message' => 'Post deleted successfully!'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Post not deleted!' . $e->getMessage()
            ]);
        }
    }
}
