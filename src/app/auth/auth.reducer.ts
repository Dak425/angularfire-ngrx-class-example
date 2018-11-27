import {
  AuthActions,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
} from './auth.actions';

export interface State {
  isAuthenticated: boolean;
  viewer: string;
}

const initialState: State = {
  isAuthenticated: false,
  viewer: null,
};

export function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        isAuthenticated: true,
        viewer: action.payload,
      };
    case SET_UNAUTHENTICATED:
      return {
        isAuthenticated: false,
        viewer: null,
      };
    default:
      return state;
  }
}

export const getIsAuth = (state: State) => state.isAuthenticated;
export const getViewer = (state: State) => state.viewer;
