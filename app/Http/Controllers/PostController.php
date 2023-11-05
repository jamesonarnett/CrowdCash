<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
            $filteredPosts = Post::with('user', 'comments', 'votes')
                ->withVotesCount()
                ->orderBy('created_at', 'DESC')
                ->published()
                ->get()
                ->filter(function ($post) {
                    return $post->votes_count < $post->votes_to_goal;
                });

            return response()->json([
                'posts' => $filteredPosts->values(),
            ]);
        }
    }

    /**
     * Display a listing of JWT user's posts.
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

            //change mimeType from video/mp4 to video image/png to image etc
            $mimeType = explode('/', $request->mimeType)[0];

            //create post
            $post = Post::create([
                'user_id' => $request->userId,
                'title' => $request->title,
                'slug' => $slug,
                'content' => $request->content,
                'is_published' => 1,
                'file_path' => $request->filePath ?? null,
                'file_type' => $mimeType ?? null,
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

    /**
     * Save image/video to storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function saveMedia(Request $request)
    {
        try {
            if ($request->hasFile('file')) {
                $file = $request->file('file');

                // Generate a unique name for the file
                $fileName = time().'_'.$file->getClientOriginalName();

                // Determine the MIME type of the file
                $mimeType = $file->getMimeType();

                // Define the allowed MIME types for images and videos
                $allowed_image_types = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
                $allowed_video_types = ['video/mp4', 'video/webm'];

                // Check if the file is an image
                if (in_array($mimeType, $allowed_image_types)) {
                    Storage::disk('s3')->put($fileName, file_get_contents($file), 'images');
                } elseif (in_array($mimeType, $allowed_video_types)) {
                    Storage::disk('s3')->put($fileName, file_get_contents($file), 'videos');
                } else {
                    return response()->json([
                        'success' => false,
                        'message' => 'Invalid file type. Only images and videos are allowed.',
                    ]);
                }

                $filePath = env('AWS_URL').$fileName;
            }

            if (! isset($filePath)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Media not saved!',
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Media saved successfully!',
                'filePath' => $filePath,
                'mimeType' => $mimeType,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Media not saved! '.$e->getMessage(),
            ]);
        }
    }
}
