import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import {
  addTipoSolicitud,
  addTipoSolicitudSuccess,
  allTipoSolicitud,
  allTipoSolicitudSuccess,
  erroTipoSolicitud,
  loadTipoSolicitud,
  loadTipoSolicitudSuccess,
  updateTipoSolicitud,
  updateTipoSolicitudSuccess,
} from '../actions';
import { TiposSolicitudService } from '../services/api/tipoSolicitud';

@Injectable()
export class TipoSolicitudEffects {
  constructor(
    private actions$: Actions,
    private tipoSolicitudService: TiposSolicitudService
  ) {}

  getAllLoadSolicitudPausa$ = createEffect(() =>
    this.actions$.pipe(
      ofType(allTipoSolicitud),
      mergeMap((datos) =>
        this.tipoSolicitudService.obtenerTipoSolicitud(datos.conexion).pipe(
          map((resultado) =>
            allTipoSolicitudSuccess({ tipoSoliciud: resultado })
          ),
          catchError((err) => of(erroTipoSolicitud({ payload: err })))
        )
      )
    )
  );

  getAddTipSolicutud$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTipoSolicitud),
      mergeMap((datos) =>
        this.tipoSolicitudService.addTipoSolicitud(datos.tipoSoliciud).pipe(
          map((resultado) => addTipoSolicitudSuccess({ resultado: resultado })),
          catchError((err) => of(erroTipoSolicitud({ payload: err })))
        )
      )
    )
  );

  getLoadTipoSolicitud$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTipoSolicitud),
      mergeMap((datos) =>
        this.tipoSolicitudService.loadTipoSolicitud(datos.tipoSoliciud).pipe(
          map((resultado) =>
            loadTipoSolicitudSuccess({ resultado: resultado })
          ),
          catchError((err) => of(erroTipoSolicitud({ payload: err })))
        )
      )
    )
  );

  updatetLoadTipoSolicitud$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTipoSolicitud),
      mergeMap((datos) =>
        this.tipoSolicitudService
          .updateTipoSolicitud(datos.tipoSoliciud, datos.id)
          .pipe(
            map((resultado) =>
              updateTipoSolicitudSuccess({ resultado: resultado })
            ),
            catchError((err) => of(erroTipoSolicitud({ payload: err })))
          )
      )
    )
  );
}
