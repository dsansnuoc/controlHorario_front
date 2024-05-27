/*
import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { loginReducer } from './login.reducer';

export interface State {}

export const reducers: ActionReducerMap<State> = {
  login: loginReducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
*/

export * from './fichaje.reducer';
export * from './login.reducer';
export * from './organizaciones.reducer';
export * from './roles.reducer';
export * from './solicitud.reducer';
export * from './tipoPausa.reducer';
export * from './tipoSolicitud.reducer';
export * from './usuarios.reducer';
