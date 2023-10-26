<?php

namespace Database\Factories;

use App\Models\Vote;
use App\Models\User;
use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;

class VoteFactory extends Factory
{
    protected $model = Vote::class;

    public function definition()
    {
        return [
            'type' => $this->faker->randomElement([0, 1]),
            'user_id' => function () {
                return User::factory()->create()->id;
            },
            'post_id' => function () {
                return Post::factory()->create()->id;
            },
        ];
    }
}