import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { GlobalFunctions } from '../../globals/global-functions';
import { RolesDTO } from '../../modulesDTO/roles.dto';
import { ServiciosLecturaConfiguracionService } from '../json/ServiciosLecturaConfiguracion';

@Injectable({
  providedIn: 'root',
})
export class RolesService implements OnInit {
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

  obtenerRoles(): Observable<RolesDTO[]> {
    if (this.apiMaster == '') {
      this.apiMaster = this.cookieService.get('apiMaster');
    }
    return this.http.get<RolesDTO[]>(this.apiMaster + '/api/roles');
  }
  /*
  addUsuario(organizacion: UsuarioEnvioDTO): Observable<any> {
    return this.http.post<any>(
      this.apiMaster + '/api/usuarioAlta',
      organizacion
    );
  }

  loadUsuario(organizacion: any): Observable<any> {
    return this.http.post<any>(
      this.apiMaster + '/api/usuarioBuscar',
      organizacion
    );
  }

  updateUsuario(organizacion: UsuariosDTO, id: number): Observable<any> {
    console.log(id);
    return this.http.put<any>(
      this.apiMaster + '/api/usuarioActualizar/' + id,
      organizacion
    );
  }
  */
}
