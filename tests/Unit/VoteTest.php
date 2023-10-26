<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Vote;
use App\Models\User;
use App\Models\Post;
use Illuminate\Foundation\Testing\RefreshDatabase;

class VoteTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
        $this->post = Post::factory()->create(['user_id' => $this->user->id]);
    }

    /** @test */
    public function it_can_belong_to_a_user()
    {
        $vote = Vote::factory()->create([
            'user_id' => $this->user->id,
            'post_id' => $this->post->id,
        ]);

        $this->assertInstanceOf(User::class, $vote->user);
        $this->assertEquals($this->user->id, $vote->user->id);
    }

    /** @test */
    public function it_can_belong_to_a_post()
    {
        $vote = Vote::factory()->create(['post_id' => $this->post->id]);

        $this->assertInstanceOf(Post::class, $vote->post);
        $this->assertEquals($this->post->id, $vote->post->id);
    }
}