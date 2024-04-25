import { createAction, props } from '@ngrx/store';
import { OrganizacionesDTO } from '../modulesDTO/organizaciones.dto';

export const allOrganizaciones = createAction('[ORGANIZACIONES] Get All');

export const allOrganizacionesSuccess = createAction(
  '[ORGANIZACIONES] Get All Success',
  props<{ organizaciones: OrganizacionesDTO[] }>()
);

export const errorOrganizaciones = createAction(
  '[ORGANIZACIONES] Error Success',
  props<{ payload: any }>()
);

export const addOrganizacion = createAction(
  '[ORGANIZACIONES] Add',
  props<{ organizacion: OrganizacionesDTO }>()
);

export const addOrganizacionSuccess = createAction(
  '[ORGANIZACIONES] Add Success',
  props<{ resultado: any }>()
);

export const loadOrganizacion = createAction(
  '[ORGANIZACIONES] Load',
  props<{ organizacion: any }>()
);

export const loadOrganizacionSuccess = createAction(
  '[ORGANIZACIONES] Load Success',
  props<{ resultado: any }>()
);

export const updateOrganizacion = createAction(
  '[ORGANIZACIONES] Update',
  props<{ organizacion: OrganizacionesDTO; id: number }>()
);

export const updateOrganizacionSuccess = createAction(
  '[ORGANIZACIONES] Update Success',
  props<{ resultado: any }>()
);
