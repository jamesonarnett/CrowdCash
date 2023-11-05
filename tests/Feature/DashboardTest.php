<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_dashboard_page_is_displayed(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get('/dashboard');

        $response->assertOk();
    }

    public function test_dashboard_displays_user_posts(): void
    {
        $user = User::factory()->create();

        // Create some sample posts associated with the user
        $user->posts()->createMany([
            ['title' => 'Post 1', 'content' => 'Content for Post 1', 'slug' => 'post-1'],
            ['title' => 'Post 2', 'content' => 'Content for Post 2', 'slug' => 'post-2'],
        ]);

        logger($user->posts);
        $response = $this
            ->actingAs($user)
            ->get('/dashboard');

        // Assert that the page contains the titles of the user's posts
        $response->assertSee('Post 1');
        $response->assertSee('Post 2');
    }

    public function test_dashboard_displays_other_users_posts(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();

        // Create some sample posts associated with both users
        $user->posts()->createMany([
            ['title' => 'Post 1', 'content' => 'Content for Post 1', 'slug' => 'post-1'],
        ]);
        $otherUser->posts()->createMany([
            ['title' => 'OtherUserPost', 'content' => 'Content for Other User Post', 'slug' => 'post-1'],
        ]);

        logger(
            [
                'user' => $user->posts,
                'otherUser' => $otherUser->posts,
            ],
        );
        $response = $this
            ->actingAs($user)
            ->get('/dashboard');

        $response->assertSee('Post 1');
        $response->assertDontSee('OtherUserPost');
    }
}
