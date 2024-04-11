import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { PrimeNGConfig } from 'primeng/api';
import { ServiciosLecturaConfiguracionService } from './services/json/ServiciosLecturaConfiguracion';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', '../../scss/custom.scss'],
})
export class AppComponent {
  title = 'controlHorario';

  constructor(
    public translate: TranslateService,
    private cookieService: CookieService,
    private primengConfig: PrimeNGConfig,
    private servicioLecturaConfig: ServiciosLecturaConfiguracionService
  ) {
    translate.addLangs(['es']);
    translate.setDefaultLang('es');
    translate.use('es');

    translate
      .get('primeng')
      .subscribe((res) => this.primengConfig.setTranslation(res));

    const fechaExpiracion = new Date();
    fechaExpiracion.setTime(fechaExpiracion.getTime() + 10 * 60 * 60 * 1000);

    let apiMaster = this.cookieService.check('apiMaster');
    if (apiMaster) {
      this.cookieService.delete('apiMaster', '/');
      apiMaster = !apiMaster;
    }

    if (!apiMaster) {
      setTimeout(() => {
        console.log(this.servicioLecturaConfig.camposConfig);
        this.cookieService.set(
          'apiMaster',
          this.servicioLecturaConfig.camposConfig.apiMaster,
          fechaExpiracion,
          '/'
        );
      }, 500);
    }
  }
}
