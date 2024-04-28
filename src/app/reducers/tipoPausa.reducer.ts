import { createReducer, on } from '@ngrx/store';
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
import { TipoPausasDTO } from '../modulesDTO/tipoPausas.dto';

export interface TipoPausaState {
  tipoPausa: TipoPausasDTO | null;
  tipoPausas: TipoPausasDTO[];
  loading: boolean;
  loaded: boolean;
  error?: any;
}

export const initialTipoPausaState: TipoPausaState = {
  tipoPausa: null,
  tipoPausas: [],
  loading: false,
  loaded: false,
  error: undefined,
};

export const tipoPausasReducer = createReducer(
  initialTipoPausaState,
  on(allTipoPausa, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    tipoPausas: [],
    error: undefined,
  })),

  on(allTipoPausaSuccess, (state, { tipoPausas }) => ({
    ...state,
    loaded: true,
    loading: false,
    tipoPausas: [...tipoPausas],
    error: undefined,
  })),
  on(erroTipoPausa, (state, { payload }) => ({
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

  on(updateTipoPausa, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    tipoPausas: [],
    error: undefined,
  })),

  on(updateTipoPausaSuccess, (state, { resultado }) => {
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

  on(addTipoPausa, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    tipoPausas: [],
    error: undefined,
  })),
  on(addTipoPausaSuccess, (state, { resultado }) => {
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

  on(loadTipoPausa, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    tipoPausa: null,
    error: undefined,
  })),

  on(loadTipoPausaSuccess, (state, { resultado }) => ({
    ...state,
    loading: false,
    loaded: true,
    tipoPausa: resultado,
    error: undefined,
  }))
);
