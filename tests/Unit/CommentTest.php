<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Comment;
use App\Models\User;
use App\Models\Post;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CommentTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
        $this->post = Post::factory()->create(['user_id' => $this->user->id]);
    }

    /** @test */
    public function it_can_belong_to_a_user()
    {
        $comment = Comment::factory()->create(['post_id' => $this->post->id, 'user_id' => $this->user->id]);

        $this->assertInstanceOf(User::class, $comment->user);
        $this->assertEquals($this->user->id, $comment->user->id);
    }

    /** @test */
    public function it_can_belong_to_a_post()
    {
        $comment = Comment::factory()->create(['post_id' => $this->post->id]);

        $this->assertInstanceOf(Post::class, $comment->post);
        $this->assertEquals($this->post->id, $comment->post->id);
    }
}