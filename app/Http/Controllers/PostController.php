<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth');
    }


    public function create(Request $req)
    {
        $post = Post::create([
            'title' => $req->title,
            'content' => $req->content,
            'user_id' => Auth::user()->id,
            'image' => $req->image,
        ]);
        return $post;
    }

    public function update(Request $req)
    {
        $post = Post::find($req->id);

        if (Auth::user()->id != $post->user_id){
            $err = [
                'msg' => 'Permission Denied'
            ];
            return json_encode($err, JSON_UNESCAPED_UNICODE);
        }
            
        $post->title = $req->title;
        $post->content = $req->content;
        if(strcmp($req->image, "NULL") != 0) 
            $post->image = $req->image;
        $post->save();

        return json_encode($post, JSON_UNESCAPED_UNICODE);
    }

    public function delete(Request $req)
    {
        $post = Post::find($req->id);
        
        if (Auth::user()->id != $post->user_id) {
            $err = [
                'msg' => 'Permission Denied'
            ];
            return json_encode($err, JSON_UNESCAPED_UNICODE);
        }

        $post->delete();

        return json_encode($post, JSON_UNESCAPED_UNICODE);
    }

    public function getList()
    {
        $posts = Post::orderBy('id', 'desc')
               ->get();
        return json_encode($posts, JSON_UNESCAPED_UNICODE);
    }

    public function findById(Request $req)
    {
        $post = Post::find($req->id);
        return json_encode($post, JSON_UNESCAPED_UNICODE);
    }
}
