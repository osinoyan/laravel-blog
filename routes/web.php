<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// for auth
Auth::routes();
Route::get('/', function () {
    return redirect('/w/');
});
Route::get('/home', function () {
    return redirect('/w/');
});

Route::post('user/all', 'UserController@getUsers');
Route::post('user/detail', 'UserController@getUserById');
Route::post('post/create', 'PostController@create');
Route::post('post/getlist', 'PostController@getList');

// for react routing
Route::get('/w/{path?}', [
    'uses' => 'HomeController@index',
    'as' => 'home',
    'where' => ['path' => '.*']
]);



// test
Route::get('todo', 'TodoController@index');
Route::post('todo', 'TodoController@submit');
Route::get('ass', function(){
    return App\Todo::all();
});
Route::post('apple', 'TodoController@apple');

