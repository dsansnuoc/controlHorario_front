import { createReducer, on } from '@ngrx/store';
import { loginEntrada, loginEntradaSuccess, loginError } from '../actions';
import { AuthDTO } from '../modulesDTO/auth.dto';

export interface LoginState {
  login: AuthDTO;
  resultado: any;
  loading: boolean;
  loaded: boolean;
  error?: any;
}

export const initialLoginState: LoginState = {
  login: new AuthDTO('', ''),
  resultado: null,
  loading: false,
  loaded: false,
  error: undefined,
};

export const loginReducer = createReducer(
  initialLoginState,
  on(loginEntrada, (state, { credenciales }) => ({
    ...state,
    loading: true,
    loaded: false,
    resultado: undefined,
    error: undefined,
  })),
  on(loginEntradaSuccess, (state, { resultado }) => ({
    ...state,
    loading: false,
    loaded: true,
    resultado: resultado,
    error: undefined,
  })),
  on(loginError, (state, { payload }) => ({
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
);
