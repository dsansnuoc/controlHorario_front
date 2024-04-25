import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import {
  addOrganizacion,
  addOrganizacionSuccess,
  allOrganizaciones,
  allOrganizacionesSuccess,
  errorOrganizaciones,
  loadOrganizacion,
  loadOrganizacionSuccess,
  updateOrganizacion,
  updateOrganizacionSuccess,
} from '../actions';
import { OrganizacionesService } from '../services/api/organizaciones';

@Injectable()
export class OrganizacionesEffects {
  constructor(
    private actions$: Actions,
    private organizacionesServices: OrganizacionesService
  ) {}

  getAllOrganizaciones$ = createEffect(() =>
    this.actions$.pipe(
      ofType(allOrganizaciones),
      mergeMap(() =>
        this.organizacionesServices.obtenerOrganizaciones().pipe(
          map((resultado) =>
            allOrganizacionesSuccess({ organizaciones: resultado })
          ),
          catchError((err) => of(errorOrganizaciones({ payload: err })))
        )
      )
    )
  );

  getAddOrganizacion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addOrganizacion),
      mergeMap((datos) =>
        this.organizacionesServices.addOrganizacion(datos.organizacion).pipe(
          map((resultado) => addOrganizacionSuccess({ resultado: resultado })),
          catchError((err) => of(errorOrganizaciones({ payload: err })))
        )
      )
    )
  );

  getLoadOrganizacion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadOrganizacion),
      mergeMap((datos) =>
        this.organizacionesServices.loadOrganizacion(datos.organizacion).pipe(
          map((resultado) => loadOrganizacionSuccess({ resultado: resultado })),
          catchError((err) => of(errorOrganizaciones({ payload: err })))
        )
      )
    )
  );

  updateAddOrganizacion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateOrganizacion),
      mergeMap((datos) =>
        this.organizacionesServices
          .updateOrganizacion(datos.organizacion, datos.id)
          .pipe(
            map((resultado) =>
              updateOrganizacionSuccess({ resultado: resultado })
            ),
            catchError((err) => of(errorOrganizaciones({ payload: err })))
          )
      )
    )
  );
}
