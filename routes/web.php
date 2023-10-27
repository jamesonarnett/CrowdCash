<?php

use App\Http\Controllers\ProfileController;
use App\Models\Post;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/create-post', function () {
    return Inertia::render('CreatePost');
})->middleware(['auth', 'verified'])->name('post');

Route::get('/post/{slug}', function ($slug) {
    $post = Post::where('slug', $slug)->first();
    if ($post) return Inertia::render('UserPost', ['post' => $post]);
    return Inertia::render('UserPost', ['post' => null]);
})->middleware(['auth', 'verified'])->name('post.slug');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/posts', [ProfileController::class, 'posts'])->name('profile.posts');
});

require __DIR__.'/auth.php';
