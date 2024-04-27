import { createReducer, on } from '@ngrx/store';
import { allRoles, allRolesSuccess, errorRoles } from '../actions';
import { RolesDTO } from '../modulesDTO/roles.dto';

export interface RolesState {
  rol: RolesDTO | null;
  roles: RolesDTO[];
  loading: boolean;
  loaded: boolean;
  error?: any;
}

export const initialRolesState: RolesState = {
  rol: null,
  roles: [],
  loading: false,
  loaded: false,
  error: undefined,
};

export const rolesReducer = createReducer(
  initialRolesState,
  on(allRoles, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    roles: [],
    error: undefined,
  })),

  on(allRolesSuccess, (state, { roles }) => ({
    ...state,
    loaded: true,
    loading: false,
    roles: [...roles],
    error: undefined,
  })),
  on(errorRoles, (state, { payload }) => ({
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
  }))
  /*
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
  */
);
