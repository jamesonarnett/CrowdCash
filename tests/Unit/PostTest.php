<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PostTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
    }

    /** @test */
    public function it_can_check_if_post_is_published()
    {
        $publishedPost = Post::factory()->create([
            'is_published' => true, 
            'user_id' => $this->user->id
        ]);

        $unpublishedPost = Post::factory()->create([
            'is_published' => false, 
            'user_id' => $this->user->id
        ]);

        $this->assertTrue($publishedPost->is_published);
        $this->assertFalse($unpublishedPost->is_published);
    }

    /** @test */
    public function it_can_return_published_posts()
    {
        Post::factory()->count(3)->create([
            'is_published' => true, 
            'user_id' => $this->user->id
        ]);

        Post::factory()->create([
            'is_published' => false, 
            'user_id' => $this->user->id
        ]);

        $publishedPosts = Post::published()->get();

        $this->assertCount(3, $publishedPosts);
    }

    /** @test */
    public function it_can_return_posts_comments_count()
    {
        $post = Post::factory()->create(['user_id' => $this->user->id]);
        $post->comments()->create(['content' => 'Comment 1']);
        $post->comments()->create(['content' => 'Comment 2']);

        $postCommentsCount = Post::withCommentsCount()->first()->comments_count;

        $this->assertEquals(2, $postCommentsCount);
    }

    /** @test */
    public function it_can_return_posts_with_user_vote()
    {
        $post = Post::factory()->create(['user_id' => $this->user->id]);
        $post->votes()->create(['user_id' => $this->user->id, 'type' => 1]);

        $voteCount = Post::withVotesCount()->first()->votes_count;

        $this->assertEquals(1, $voteCount);
    }
}