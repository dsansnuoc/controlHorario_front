import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { GlobalFunctions } from '../../globals/global-functions';
import { TipoPausasDTO } from '../../modulesDTO/tipoPausas.dto';
import { ServiciosLecturaConfiguracionService } from '../json/ServiciosLecturaConfiguracion';

@Injectable({
  providedIn: 'root',
})
export class TiposPausaService implements OnInit {
  // Variable global en la que se almacenará la URL del servidor.
  apiMaster: string | any = this.cookieService.get('apiMaster');

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private servicioLecturaConfig: ServiciosLecturaConfiguracionService
  ) {
    GlobalFunctions.apis(this.cookieService, this.servicioLecturaConfig);
    this.apiMaster = this.cookieService.get('apiMaster');
  }

  ngOnInit(): void {
    this.apiMaster = this.cookieService.get('apiMaster');
  }

  obtenerTipoPausa(conexion: any): Observable<TipoPausasDTO[]> {
    if (this.apiMaster == '') {
      this.apiMaster = this.cookieService.get('apiMaster');
    }
    return this.http.post<TipoPausasDTO[]>(
      this.apiMaster + '/api/tipoPausa',
      conexion
    );
  }

  addTipoPausa(valores: any): Observable<any> {
    return this.http.post<any>(this.apiMaster + '/api/tipoPausaAlta', valores);
  }

  loadTipoPausa(valores: any): Observable<any> {
    return this.http.post<any>(
      this.apiMaster + '/api/tipoPausaBuscar',
      valores
    );
  }

  updateTipoPausa(valores: any, id: number): Observable<any> {
    return this.http.put<any>(
      this.apiMaster + '/api/tipoPausaActualizar/' + id,
      valores
    );
  }
}
