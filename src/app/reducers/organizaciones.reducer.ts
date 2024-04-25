import { createReducer, on } from '@ngrx/store';
import {
  addOrganizacion,
  addOrganizacionSuccess,
  allOrganizaciones,
  allOrganizacionesSuccess,
  errorOrganizaciones,
  loadOrganizacion,
  loadOrganizacionSuccess,
  updateOrganizacion,
  updateOrganizacionSuccess,
} from '../actions';
import { OrganizacionesDTO } from '../modulesDTO/organizaciones.dto';

export interface OrganizacioneState {
  organizacion: OrganizacionesDTO | null;
  organizaciones: OrganizacionesDTO[];
  loading: boolean;
  loaded: boolean;
  error?: any;
}

export const initialOrganizacionesState: OrganizacioneState = {
  organizacion: null,
  organizaciones: [],
  loading: false,
  loaded: false,
  error: undefined,
};

export const organizacionesReducer = createReducer(
  initialOrganizacionesState,
  on(allOrganizaciones, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    organizaciones: [],
    error: undefined,
  })),

  on(allOrganizacionesSuccess, (state, { organizaciones }) => ({
    ...state,
    loaded: true,
    loading: false,
    organizaciones: [...organizaciones],
    error: undefined,
  })),
  on(errorOrganizaciones, (state, { payload }) => ({
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

  on(addOrganizacion, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    organizaciones: [],
    error: undefined,
  })),

  on(addOrganizacionSuccess, (state, { resultado }) => {
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

  on(loadOrganizacion, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    organizacion: null,
    error: undefined,
  })),

  on(loadOrganizacionSuccess, (state, { resultado }) => {
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
      organizacion: idError == '200' ? resultado.message : null,
      error: idError == '200' ? undefined : error,
    };
  }),

  on(updateOrganizacion, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: undefined,
  })),

  on(updateOrganizacionSuccess, (state, { resultado }) => {
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
