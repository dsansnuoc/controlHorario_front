import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import {
  altaFichajeUsuario,
  altaFichajeUsuarioSuccess,
  errorFichaje,
  getUltimoFichajeUsuario,
  getUltimoFichajeUsuarioSuccess,
} from '../actions';
import { FichajeService } from '../services/api/fichaje';

@Injectable()
export class FichajeEffects {
  constructor(
    private actions$: Actions,
    private fichajeService: FichajeService
  ) {}

  getUltimoFichajeUsuariod$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUltimoFichajeUsuario),
      mergeMap((datos) =>
        this.fichajeService.ultimaEntrada(datos.conexion).pipe(
          map((resultado) =>
            getUltimoFichajeUsuarioSuccess({ fichaje: resultado })
          ),
          catchError((err) => of(errorFichaje({ payload: err })))
        )
      )
    )
  );

  addFichajeUsuariod$ = createEffect(() =>
    this.actions$.pipe(
      ofType(altaFichajeUsuario),
      mergeMap((datos) =>
        this.fichajeService.grabarEntrada(datos.conexion).pipe(
          map((resultado) =>
            altaFichajeUsuarioSuccess({ resultado: resultado })
          ),
          catchError((err) => of(errorFichaje({ payload: err })))
        )
      )
    )
  );
}
