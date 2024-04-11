import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { loginEntrada, loginEntradaSuccess, loginError } from '../actions';
import { ServiciosLoginService } from '../services/api/login';

@Injectable()
export class LoginEffects {
  constructor(
    private actions$: Actions,
    private loginServices: ServiciosLoginService
  ) {}

  loginUsr$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginEntrada),
      mergeMap((action) =>
        this.loginServices.realizarLogin(action.credenciales).pipe(
          map((resultado) =>
            loginEntradaSuccess({
              resultado: resultado,
            })
          ),
          catchError((err) => of(loginError({ payload: err })))
        )
      )
    )
  );
}
