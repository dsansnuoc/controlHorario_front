import { createAction, props } from '@ngrx/store';
import { RolesDTO } from '../modulesDTO/roles.dto';

export const allRoles = createAction('[ROLES] Get All');

export const allRolesSuccess = createAction(
  '[ROLES] Get All Success',
  props<{ roles: RolesDTO[] }>()
);

export const errorRoles = createAction(
  '[ROLES] Error Success',
  props<{ payload: any }>()
);
