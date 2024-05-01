import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { GlobalFunctions } from '../../globals/global-functions';
import { TipoSolicitudDTO } from '../../modulesDTO/tipoSolicitud.dto';
import { ServiciosLecturaConfiguracionService } from '../json/ServiciosLecturaConfiguracion';

@Injectable({
  providedIn: 'root',
})
export class TiposSolicitudService implements OnInit {
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
  obtenerTipoSolicitud(conexion: any): Observable<TipoSolicitudDTO[]> {
    if (this.apiMaster == '') {
      this.apiMaster = this.cookieService.get('apiMaster');
    }
    return this.http.post<TipoSolicitudDTO[]>(
      this.apiMaster + '/api/tipoSolicitud',
      conexion
    );
  }

  addTipoSolicitud(valores: any): Observable<any> {
    return this.http.post<any>(
      this.apiMaster + '/api/tipoSolicitudAlta',
      valores
    );
  }

  loadTipoSolicitud(valores: any): Observable<any> {
    return this.http.post<any>(
      this.apiMaster + '/api/tipoSolicitudBuscar',
      valores
    );
  }

  updateTipoSolicitud(valores: any, id: number): Observable<any> {
    return this.http.put<any>(
      this.apiMaster + '/api/tipoPausaActualizar/' + id,
      valores
    );
  }
}
