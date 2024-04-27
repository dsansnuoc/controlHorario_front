import { createReducer, on } from '@ngrx/store';
import {
  addUsuario,
  addUsuarioSuccess,
  allUsuarios,
  allUsuariosOrganizacion,
  allUsuariosOrganizacionSuccess,
  allUsuariosSuccess,
  errorUsuarios,
  loadUsuario,
  loadUsuarioSuccess,
  updateStatusUsuario,
  updateStatusUsuarioSuccess,
  updateUsuario,
  updateUsuarioSuccess,
} from '../actions';
import { UsuariosDTO } from '../modulesDTO/usuaios.dto';

export interface UsuariosState {
  usuario: UsuariosDTO | null;
  usuarios: UsuariosDTO[];
  loading: boolean;
  loaded: boolean;
  error?: any;
}

export const initialUsuariosState: UsuariosState = {
  usuario: null,
  usuarios: [],
  loading: false,
  loaded: false,
  error: undefined,
};

export const usuariosReducer = createReducer(
  initialUsuariosState,
  on(allUsuarios, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    organizaciones: [],
    error: undefined,
  })),

  on(allUsuariosSuccess, (state, { usuarios }) => ({
    ...state,
    loaded: true,
    loading: false,
    usuarios: [...usuarios],
    error: undefined,
  })),
  on(errorUsuarios, (state, { payload }) => ({
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

  on(addUsuario, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    usuarios: [],
    error: undefined,
  })),

  on(addUsuarioSuccess, (state, { resultado }) => {
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

  on(loadUsuario, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    usuario: null,
    error: undefined,
  })),

  on(loadUsuarioSuccess, (state, { resultado }) => {
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
      usuario: idError == '200' ? resultado.message : null,
      error: idError == '200' ? undefined : error,
    };
  }),

  on(updateUsuario, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: undefined,
  })),

  on(updateUsuarioSuccess, (state, { resultado }) => {
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

  on(updateStatusUsuario, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: undefined,
  })),

  on(updateStatusUsuarioSuccess, (state, { resultado }) => {
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

  on(allUsuariosOrganizacion, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    usuarios: [],
    error: undefined,
  })),

  on(allUsuariosOrganizacionSuccess, (state, { usuarios }) => {
    const idError = usuarios.id_error;

    let error = {
      id_error: usuarios.id_error,
      descripcion: usuarios.message,
      etiqueta: usuarios.etiqueta,
    };

    return {
      ...state,
      loading: false,
      loaded: true,
      usuarios: idError == '200' ? usuarios.message : null,
      error: idError == '200' ? undefined : error,
    };
  })
);
