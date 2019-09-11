<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Todo;

class TodoController extends Controller
{
    public function index()
    {
        $todos = Todo::all();
        return view('todo.index', [
            'todos' => $todos
        ]);
    }

    public function submit(Request $request)
    {
        // $todo = Todo::create([
        //     'title' => $request->title,
        // ]);
        $todo = Todo::create($request->all());
        return $todo;
    }

    public function apple(Request $request)
    {
        $pen = $request->input("pen");

        $back = [
            "state" => 1,
            "pen" => $pen,
        ];
        return json_encode($back, JSON_UNESCAPED_UNICODE);
    }
}
