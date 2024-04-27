import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { OrganizacionesDTO } from '../../modulesDTO/organizaciones.dto';

@Injectable({
  providedIn: 'root',
})
export class OrganizacionesService {
  // Variable global en la que se almacenará la URL del servidor.
  apiMaster: string | any = this.cookieService.get('apiMaster');

  constructor(private http: HttpClient, private cookieService: CookieService) {
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
