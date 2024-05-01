import { createReducer, on } from '@ngrx/store';
import {
  addTipoSolicitud,
  addTipoSolicitudSuccess,
  allTipoSolicitud,
  allTipoSolicitudSuccess,
  erroTipoSolicitud,
  loadTipoSolicitud,
  loadTipoSolicitudSuccess,
  updateTipoSolicitud,
  updateTipoSolicitudSuccess,
} from '../actions';
import { TipoSolicitudDTO } from '../modulesDTO/tipoSolicitud.dto';

export interface TipoSolicitudState {
  tipoSolicitud: TipoSolicitudDTO | null;
  tipoSolicitudes: TipoSolicitudDTO[];
  loading: boolean;
  loaded: boolean;
  error?: any;
}

export const initialTipoSolicitudState: TipoSolicitudState = {
  tipoSolicitud: null,
  tipoSolicitudes: [],
  loading: false,
  loaded: false,
  error: undefined,
};

export const tipoSolicitudReducer = createReducer(
  initialTipoSolicitudState,
  on(allTipoSolicitud, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    tipoSolicitudes: [],
    error: undefined,
  })),

  on(allTipoSolicitudSuccess, (state, { tipoSoliciud }) => ({
    ...state,
    loaded: true,
    loading: false,
    tipoSolicitudes: [...tipoSoliciud],
    error: undefined,
  })),
  on(erroTipoSolicitud, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: {
      url: payload.url,
      statusCode: payload.status,
      message: payload.message,
      messageDetail: payload.messageDetail,
      timestamp: payload.timestamp,
      path: payload.path,
    },
  })),

  on(updateTipoSolicitud, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    tipoSolicitudes: [],
    error: undefined,
  })),

  on(updateTipoSolicitudSuccess, (state, { resultado }) => {
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

  on(addTipoSolicitud, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    tipoSolicitudes: [],
    error: undefined,
  })),
  on(addTipoSolicitudSuccess, (state, { resultado }) => {
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

  on(loadTipoSolicitud, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    tipoSolicitud: null,
    error: undefined,
  })),

  on(loadTipoSolicitudSuccess, (state, { resultado }) => ({
    ...state,
    loading: false,
    loaded: true,
    tipoSolicitud: resultado,
    error: undefined,
  }))
);
