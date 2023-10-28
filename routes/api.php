<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CommentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

/**
 * Auth routes
 */
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


/**
 * Post routes
 */
Route::get('/post', [PostController::class, 'index']);

Route::post('/post', [PostController::class, 'store']);

Route::get('/post/user/{id}', [PostController::class, 'userIndex']);

Route::get('/post/{id}', [PostController::class, 'show']);

Route::put('/post/{id}', [PostController::class, 'update']);

Route::delete('/post/{id}', [PostController::class, 'destroy']);


/**
 * User routes
 */
Route::get('/user/{id}', [UserController::class, 'show']);


/**
 * Comment routes
 */
Route::get('/comment', [CommentController::class, 'index']);

Route::post('/comment', [CommentController::class, 'store']);

Route::get('/comment/{id}', [CommentController::class, 'show']);

Route::put('/comment/{id}', [CommentController::class, 'update']);

Route::delete('/comment/{id}', [CommentController::class, 'destroy']);
