import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { allRoles, allRolesSuccess, errorRoles } from '../actions';
import { RolesService } from '../services/api/roles';

@Injectable()
export class RolesEffects {
  constructor(private actions$: Actions, private rolesServices: RolesService) {}

  getAllRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(allRoles),
      mergeMap(() =>
        this.rolesServices.obtenerRoles().pipe(
          map((resultado) => allRolesSuccess({ roles: resultado })),
          catchError((err) => of(errorRoles({ payload: err })))
        )
      )
    )
  );
  /*
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
  */
}
