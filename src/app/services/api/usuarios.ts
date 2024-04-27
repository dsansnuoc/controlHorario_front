import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { UsuariosDTO } from '../../modulesDTO/usuaios.dto';
import { UsuarioEnvioDTO } from '../../modulesDTO/usuarioEnvio.dto';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  // Variable global en la que se almacenará la URL del servidor.
  apiMaster: string | any = this.cookieService.get('apiMaster');

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.apiMaster = this.cookieService.get('apiMaster');
  }

  obtenerUsuarios(): Observable<UsuariosDTO[]> {
    if (this.apiMaster == '') {
      this.apiMaster = this.cookieService.get('apiMaster');
    }
    return this.http.get<UsuariosDTO[]>(this.apiMaster + '/api/usuarios');
  }
  addUsuario(organizacion: UsuarioEnvioDTO): Observable<any> {
    return this.http.post<any>(
      this.apiMaster + '/api/usuarioAlta',
      organizacion
    );
  }

  loadUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(this.apiMaster + '/api/usuarioBuscar', usuario);
  }

  updateUsuario(usuario: UsuarioEnvioDTO, id: number): Observable<any> {
    return this.http.put<any>(
      this.apiMaster + '/api/usuarioActualizar/' + id,
      usuario
    );
  }

  changeStatusUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(
      this.apiMaster + '/api/usuarioCambiarEstado/',
      usuario
    );
  }
}
