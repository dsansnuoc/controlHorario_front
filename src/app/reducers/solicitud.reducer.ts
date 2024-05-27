import { createReducer, on } from '@ngrx/store';
import {
  altaSolicitud,
  altaSolicitudSuccess,
  errorSolicitud,
  listSolicitud,
  listSolicitudSuccess,
  updateSolicitud,
  updateSolicitudSuccess,
} from '../actions';
import { SolicitudDTO } from '../modulesDTO/solicitud.dto';

export interface SolicitudState {
  solicitud: SolicitudDTO | null;
  solicitudes: SolicitudDTO[];
  loading: boolean;
  loaded: boolean;
  error?: any;
}

export const initialSolicitudState: SolicitudState = {
  solicitud: null,
  solicitudes: [],
  loading: false,
  loaded: false,
  error: undefined,
};

export const solicitudReducer = createReducer(
  initialSolicitudState,
  on(altaSolicitud, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    solicitud: null,
    solicitudes: [],
    error: undefined,
  })),

  on(altaSolicitudSuccess, (state, { resultado }) => {
    const idError = resultado.id_error;

    let error = {
      id_error: resultado.id_error,
      descripcion: resultado.message,
      etiqueta: resultado.etiqueta,
    };

    return {
      ...state,
      loading: false,
      loaded: true,
      error: idError == '200' ? undefined : error,
    };
  }),

  on(listSolicitud, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    solicitud: null,
    solicitudes: [],
    error: undefined,
  })),

  on(listSolicitudSuccess, (state, { resultado }) => ({
    ...state,
    loading: false,
    loaded: true,
    solicitud: null,
    solicitudes: [...resultado],
    error: undefined,
  })),

  on(errorSolicitud, (state, { payload }) => {
    const idError = payload.id_error;

    let error = {
      id_error: payload.id_error,
      descripcion: payload.message,
      etiqueta: payload.etiqueta,
    };

    return {
      ...state,
      loading: false,
      loaded: true,
      error: idError == '200' ? undefined : error,
    };
  }),

  on(updateSolicitud, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    solicitud: null,
    solicitudes: [],
    error: undefined,
  })),

  on(updateSolicitudSuccess, (state, { resultado }) => {
    const idError = resultado.id_error;

    let error = {
      id_error: resultado.id_error,
      descripcion: resultado.message,
      etiqueta: resultado.etiqueta,
    };

    return {
      ...state,
      loading: false,
      loaded: true,
      error: idError == '200' ? undefined : error,
    };
  })
);
