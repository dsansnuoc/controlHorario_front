import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AuthDTO } from '../../modulesDTO/auth.dto';

@Injectable({
  providedIn: 'root',
})
export class ServiciosLoginService {
  // Variable global en la que se almacenará la URL del servidor.
  apiMaster: string | any = this.cookieService.get('apiMaster');

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.apiMaster = this.cookieService.get('apiMaster');
  }

  realizarLogin(datos: AuthDTO): Observable<any> {
    if (this.apiMaster == '') {
      this.apiMaster = this.cookieService.get('apiMaster');
    }
    return this.http.post<any>(this.apiMaster + '/api/entradaLogin', datos);
  }
}
