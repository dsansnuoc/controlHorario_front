import { createAction, props } from '@ngrx/store';
import { TipoPausasDTO } from '../modulesDTO/tipoPausas.dto';

export const allTipoPausa = createAction(
  '[TIPO PAUSA] All Tipo Pausas',
  props<{ conexion: any }>()
);

export const allTipoPausaSuccess = createAction(
  '[TIPO PAUSA] All Tipo Pausas Success',
  props<{ tipoPausas: TipoPausasDTO[] }>()
);

export const erroTipoPausa = createAction(
  '[TIPO PAUSA] Error Success',
  props<{ payload: any }>()
);

export const addTipoPausa = createAction(
  '[TIPO PAUSA] Add',
  props<{ tipoPausa: any }>()
);

export const addTipoPausaSuccess = createAction(
  '[TIPO PAUSA] Add Success',
  props<{ resultado: any }>()
);

export const loadTipoPausa = createAction(
  '[TIPO PAUSA] Load',
  props<{ tipoPausa: any }>()
);

export const loadTipoPausaSuccess = createAction(
  '[TIPO PAUSA] Load Success',
  props<{ resultado: any }>()
);

export const updateTipoPausa = createAction(
  '[TIPO PAUSA] Update',
  props<{ tipoPausa: any; id: number }>()
);

export const updateTipoPausaSuccess = createAction(
  '[TIPO PAUSA] Update Success',
  props<{ resultado: any }>()
);
