<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserPostTest extends TestCase
{
    use RefreshDatabase;

    public function test_userpost_page_is_displayed(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get('/posts');

        $response->assertOk();
    }

    public function test_userposts_displays_user_posts(): void
    {
        $user = User::factory()->create();

        $user->posts()->createMany([
            ['title' => 'Post 1', 'content' => 'Content for Post 1', 'slug' => 'post-1'],
            ['title' => 'Post 2', 'content' => 'Content for Post 2', 'slug' => 'post-2'],
        ]);

        logger($user->posts);
        $response = $this
            ->actingAs($user)
            ->get('/posts');

        $response->assertSee('Post 1');
        $response->assertSee('Post 2');
    }

    public function test_userposts_does_not_display_other_users_posts(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();

        $user->posts()->createMany([
            ['title' => 'Post 1', 'content' => 'Content for Post 1', 'slug' => 'post-1'],
        ]);
        $otherUser->posts()->createMany([
            ['title' => 'Other User Post', 'content' => 'Content for Other User Post', 'slug' => 'post-1'],
        ]);

        $response = $this
            ->actingAs($user)
            ->get('/posts');

        $response->assertDontSee('Other User Post');
    }
}
