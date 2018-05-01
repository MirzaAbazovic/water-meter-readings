<?php
namespace App;
use Illuminate\Database\Eloquent\Model;
use App\Scopes\ActiveScope;
use App\Scopes\OrderScope;

class Reading extends Model {

    protected $quarded = [];

    protected $fillable = ['sifra_zone','naziv_zone', 'sifra_vodomjera',
    'naziv_korisnika', 'sifra_ulice', 'naziv_ulice', 'kucni_broj', 'oznaka_ulaza',
    'serijski_broj_vod', 'nacin_ocitavanja', 'tip_ocitavanja', 'broj_modula',
    'datum_zadnjeg_ocitanja', 'zadnje_stanje', 'vodomjer_nadvodomjer', 'ocitano_stanje',
    'datum_ocitanja', 'napomena', 'reset_brojila' , 'users', 'mjesec_godina',
    'status_ocitanja','lokacija_ocitanja','aktivno','user_id','user_id_readings','glavno_vodomjerilo'];
        
    protected $casts = [
        'aktivno' => 'boolean'
    ];
    
    public function user()
    {
    	return $this->belongsTo(User::class);
    }

    
    protected static function boot()
    {
        parent::boot();

        static::addGlobalScope(new ActiveScope);
        static::addGlobalScope(new OrderScope('naziv_ulice'));
        static::addGlobalScope(new OrderScope('kucni_broj'));
        
    }
}