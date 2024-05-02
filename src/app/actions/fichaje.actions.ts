import { createAction, props } from '@ngrx/store';

export const getUltimoFichajeUsuario = createAction(
  '[FICHAJE] Último fichaje',
  props<{ conexion: any }>()
);

export const getUltimoFichajeUsuarioSuccess = createAction(
  '[FICHAJE] Último fichaje Success',
  props<{ fichaje: any }>()
);

export const errorFichaje = createAction(
  '[FICHAJE] Error',
  props<{ payload: any }>()
);

export const altaFichajeUsuario = createAction(
  '[FICHAJE] Alta fichaje UID',
  props<{ conexion: any }>()
);

export const altaFichajeUsuarioSuccess = createAction(
  '[FICHAJE] Alta fichaje UID Success',
  props<{ resultado: any }>()
);
