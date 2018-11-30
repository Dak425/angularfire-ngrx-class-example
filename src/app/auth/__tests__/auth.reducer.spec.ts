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
  const fakeAction = new Auth.Test();

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
  it('should return current state on "default" case', () => {
    expect(fromAuth.authReducer(authActionState, fakeAction)).toEqual(
      authActionState
    );
  });
  it('has a function called getIsAuth that returns isAuth from the state', () => {
    expect(fromAuth.getIsAuth(authActionState)).toEqual(
      authActionState.isAuthenticated
    );
  });
  it('has a function called getViewer that returns the viewer property from the state', () => {
    expect(fromAuth.getViewer(authActionState)).toEqual(authActionState.viewer);
  });
});
