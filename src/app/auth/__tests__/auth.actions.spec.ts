import * as Auth from '../auth.actions';

describe('AuthActions', () => {
  it('should have constant "SET_AUTHENTICATED"', () => {
    expect(Auth.SET_AUTHENTICATED).toBeTruthy();
  });
  it('should have constant "SET_UNATHENTICATED"', () => {
    expect(Auth.SET_UNAUTHENTICATED).toBeTruthy();
  });
  it('should have class "SetAuthenticated"', () => {
    expect(Auth.SetAuthenticated).toBeTruthy();
  });
  it('should have class "SetUnauthenticated"', () => {
    expect(Auth.SetUnauthenticated).toBeTruthy();
  });
});

describe('SetAuthenticated', () => {
  const payload = 'A string';
  const action = new Auth.SetAuthenticated(payload);

  it('should have type of constant "SET_AUTHENTICATED"', () => {
    expect(action.type).toBe(Auth.SET_AUTHENTICATED);
  });
  it('should have a payload', () => {
    expect(action.payload).toBeTruthy();
  });
});

describe('SetUnauthenticated', () => {
  const action = new Auth.SetUnauthenticated();

  it('should have type of constant "SET_UNAUTHENICATED"', () => {
    expect(action.type).toBe(Auth.SET_UNAUTHENTICATED);
  });
});
