<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function show($id)
    {
        return response()->json([
            'user' => User::find($id),
        ]);
    }

    public function saveProfileImage(Request $request)
    {
        try {
            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $fileName = time().'.'.$file->getClientOriginalExtension();
                $filePath = env('AWS_URL').$fileName;

                // Assuming that AWS is correctly configured
                Storage::disk('s3')->put($fileName, file_get_contents($file), 'images');

                $user = User::find($request->user_id);
                $user->file_path = $filePath;
                $user->save();

                return response()->json([
                    'success' => true,
                    'image' => $filePath,
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'error' => 'No file provided',
                    'image' => null,
                ]);
            }
        } catch (\Exception $e) {
            logger($e->getMessage()); // Log the specific error message

            return response()->json([
                'success' => false,
                'error' => $e->getMessage(),
                'image' => null,
            ]);
        }
    }
}
