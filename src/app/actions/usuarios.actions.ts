import { createAction, props } from '@ngrx/store';
import { UsuariosDTO } from '../modulesDTO/usuaios.dto';
import { UsuarioEnvioDTO } from '../modulesDTO/usuarioEnvio.dto';

export const allUsuarios = createAction('[ORGANIZACIONES] Get All');

export const allUsuariosSuccess = createAction(
  '[USUARIOS] Get All Success',
  props<{ usuarios: UsuariosDTO[] }>()
);

export const errorUsuarios = createAction(
  '[USUARIOS] Error Success',
  props<{ payload: any }>()
);

export const addUsuario = createAction(
  '[USUARIOS] Add',
  props<{ usuario: UsuarioEnvioDTO }>()
);

export const addUsuarioSuccess = createAction(
  '[USUARIOS] Add Success',
  props<{ resultado: any }>()
);

export const loadUsuario = createAction(
  '[USUARIOS] Load',
  props<{ usuario: any }>()
);

export const loadUsuarioSuccess = createAction(
  '[USUARIOS] Load Success',
  props<{ resultado: any }>()
);

export const updateUsuario = createAction(
  '[USUARIOS] Update',
  props<{ usuario: UsuarioEnvioDTO; id: number }>()
);

export const updateUsuarioSuccess = createAction(
  '[USUARIOS] Update Success',
  props<{ resultado: any }>()
);

export const updateStatusUsuario = createAction(
  '[USUARIOS] Update Status',
  props<{ usuario: any }>()
);

export const updateStatusUsuarioSuccess = createAction(
  '[USUARIOS] Update Status Success',
  props<{ resultado: any }>()
);
