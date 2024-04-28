import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import {
  addTipoPausa,
  addTipoPausaSuccess,
  allTipoPausa,
  allTipoPausaSuccess,
  erroTipoPausa,
  loadTipoPausa,
  loadTipoPausaSuccess,
  updateTipoPausa,
  updateTipoPausaSuccess,
} from '../actions';
import { TiposPausaService } from '../services/api/tipoPausa';

@Injectable()
export class TipoPausaEffects {
  constructor(
    private actions$: Actions,
    private tipoPausaService: TiposPausaService
  ) {}

  getAllLoadTipoPausa$ = createEffect(() =>
    this.actions$.pipe(
      ofType(allTipoPausa),
      mergeMap((datos) =>
        this.tipoPausaService.obtenerTipoPausa(datos.conexion).pipe(
          map((resultado) => allTipoPausaSuccess({ tipoPausas: resultado })),
          catchError((err) => of(erroTipoPausa({ payload: err })))
        )
      )
    )
  );

  getAddTipoPausa$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTipoPausa),
      mergeMap((datos) =>
        this.tipoPausaService.addTipoPausa(datos.tipoPausa).pipe(
          map((resultado) => addTipoPausaSuccess({ resultado: resultado })),
          catchError((err) => of(erroTipoPausa({ payload: err })))
        )
      )
    )
  );

  getLoadTipoPausa$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTipoPausa),
      mergeMap((datos) =>
        this.tipoPausaService.loadTipoPausa(datos.tipoPausa).pipe(
          map((resultado) => loadTipoPausaSuccess({ resultado: resultado })),
          catchError((err) => of(erroTipoPausa({ payload: err })))
        )
      )
    )
  );

  updatetLoadTipoPausa$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTipoPausa),
      mergeMap((datos) =>
        this.tipoPausaService.updateTipoPausa(datos.tipoPausa, datos.id).pipe(
          map((resultado) => updateTipoPausaSuccess({ resultado: resultado })),
          catchError((err) => of(erroTipoPausa({ payload: err })))
        )
      )
    )
  );
}
