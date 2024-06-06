import { createReducer, on } from '@ngrx/store';
import {
  downloadFile,
  downloadFileFailure,
  downloadFileSuccess,
} from '../actions';

export interface ExportState {
  fichero: any;
  loading: boolean;
  loaded: boolean;
  error?: any;
}

export const initialExportState: ExportState = {
  fichero: null,
  loading: false,
  loaded: false,
  error: undefined,
};

export const exportReducer = createReducer(
  initialExportState,
  on(downloadFile, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    fichero: null,
    error: undefined,
  })),

  on(downloadFileSuccess, (state, { data }) => ({
    ...state,
    loaded: true,
    loading: false,
    fichero: data,
    error: undefined,
  })),
  on(downloadFileFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: {
      url: payload.url,
      statusCode: payload.status,
      message: payload.message,
      messageDetail: payload.messageDetail,
      timestamp: payload.timestamp,
      path: payload.path,
    },
  }))
);
