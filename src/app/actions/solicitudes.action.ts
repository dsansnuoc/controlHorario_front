import { createAction, props } from '@ngrx/store';

export const altaSolicitud = createAction(
  '[SOLICITUD] Alta solicitud',
  props<{ solicitud: any }>()
);

export const altaSolicitudSuccess = createAction(
  '[SOLICITUD] Alta solicitud Success',
  props<{ resultado: any }>()
);

export const errorSolicitud = createAction(
  '[SOLICITUD] Error',
  props<{ payload: any }>()
);

export const listSolicitud = createAction(
  '[LIST SOLICITUD] Listado solicitud',
  props<{ solicitud: any }>()
);

export const listSolicitudSuccess = createAction(
  '[LIST SOLICITUD] Listado solicitud Success',
  props<{ resultado: any }>()
);

export const updateSolicitud = createAction(
  '[SOLICITUD] Update solicitud',
  props<{ solicitud: any; id: number }>()
);

export const updateSolicitudSuccess = createAction(
  '[SOLICITUD] Update solicitud Success',
  props<{ resultado: any }>()
);
