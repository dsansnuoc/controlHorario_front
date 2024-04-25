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

export * from './login.reducer';
export * from './organizaciones.reducer';
