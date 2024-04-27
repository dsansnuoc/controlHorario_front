import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class ServiciosLecturaConfiguracionService {
  camposConfig: any = {};
  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.http.get('../../../assets/json/config.json').subscribe((respuesta) => {
      this.camposConfig = respuesta;
    });
  }
}
