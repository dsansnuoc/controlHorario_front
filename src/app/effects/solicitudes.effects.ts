import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import {
  altaSolicitud,
  altaSolicitudSuccess,
  errorSolicitud,
  listSolicitud,
  listSolicitudSuccess,
  updateSolicitud,
  updateSolicitudSuccess,
} from '../actions/solicitudes.action';
import { SolicitudesService } from '../services/api/solicitudes';

@Injectable()
export class SolicitudEffects {
  constructor(
    private actions$: Actions,
    private solicitudesService: SolicitudesService
  ) {}

  addSolicitudUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(altaSolicitud),
      mergeMap((datos) =>
        this.solicitudesService.grabarSolicitud(datos.solicitud).pipe(
          map((resultado) => altaSolicitudSuccess({ resultado: resultado })),
          catchError((err) => of(errorSolicitud({ payload: err })))
        )
      )
    )
  );

  obtenerSolicitudUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(listSolicitud),
      mergeMap((datos) =>
        this.solicitudesService.solicitudesUsuario(datos.solicitud).pipe(
          map((resultado) => listSolicitudSuccess({ resultado: resultado })),
          catchError((err) => of(errorSolicitud({ payload: err })))
        )
      )
    )
  );

  updateSolicitudUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateSolicitud),
      mergeMap((datos) =>
        this.solicitudesService
          .updateSolicitudId(datos.solicitud, datos.id)
          .pipe(
            map((resultado) =>
              updateSolicitudSuccess({ resultado: resultado })
            ),
            catchError((err) => of(errorSolicitud({ payload: err })))
          )
      )
    )
  );
}
