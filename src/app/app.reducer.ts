import * as fromUI from './shared/ui.reducer';
import * as FromAuth from './auth/auth.reducer';
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

export interface State {
  ui: fromUI.State;
  auth: FromAuth.State;
}

export const reducers: ActionReducerMap<State> = {
  ui: fromUI.uiReducer,
  auth: FromAuth.authReducer,
};

// UI State functions
export const getUIState = createFeatureSelector<fromUI.State>('ui');
export const getIsLoading = createSelector(
  getUIState,
  fromUI.getIsLoading
);

// Auth State functions
export const getAuthState = createFeatureSelector<FromAuth.State>('auth');
export const getIsAuth = createSelector(
  getAuthState,
  FromAuth.getIsAuth
);
export const getViewer = createSelector(
  getAuthState,
  FromAuth.getViewer
);
