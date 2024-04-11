import { createAction, props } from '@ngrx/store';
import { AuthDTO } from '../modulesDTO/auth.dto';

export const loginEntrada = createAction(
  '[AUTH] Get Login',
  props<{ credenciales: AuthDTO }>()
);

export const loginEntradaSuccess = createAction(
  '[AUTH] Get Login Success',
  props<{ resultado: any }>()
);

export const loginError = createAction(
  '[AUTH] Get Error Success',
  props<{ payload: any }>()
);
