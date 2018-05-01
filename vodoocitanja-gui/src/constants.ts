import { HttpHeaders } from "@angular/common/http";

export class Constants {
    public static get HOME_URL(): string { return 'http://localhost:81/api'; };
    public static get API_URL_KEY(): string { return 'apiUrl'; };
    public static get HEADERS_API_V1(): HttpHeaders { return new HttpHeaders().set("Accept", "application/x.readings.v1+json"); };
  }