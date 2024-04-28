import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { TipoPausasDTO } from '../../modulesDTO/tipoPausas.dto';

@Injectable({
  providedIn: 'root',
})
export class TiposPausaService {
  // Variable global en la que se almacenará la URL del servidor.
  apiMaster: string | any = this.cookieService.get('apiMaster');

  constructor(private http: HttpClient, private cookieService: CookieService) {
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
