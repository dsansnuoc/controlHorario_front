// import { NgRedux } from '@angular-redux/store';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, inject } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';

import { loginEntrada } from '../actions';
import { MaterialModules } from '../modules/material.modules';
import { OtherModule } from '../modules/other.modules';
import { PrimeNgModules } from '../modules/primeng.modules';
import { ServiciosLoginService } from '../services/api/login';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [CommonModule, OtherModule, MaterialModules, PrimeNgModules],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.scss',
  providers: [MessageService],
})
export class InicioSesionComponent implements OnDestroy {
  //loginUser: AuthDTO;
  userId: UntypedFormControl;
  password: UntypedFormControl;

  inicioSesion: UntypedFormGroup;

  suscripcion: Subscription = new Subscription();

  mensajeErrorInicioSesion: string = '';

  private store = inject(Store);
  aux$?: Observable<any>;

  constructor(
    private translate: TranslateService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private messageService: MessageService,

    private serviceLogin: ServiciosLoginService
  ) {
    // this.loginUser = new AuthDTO('', '');
    this.userId = new UntypedFormControl(null, [Validators.required]);
    this.password = new UntypedFormControl(null, [Validators.required]);

    this.inicioSesion = this.fb.group({
      userId: this.userId,
      password: this.password,
    });

    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('user');
  }
  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  iniciarSesion() {
    //this.loginUser = new AuthDTO(this.userId.value, this.password.value);

    let user = {
      email: this.userId.value,
      password: this.password.value,
    };

    //  console.log(this.store.select('loginEntradaReducer'));
    /*
    this.serviceLogin.realizarLogin(user).subscribe((resultado) => {
      if (resultado.token == undefined) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: resultado.message, //this.translate.instant('error.login'),
        });
      } else {
        this.router.navigate(['/menu']);
      }
    });
*/
    this.store.dispatch(loginEntrada({ credenciales: user }));

    /*
    this.suscripcion = this.store
      .pipe(select('loginApp'))
      .subscribe((resultado) => {
        console.log(resultado);
        // Resto de tu lógica aquí
      });
  */
    /*
    setTimeout(() => {
      this.suscripcion = this.store
        .select((state) => state)
        .subscribe((resultado) => {
          console.log(resultado.loginApp);
        });
    }, 500);
*/
    setTimeout(() => {
      this.suscripcion = this.store
        .select('loginApp')
        .subscribe((resultado) => {
          if (resultado.loading == false) {
            if (resultado.error == undefined) {
              sessionStorage.setItem('access_token', resultado.resultado.token);
              sessionStorage.setItem(
                'user',
                JSON.stringify(resultado.resultado.user)
              );
              this.suscripcion.unsubscribe();
              this.router.navigate(['/menu']);
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: resultado.error.message, //this.translate.instant('error.login'),
              });
              this.suscripcion.unsubscribe();
              // this.messageService.clear();
            }
          }

          //   console.log(resultado);
        });
    }, 1000);

    //    this.suscripcion = this.store
    //      .select((state) => state)
    //      .subscribe((resultado) => {
    //        console.log(resultado.loginApp);
    /*
        if (resultado.error == undefined && resultado.loading == false) {
          console.log(resultado);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: this.translate.instant('error.login'),
          });
        }
     */
    //      });
  }
}
