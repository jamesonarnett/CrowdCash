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

    public function comments()
    {
        // return $this->hasMany(Comment::class);
    }

    public function tags()
    {
        // return $this->belongsToMany(Tag::class);
    }

    public function user()
    {
        // return $this->belongsTo(User::class);
    }
}
