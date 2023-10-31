<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(),
            'user_id' => 20,
            'slug' => Str::slug(fake()->sentence()),
            'content' => fake()->paragraph(),
            'image' => fake()->imageUrl(),
            'is_published' => fake()->boolean(),
        ];
    }
}
