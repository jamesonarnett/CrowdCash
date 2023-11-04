<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $table = 'user_posts';

    protected $fillable = [
        'title',
        'slug',
        'content',
        'image',
        'is_published',
        'user_id',
        'file_path',
        'file_type',
    ];

    protected $casts = [
        'is_published' => 'boolean',
    ];

    protected $attributes = ['votes_to_goal' => 10];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function votes()
    {
        return $this->hasMany(Vote::class);
    }

    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }

    public function scopeWithCommentsCount($query)
    {
        return $query->withCount('comments');
    }

    public function scopeWithVotesCount($query)
    {
        return $query->withCount('votes');
    }
}
