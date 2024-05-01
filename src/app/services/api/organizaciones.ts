import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { GlobalFunctions } from '../../globals/global-functions';
import { OrganizacionesDTO } from '../../modulesDTO/organizaciones.dto';
import { ServiciosLecturaConfiguracionService } from '../json/ServiciosLecturaConfiguracion';

@Injectable({
  providedIn: 'root',
})
export class OrganizacionesService implements OnInit {
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

  obtenerOrganizaciones(): Observable<OrganizacionesDTO[]> {
    if (this.apiMaster == '') {
      this.apiMaster = this.cookieService.get('apiMaster');
    }
    return this.http.get<OrganizacionesDTO[]>(
      this.apiMaster + '/api/organizaciones'
    );
  }
  addOrganizacion(organizacion: OrganizacionesDTO): Observable<any> {
    return this.http.post<any>(
      this.apiMaster + '/api/organizacionAlta',
      organizacion
    );
  }

  loadOrganizacion(organizacion: any): Observable<any> {
    return this.http.post<any>(
      this.apiMaster + '/api/organizacionBuscar',
      organizacion
    );
  }

  updateOrganizacion(
    organizacion: OrganizacionesDTO,
    id: number
  ): Observable<any> {
    return this.http.put<any>(
      this.apiMaster + '/api/organizacionActualizar/' + id,
      organizacion
    );
  }

  changeStatusOrganizacion(organizacion: any): Observable<any> {
    return this.http.post<any>(
      this.apiMaster + '/api/organizacionCambiarEstado/',
      organizacion
    );
  }
}
