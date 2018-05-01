<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$api = app('Dingo\Api\Routing\Router');

$api->version('v1', function ($api) {
    
    $api->get('ping', function () {
        return 'pong v1';
    });

    $api->post('/auth/register','App\Http\Controllers\V1\AuthController@register');
    $api->post('/auth/login','App\Http\Controllers\V1\AuthController@login');
    $api->post('/auth/logout','App\Http\Controllers\V1\AuthController@logout');     
    
    $api->group(['middleware' => 'auth'], function ($api) {
        // Endpoints registered here will have the "foo" middleware applied.
        //readings
        $api->get('/readings','App\Http\Controllers\V1\ReadingController@index');
        $api->get('/readings/streets','App\Http\Controllers\V1\ReadingController@groupByStreet');
        $api->get('/readings/street/{street_id}','App\Http\Controllers\V1\ReadingController@getReadingsForStreet');
        $api->post('/readings','App\Http\Controllers\V1\ReadingController@store');
        $api->get('/readings/{reading}','App\Http\Controllers\V1\ReadingController@show');
        $api->put('/readings/{readings}','App\Http\Controllers\V1\ReadingController@update');
        $api->delete('/readings/{readings}','App\Http\Controllers\V1\ReadingController@destroy');
    });
    
});

$api->version('v2', function ($api) {

    $api->get('ping', function () {
        return 'pong v2';
    });
});


/*

$apiVer = 'v1';

$router->get($apiVer.'/', function () use ($router) {
    return $router->app->version();
});


$router->get($apiVer.'/ping', function () {
    return 'pong';
});

//auth
$router->post($apiVer.'/auth/register','AuthController@register');
$router->post($apiVer.'/auth/login','AuthController@login');
$router->post($apiVer.'/auth/logout','AuthController@logout');

//readings
$router->get($apiVer.'/readings','ReadingController@index');
$router->get($apiVer.'/readings/streets','ReadingController@groupByStreet');
$router->get($apiVer.'/readings/street/{street_id}','ReadingController@getReadingsForStreet');
$router->post($apiVer.'/readings','ReadingController@store');
$router->get($apiVer.'/readings/{reading}','ReadingController@show');
$router->put($apiVer.'/readings/{readings}','ReadingController@update');
$router->delete($apiVer.'/readings/{readings}','ReadingController@destroy');


*/