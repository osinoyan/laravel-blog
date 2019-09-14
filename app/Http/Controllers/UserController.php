<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
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

    public function getUserById(Request $req)
    {
        $id = $req->input('id');
        $user = User::find($id);
        return json_encode($user, JSON_UNESCAPED_UNICODE);
    }

    public function getUsers()
    {
        $users = User::all();
        return json_encode($users, JSON_UNESCAPED_UNICODE);
    }

    public function getAuth()
    {
        if (Auth::user() == null){
            $back = ([
                'created_at' => "2000-01-01 00:00:00",
                'email' => "",
                'email_verified_at' => null,
                'id' => 0,
                'name' => "guest",
                'updated_at' => "2000-01-01 00:00:00",
            ]);
            return json_encode($back, JSON_UNESCAPED_UNICODE);
        }
        $user = Auth::user();
        return json_encode($user, JSON_UNESCAPED_UNICODE);
    }
}
