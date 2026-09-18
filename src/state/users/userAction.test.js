/**
 * Should show alert correctly when register is failed
 * Should register correctly when credential is correct
 * Should dispatch correctly when logout
 * Should dispatch action and set token to localStorage when login is success
 */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as api from '../../utils/api';
import { asyncLoginUser, asyncRegistUser, asyncUnsetAuthUser, setAuthUser, unSetAuthUser } from './Action';
import userReducer from './userReducer';

describe('Users Action', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Should show alert correctly when register is Failed', async () => {
    window.alert = vi.fn();
    const userPayload = {
      name: 'test',
      email: 'test@gmail.com',
      password:'test@gmail.com'
    };

    const errorResponse = {
      response: {
        data: {
          message: 'Failed to registered'
        }
      }
    };

    vi.spyOn(api, 'registerUser').mockRejectedValue(errorResponse);

    await asyncRegistUser(userPayload)({});
    expect(window.alert).toHaveBeenCalledOnce();
    expect(window.alert).toHaveBeenCalledWith(errorResponse.response.data.message);
  });

  it('Should show alert correctly when register is Success', async () => {
    window.alert = vi.fn();
    const userPayload = {
      name: 'test',
      email: 'test@gmail.com',
      password:'test@gmail.com'
    };

    vi.spyOn(api, 'registerUser').mockResolvedValue({
      message: 'User created'
    });

    await asyncRegistUser(userPayload)({});
    expect(window.alert).toHaveBeenCalledOnce();
    expect(window.alert).toHaveBeenCalledWith('User created');
  });

  it('Should dispatch correctly when logout', async () => {
    const dispatch = vi.fn();

    await asyncUnsetAuthUser()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(unSetAuthUser());
  });

  it('Should dispatch action and set token to localStorage when login is success', async () => {
    const dispatch = vi.fn();
    const fakeToken = 'secret-123';
    const fakePayload = {
      email: 'test@gmail.com',
      password: 'test@gmail.com'
    };
    const fakeSuccessResponse = {
      data: {
        token: fakeToken
      }
    };

    vi.spyOn(api, 'loginUser').mockResolvedValue(fakeSuccessResponse);
    const storageStub = vi.spyOn(Storage.prototype, 'setItem');

    await asyncLoginUser(fakePayload)(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(setAuthUser(fakeToken));
    expect(storageStub).toHaveBeenCalledWith('AUTH_TOKEN', fakeToken);
  });

  it('Should show alert when login is failed', async () => {
    window.alert = vi.fn();
    const fakeErrorResponse = {
      response: {
        data: {
          message: 'Username or Password is Wrong'
        }
      }
    };
    const fakeCredential = {
      email: 'test@gmail.com',
      password: 'test@gmail.com'
    };
    vi.spyOn(api, 'loginUser').mockRejectedValue(fakeErrorResponse);

    await asyncLoginUser(fakeCredential)({});

    expect(window.alert).toHaveBeenCalledOnce();
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.response.data.message);

  });
});