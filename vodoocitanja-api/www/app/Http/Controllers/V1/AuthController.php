<?php

namespace App\Http\Controllers\V1;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function register(Request $request)
    {
        try {
            $data = $request->json()->all();
            $validationRules = [
                'username' => 'required|unique:users',
               'email' => 'required|email|unique:users',
               'first_name' => 'required',
               'last_name' => 'required',
               'role' => 'required|in:reader,admin',
               'password' => 'required|min:5'
               
                ];
                $validator = \Validator::make($data, $validationRules);
            if ($validator->fails()) {
                return new \Illuminate\Http\JsonResponse(
                [
                'errors' => $validator->errors()
                ], \Illuminate\Http\Response::HTTP_BAD_REQUEST
                );
            }
           
                $user = User::create([
                    'username'  => $request->json()->get('username'),//$request->username,
                    'email'     => $request->json()->get('email'),
                    'first_name'=> $request->json()->get('first_name'),
                    'last_name' => $request->json()->get('last_name'),
                    'role' => $request->json()->get('role'),
                    'user_id_readings' => $request->json()->get('user_id_readings'),
                    'password'  => app('hash')->make($request->json()->get('password')),
                    'api_token' => str_random(50),
                ]);
                return response()->json(['status' => 'success', 'user' => $user], 200);
        } catch (\Exception $exc) {
            return response()->json(['status' => 'error', 'message' => $exc], 500);
            //\Bugsnag::notifyException($ex);
        }
    }

    public function login(Request $request)
    {
        $data = $request->json()->all();
        $user = User::where('username', $data['username'])->first();
        if (!$user) {
            return response()->json(['status' => 'error', 'message' => 'User not found'], 404);
        }
        if (Hash::check($data['password'], $user->password)) {
                $user->update(['api_token'=>str_random(50)]);
                return response()->json(['status' => 'success', 'user' => $user], 200);
        }
        return response()->json(['status' => 'error', 'message' => 'Invalid Credentials'], 401);
    }

    public function logout(Request $request)
    {
        
        $token;
        if ($request->input('api_token')) {
            $token = $request->input('api_token');
        } elseif ($request->header('Authorization')) {
            $token = explode(' ', $request->header('Authorization'))[1];
        }
        $user = User::where('api_token', $token)->first();
        
        //$user = Auth::user();
        if (!$user) {
            return response()->json(['status' => 'error', 'message' => 'Not Logged in'], 401);
        }
        $user->api_token = null;
        $user->save();
        return response()->json(['status' => 'Success', 'message' => 'You are now logged out'], 200);
    }
}
