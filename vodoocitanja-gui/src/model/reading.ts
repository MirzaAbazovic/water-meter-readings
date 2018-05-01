export class ReadingModel{
    "id": number;
    "sifra_zone": string;
    "naziv_zone": string;
    "sifra_vodomjera": string;
    "naziv_korisnika": string;
    "sifra_ulice": string;
    "naziv_ulice": string;
    "kucni_broj": string;
    "oznaka_ulaza": string;
    "serijski_broj_vod": string;
    "nacin_ocitavanja":string;
    "tip_ocitavanja": string;
    "datum_zadnjeg_ocitanja": Date;
    "zadnje_stanje": number;
    "vodomjer_nadvodomjer": number;
    "ocitano_stanje": number;
    "datum_ocitanja": Date;
    "napomena": string;
    "reset_brojila": number;
    "users": string;
    "mjesec_godina": Date;
    "status_ocitanja": number;
    "lokacija_ocitanja": string;
    "aktivno": boolean;
    "user_id": string;
    "user_id_readings": string;
    "glavno_vodomjerilo": string;
    "created_at": Date;
    "updated_at": Date
}