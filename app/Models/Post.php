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
    ];

    protected $casts = [
        'is_published' => 'boolean',
    ];

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
        return $this->belongsToMany(User::class, 'votes', 'post_id', 'user_id')
            ->withPivot('type');
    }

    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }

    public function scopeWithCommentsCount($query)
    {
        return $query->withCount('comments');
    }

    public function scopeWithUserVote($query, $user)
    {
        return $query->with(['votes' => function ($query) use ($user) {
            $query->where('user_id', $user->id);
        }]);
    }
}
