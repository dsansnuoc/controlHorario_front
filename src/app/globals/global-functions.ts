import { CookieService } from 'ngx-cookie-service';
import { ServiciosLecturaConfiguracionService } from '../services/json/ServiciosLecturaConfiguracion';

export class GlobalFunctions {
  public static isLogin(): boolean {
    let token = sessionStorage.getItem('access_token');
    if (token === null) {
      return false;
    } else {
      return true;
    }
  }

  public static apis(
    cookieService: CookieService,
    servicioLecturaConfig: ServiciosLecturaConfiguracionService
  ): void {
    setTimeout(() => {
      const fechaExpiracion = new Date();
      fechaExpiracion.setTime(fechaExpiracion.getTime() + 10 * 60 * 60 * 1000);

      let apiMaster = cookieService.check('apiMaster');

      if (apiMaster) {
        cookieService.delete('apiMaster', '/');
        apiMaster = !apiMaster;
      }

      if (!apiMaster) {
        setTimeout(() => {
          cookieService.set(
            'apiMaster',
            servicioLecturaConfig.camposConfig.apiMaster,
            fechaExpiracion,
            '/'
          );
        }, 400);
      }
    }, 400);
  }

  public static formatDate(date: Date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
}
