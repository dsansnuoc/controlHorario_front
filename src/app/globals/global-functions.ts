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

      console.log(apiMaster);

      if (apiMaster) {
        cookieService.delete('apiMaster', '/');
        apiMaster = !apiMaster;
      }

      console.log(servicioLecturaConfig.camposConfig.apiMaster);

      if (!apiMaster) {
        setTimeout(() => {
          cookieService.set(
            'apiMaster',
            servicioLecturaConfig.camposConfig.apiMaster,
            fechaExpiracion,
            '/'
          );
        }, 300);
      }
    }, 500);
  }
}
