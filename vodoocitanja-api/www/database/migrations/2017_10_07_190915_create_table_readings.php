<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableReadings extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('readings', function (Blueprint $table) {
            $table->increments('id');
            $table->string('sifra_zone');
            $table->string('naziv_zone');
            $table->string('sifra_vodomjera');
            $table->string('naziv_korisnika');
            $table->string('sifra_ulice');
            $table->string('naziv_ulice');
            $table->string('kucni_broj');
            $table->string('oznaka_ulaza');
            $table->string('serijski_broj_vod');
            $table->string('nacin_ocitavanja');
            $table->string('tip_ocitavanja');
            $table->string('broj_modula');
            $table->dateTime('datum_zadnjeg_ocitanja');
            //$table->integer('zadnje_stanje');
            $table->integer('zadnje_stanje')->nullable();
            $table->integer('vodomjer_nadvodomjer')->nullable();
            //$table->integer('ocitano_stanje')->nullable();
            $table->integer('ocitano_stanje')->nullable();
            $table->dateTime('datum_ocitanja')->nullable();
            $table->text('napomena')->nullable();
            $table->integer('reset_brojila')->nullable();
            $table->string('users');
            $table->dateTime('mjesec_godina');
            $table->integer('status_ocitanja')->nullable();
            $table->string('lokacija_ocitanja')->nullable();
            $table->boolean('aktivno')->default(true);   
            $table->integer('user_id')->nullable(); 
            $table->string('user_id_readings')->nullable();
            $table->string('glavno_vodomjerilo')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('readings');
    }
}
