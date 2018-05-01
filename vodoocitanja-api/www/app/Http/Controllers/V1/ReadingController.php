<?php

namespace App\Http\Controllers\V1;

use App\Reading;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ReadingController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //$this->middleware('auth');
    }

    public function index()
    {
       
        if(Auth::user()->role=="admin"){
            return response()->json(['readings' => Reading::all()], 200);
        }
        $user_id_reading  = Auth::user()->user_id_readings;
        $readings = DB::select('select * from `readings` where user_id_readings = ? and aktivno = 1', [$user_id_reading]);
        //return response()->json(['readings'=> Auth::user()->readings->where('aktivno', '=', true)],200);
        return response()->json(['readings'=> $readings],200);
    }

    public function groupByStreet()
    {
        if(Auth::user()->role=="admin"){
            $readings_by_street = DB::select('select `sifra_ulice`, `naziv_ulice`,  count(id) as total, cast(sum(status_ocitanja=1) as unsigned) as ocitano, cast(sum(status_ocitanja=0) as unsigned) as neocitano from `readings` where aktivno = 1 group by `sifra_ulice`');
        }
        else{
            $readings_by_street = DB::select('select `sifra_ulice`, `naziv_ulice`,  count(id) as total, cast(sum(status_ocitanja=1) as unsigned) as ocitano, cast(sum(status_ocitanja=0) as unsigned) as neocitano from `readings` where user_id_readings = ? and aktivno = 1 group by `sifra_ulice`',[Auth::user()->user_id_readings]);
        }
        return response()->json(['readings_by_street'=> $readings_by_street ],200);
    }
  
    public function getReadingsForStreet($street_id)
    {
        if(Auth::user()->role=="admin"){
            $data = Reading::all()->where('sifra_ulice', $street_id);
            return response()->json(['readings' => $data], 200);
        }
        $readings = DB::select('select * from `readings` where user_id_readings = ? and aktivno = 1 and sifra_ulice=?', [ Auth::user()->user_id_readings, $street_id]);
        // return response()->json(['readings'=> Auth::user()->readings->where('sifra_ulice', $street_id)],200);
    
        return response()->json(['readings'=> $readings],200);
    }


    public function show($readingId)
    {
        $reading = Reading::findOrFail($readingId);

        if (Auth::user()->user_id_readings !== $reading->user_id_readings) {
            return response()->json(['status' => 'error', 'message' => 'unauthorized'], 401);
        }

        return response()->json(['reading'=> $reading],200);
    }

    public function store(Request $request)
    {
        if($request->user()->role!="admin"){
            return response()->json(['status' => 'error', 'message' => 'unauthorized'], 401);
        }
        $data = $request->json()->all();
        
        Reading::create([
                'sifra_zone' => $data['sifra_zone'],
                'naziv_zone' => $data['naziv_zone'],
                //'user_id'    => $data['user_id'],
                'sifra_vodomjera' => $data['sifra_vodomjera'],
                'naziv_korisnika' => $data['naziv_korisnika'],
                'sifra_ulice' => $data['sifra_ulice'],
                'naziv_ulice' => $data['naziv_ulice'],
                'kucni_broj' => $data['kucni_broj'],
                'oznaka_ulaza' => $data['oznaka_ulaza'],
                'serijski_broj_vod' => $data['serijski_broj_vod'],
                'nacin_ocitavanja' => $data['nacin_ocitavanja'],
                'tip_ocitavanja' => $data['tip_ocitavanja'],
                'datum_zadnjeg_ocitanja' => $data['datum_zadnjeg_ocitanja'],
                'zadnje_stanje' => $data['zadnje_stanje'],
                'mjesec_godina' => $data['mjesec_godina'],
                'aktivno' => $data['aktivno'],
                'user_id_readings' => $data['user_id_readings']
            ]);

        return response()->json(['message' => 'success'], 200);    
    }

    public function update(Request $request, $readingId)
    {
        $reading = Reading::find($readingId);
        if($reading == null){
            return response()->json(['status' => 'error', 'message' => 'reading not found'], 404);
            
        }
            
        $data = $request->json()->all();
        $validationRules = [
            'ocitano_stanje' => 'required',
            'lokacija_ocitanja' => 'required'
            ];
            $validator = \Validator::make($data, $validationRules);
            if ($validator->fails()) {
            return new \Illuminate\Http\JsonResponse(
            [
            'errors' => $validator->errors()
            ], \Illuminate\Http\Response::HTTP_BAD_REQUEST
            );
            }
        
        if (Auth::user()->user_id_readings !== $reading->user_id_readings) {
            return response()->json(['status' => 'error', 'message' => 'unauthorized'], 401);
        }

        if (!$reading->aktivno) {
            return response()->json(['status' => 'error', 'message' => 'reading is not active'], 400);
        }
        $reading->ocitano_stanje = $data['ocitano_stanje'];
        $reading->datum_ocitanja = $data['datum_ocitanja'];
        $reading->reset_brojila = $data['reset_brojila'];
        $reading->napomena = $data['napomena'];
        $reading->lokacija_ocitanja = $data['lokacija_ocitanja'];
        //$reading->status_ocitanja = 1;
        
        $reading->save();
        return response()->json(['message' => 'success', 'reading' => $reading], 200);
    }

    public function destroy($id)
    {
        //for now
        return response()->json(['status'=>'error','message'=>'delete is not supported'],405);
        
        $reading=Reading::find($id);

        if(Auth::user()->id !== $reading->user_id) {
            return response()->json(['status'=>'error','message'=>'unauthorized'],401);
        }

        if (Reading::destroy($id)) {
            return response()->json(['status' => 'success', 'message' => 'Reading Deleted Successfully']);
        }

        return response()->json(['status' => 'error', 'message' => 'Something went wrong']);

    }
}