<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Comment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CommentController extends Controller
{

    public function create(Request $req)
    {
        $comment = Comment::create([
            'post_id' => $req->post_id,
            'name' => $req->name,
            'message' => $req->message,
        ]);
        return $comment;
    }

    public function delete(Request $req)
    {
        $comment = 
            DB::table('comments')
                ->where('comment_id', $req->comment_id)
                ->delete();

        return json_encode($comment, JSON_UNESCAPED_UNICODE);
    }

    public function getCommentsByPostId(Request $req)
    {
        $comments = 
            DB::table('comments')
            ->where('post_id', $req->id)
            ->get();
        return json_encode($comments, JSON_UNESCAPED_UNICODE);
    }
}
