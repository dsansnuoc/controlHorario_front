import { createReducer, on } from '@ngrx/store';
import {
  altaFichajeUsuario,
  altaFichajeUsuarioSuccess,
  errorFichaje,
  getUltimoFichajeUsuario,
  getUltimoFichajeUsuarioSuccess,
} from '../actions';
import { FichajeDTO } from '../modulesDTO/fichaje.dto';

export interface FichajeState {
  fichaje: FichajeDTO | null;
  fichajes: FichajeDTO[];
  loading: boolean;
  loaded: boolean;
  error?: any;
}

export const initialFichajeState: FichajeState = {
  fichaje: null,
  fichajes: [],
  loading: false,
  loaded: false,
  error: undefined,
};

export const fichajeReducer = createReducer(
  initialFichajeState,
  on(getUltimoFichajeUsuario, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    fichaje: null,
    error: undefined,
  })),

  on(getUltimoFichajeUsuarioSuccess, (state, { fichaje }) => ({
    ...state,
    loaded: true,
    loading: false,
    fichaje: fichaje,
    error: undefined,
  })),

  on(errorFichaje, (state, { payload }) => ({
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
  on(altaFichajeUsuario, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    fichajes: [],
    fichaje: null,
    error: undefined,
  })),
  on(altaFichajeUsuarioSuccess, (state, { resultado }) => {
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
