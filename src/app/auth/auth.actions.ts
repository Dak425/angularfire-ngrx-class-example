import { Action } from '@ngrx/store';

export const SET_AUTHENTICATED = '[Auth] Set Authenticated';
export const SET_UNAUTHENTICATED = '[Auth] Set Unauthenticated';
export const TEST = '[Auth] Test';

export class SetAuthenticated implements Action {
  readonly type = SET_AUTHENTICATED;

  constructor(public payload: string) {}
}

export class SetUnauthenticated implements Action {
  readonly type = SET_UNAUTHENTICATED;
}

export class Test implements Action {
  readonly type = TEST;
}

export type AuthActions = SetAuthenticated | SetUnauthenticated | Test;
