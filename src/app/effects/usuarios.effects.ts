import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import {
  addUsuario,
  addUsuarioSuccess,
  allUsuarios,
  allUsuariosOrganizacion,
  allUsuariosOrganizacionSuccess,
  allUsuariosSuccess,
  errorUsuarios,
  loadUsuario,
  loadUsuarioSuccess,
  updateStatusOrganizacionSuccess,
  updateStatusUsuario,
  updateUsuario,
  updateUsuarioSuccess,
} from '../actions';
import { UsuariosService } from '../services/api/usuarios';

@Injectable()
export class UsuariosEffects {
  constructor(
    private actions$: Actions,
    private usuariosServices: UsuariosService
  ) {}

  getAllUsuarios$ = createEffect(() =>
    this.actions$.pipe(
      ofType(allUsuarios),
      mergeMap(() =>
        this.usuariosServices.obtenerUsuarios().pipe(
          map((resultado) => allUsuariosSuccess({ usuarios: resultado })),
          catchError((err) => of(errorUsuarios({ payload: err })))
        )
      )
    )
  );

  getAddUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addUsuario),
      mergeMap((datos) =>
        this.usuariosServices.addUsuario(datos.usuario).pipe(
          map((resultado) => addUsuarioSuccess({ resultado: resultado })),
          catchError((err) => of(errorUsuarios({ payload: err })))
        )
      )
    )
  );

  getLoadUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsuario),
      mergeMap((datos) =>
        this.usuariosServices.loadUsuario(datos.usuario).pipe(
          map((resultado) => loadUsuarioSuccess({ resultado: resultado })),
          catchError((err) => of(errorUsuarios({ payload: err })))
        )
      )
    )
  );

  updateAddUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUsuario),
      mergeMap((datos) =>
        this.usuariosServices.updateUsuario(datos.usuario, datos.id).pipe(
          map((resultado) => updateUsuarioSuccess({ resultado: resultado })),
          catchError((err) => of(errorUsuarios({ payload: err })))
        )
      )
    )
  );

  updateAddStatusUsuarios$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateStatusUsuario),
      mergeMap((datos) =>
        this.usuariosServices.changeStatusUsuario(datos.usuario).pipe(
          map((resultado) =>
            updateStatusOrganizacionSuccess({ resultado: resultado })
          ),
          catchError((err) => of(errorUsuarios({ payload: err })))
        )
      )
    )
  );

  getAllUsuariosOrganizacion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(allUsuariosOrganizacion),
      mergeMap((datos) =>
        this.usuariosServices.obtenerUsuariosOrganizacion(datos.usuario).pipe(
          map((resultado) =>
            allUsuariosOrganizacionSuccess({ usuarios: resultado })
          ),
          catchError((err) => of(errorUsuarios({ payload: err })))
        )
      )
    )
  );
}
