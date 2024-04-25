import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers';

export interface AppState {
  loginApp: reducers.LoginState;
  organizacionesApp: reducers.OrganizacioneState;
}

export const appReducers: ActionReducerMap<AppState> = {
  loginApp: reducers.loginReducer,
  organizacionesApp: reducers.organizacionesReducer,
};
