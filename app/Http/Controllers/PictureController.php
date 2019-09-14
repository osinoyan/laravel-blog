<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Picture;

class PictureController extends Controller
{

    public function store(Request $request)
    {
        if ($request->image) {
            $image = $request->image;
            $name = time() . '.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
            $path = 'images/post/' . $name;
            \Image::make($request->image)->save($path);
        }



        $Picture = new Picture();
        $Picture->filename = $name;
        $Picture->save();

        $back = ([
            'message' => 'Successfully added',
            'filename' => $name,
        ]);

        return json_encode($back, JSON_UNESCAPED_UNICODE);
    }


}
