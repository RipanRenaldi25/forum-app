/**
 * Should set user correctly
 * Should unset user correctly
 * Should return initial state when unknown action
 */

import { describe, expect, it } from 'vitest';
import userReducer from './userReducer';
import { setAuthUser, unSetAuthUser } from './Action';

describe('Users Reducer', () => {
  it('Should set user correctly when given correct payload', () => {
    const fakeUser = {
      id: 1,
      name: 'test',
      email: 'test',
    };

    const initialState = null;

    const nextState = userReducer(initialState, setAuthUser(fakeUser));

    expect(nextState).toEqual(fakeUser);
  });

  it('Should unset user correctly', () => {
    const initialState = null;

    const nextState = userReducer(initialState, unSetAuthUser());

    expect(nextState).toBeNull();
  });

  it('Should return initialState when given unknown action', () => {
    const initialState = {
      id: 1,
      name: 'test',
      email: 'test'
    };

    const unknownAction = {
      type: 'UNKNOWN'
    };

    const nextState = userReducer(initialState, unknownAction);

    expect(nextState).toEqual(initialState);
  });
});