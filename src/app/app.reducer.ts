import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers';

export interface AppState {
  loginApp: reducers.LoginState;
  organizacionesApp: reducers.OrganizacioneState;
  usuariosApp: reducers.UsuariosState;
  rolesApp: reducers.RolesState;
}

export const appReducers: ActionReducerMap<AppState> = {
  loginApp: reducers.loginReducer,
  organizacionesApp: reducers.organizacionesReducer,
  usuariosApp: reducers.usuariosReducer,
  rolesApp: reducers.rolesReducer,
};
