import { createAction, props } from '@ngrx/store';
import { TipoSolicitudDTO } from '../modulesDTO/tipoSolicitud.dto';

export const allTipoSolicitud = createAction(
  '[TIPO SOLICITUD] All Tipo Solicitud',
  props<{ conexion: any }>()
);

export const allTipoSolicitudSuccess = createAction(
  '[TIPO SOLICITUD] All Tipo Solicitud Success',
  props<{ tipoSoliciud: TipoSolicitudDTO[] }>()
);

export const erroTipoSolicitud = createAction(
  '[TIPO SOLICITUD] Error Success',
  props<{ payload: any }>()
);

export const addTipoSolicitud = createAction(
  '[TIPO SOLICITUD] Add',
  props<{ tipoSoliciud: any }>()
);

export const addTipoSolicitudSuccess = createAction(
  '[TIPO SOLICITUD] Add Success',
  props<{ resultado: any }>()
);

export const loadTipoSolicitud = createAction(
  '[TIPO SOLICITUD] Load',
  props<{ tipoSoliciud: any }>()
);

export const loadTipoSolicitudSuccess = createAction(
  '[TIPO SOLICITUD] Load Success',
  props<{ resultado: any }>()
);

export const updateTipoSolicitud = createAction(
  '[TIPO SOLICITUD] Update',
  props<{ tipoSoliciud: any; id: number }>()
);

export const updateTipoSolicitudSuccess = createAction(
  '[TIPO SOLICITUD] Update Success',
  props<{ resultado: any }>()
);
