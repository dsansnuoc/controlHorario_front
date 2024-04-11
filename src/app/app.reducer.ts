import { ActionReducerMap } from '@ngrx/store';
import * as loginReducer from './reducers';

export interface AppState {
  loginApp: loginReducer.LoginState;
}

export const appReducers: ActionReducerMap<AppState> = {
  loginApp: loginReducer.loginReducer,
};
