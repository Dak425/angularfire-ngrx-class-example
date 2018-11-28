import * as fromAuth from '../auth.reducer';
import * as Auth from '../auth.actions';

describe('AuthReducer', () => {
  const authAction = new Auth.SetAuthenticated('payload');
  const unAuthAction = new Auth.SetUnauthenticated();
  const authActionState: fromAuth.State = {
    isAuthenticated: true,
    viewer: authAction.payload,
  };
  const unAuthActionState: fromAuth.State = {
    isAuthenticated: false,
    viewer: null,
  };

  it('should return correct state on "SetAuthentication" action', () => {
    expect(fromAuth.authReducer(authActionState, authAction)).toEqual(
      authActionState
    );
  });
  it('should return correct state on "SetUnauthenticated" action', () => {
    expect(fromAuth.authReducer(authActionState, unAuthAction)).toEqual(
      unAuthActionState
    );
  });
  it('should return initial state on "default" case', () => {});
});
