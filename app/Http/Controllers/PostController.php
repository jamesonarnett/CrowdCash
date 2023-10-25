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
            return response()->json([
                'posts' => Post::all()
            ]);
        } else {
            // if not auth, return only published posts
            return response()->json([
                'posts' => Post::where('is_published', true)->get()
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
        $post = Post::find($id);
        $post->update($request->all());

        return response()->json([
            'post' => $post
        ]);
    }

    //delete post
    public function destroy($id)
    {
        $post = Post::find($id);
        $post->delete();

        return response()->json([
            'message' => 'Post deleted successfully!'
        ]);
    }
}
