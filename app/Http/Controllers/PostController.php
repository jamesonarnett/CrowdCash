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
            $post = Post::create($request->all());
            return response()->json([
                'post' => $post
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Post not created!'
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
