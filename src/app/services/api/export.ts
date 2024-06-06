import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { GlobalFunctions } from '../../globals/global-functions';
import { ServiciosLecturaConfiguracionService } from '../json/ServiciosLecturaConfiguracion';

@Injectable({
  providedIn: 'root',
})
export class ExportService implements OnInit {
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

  exportarExcel(conexion: any): Observable<Blob> {
    if (this.apiMaster == '') {
      this.apiMaster = this.cookieService.get('apiMaster');
    }
    return this.http.post(this.apiMaster + '/api/exportFichajes', conexion, {
      responseType: 'blob',
    });
  }

  exportarPdf(conexion: any): Observable<Blob> {
    if (this.apiMaster == '') {
      this.apiMaster = this.cookieService.get('apiMaster');
    }
    return this.http.post(this.apiMaster + '/api/exportFichajesPdf', conexion, {
      responseType: 'blob',
    });
  }

  exportarCsv(conexion: any): Observable<Blob> {
    if (this.apiMaster == '') {
      this.apiMaster = this.cookieService.get('apiMaster');
    }
    return this.http.post(this.apiMaster + '/api/exportFichajesCsv', conexion, {
      responseType: 'blob',
    });
  }
}
