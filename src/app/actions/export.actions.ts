// src/app/store/actions/file.actions.ts
import { createAction, props } from '@ngrx/store';

export const downloadFile = createAction(
  '[File] Download File',
  props<{ conexion: any }>()
);

export const downloadFileSuccess = createAction(
  '[File] Download File Success',
  props<{ data: Blob }>()
);

export const downloadFileFailure = createAction(
  '[File] Download File Failure',
  props<{ payload: any }>()
);

export const downloadFilePdf = createAction(
  '[File] Download File PDF',
  props<{ conexion: any }>()
);

export const downloadFileCsv = createAction(
  '[File] Download File CSV',
  props<{ conexion: any }>()
);
