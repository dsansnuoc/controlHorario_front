import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import {
  downloadFile,
  downloadFileCsv,
  downloadFileFailure,
  downloadFilePdf,
  downloadFileSuccess,
} from '../actions';
import { ExportService } from '../services/api/export';

@Injectable()
export class ExportEffects {
  constructor(
    private actions$: Actions,
    private exportService: ExportService
  ) {}

  downloadFileExcel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(downloadFile),
      mergeMap((datos) =>
        this.exportService.exportarExcel(datos.conexion).pipe(
          map((resultado) => downloadFileSuccess({ data: resultado })),
          catchError((err) => of(downloadFileFailure({ payload: err })))
        )
      )
    )
  );

  downloadFileExcelPdf$ = createEffect(() =>
    this.actions$.pipe(
      ofType(downloadFilePdf),
      mergeMap((datos) =>
        this.exportService.exportarPdf(datos.conexion).pipe(
          map((resultado) => downloadFileSuccess({ data: resultado })),
          catchError((err) => of(downloadFileFailure({ payload: err })))
        )
      )
    )
  );

  downloadFileExcelCsv$ = createEffect(() =>
    this.actions$.pipe(
      ofType(downloadFileCsv),
      mergeMap((datos) =>
        this.exportService.exportarCsv(datos.conexion).pipe(
          map((resultado) => downloadFileSuccess({ data: resultado })),
          catchError((err) => of(downloadFileFailure({ payload: err })))
        )
      )
    )
  );
}
