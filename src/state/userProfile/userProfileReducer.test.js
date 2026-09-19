/**
 * Should reutrn innitialState when given by unmnown action
 * Should return profile correctly when given by GET_USER_PROFILE action type
 * Should unset user profile correctly when given by REMOVE_PROFILE action type
 */

import { describe, expect, it } from 'vitest';
import userProfileReducer from './userProfileReducer';
import { getUserProfileActionCreator, unsetProfile } from './Action';

describe('UserProfileReducer', () => {
  it('Should reutrn innitialState when given by unmnown action', () => {
    const initialState = null;
    const action = {
      type: 'UNKNOWN'
    };

    const nextState = userProfileReducer(initialState, action);

    expect(nextState).toBeNull();
  });
  it('Should return profile correctly when given by GET_USER_PROFILE action type', () => {
    const initialState = null;
    const profile = {
      name: 'test',
      avatar: 'test'
    };

    const nextState = userProfileReducer(initialState, getUserProfileActionCreator(profile));

    expect(nextState).toEqual(profile);
  });

  it('Should unset user profile correctly when given by REMOVE_PROFILE action type', () => {
    const profile = {
      name: 'test',
      avatar: 'test'
    };

    const nextState = userProfileReducer(profile, unsetProfile());

    expect(nextState).toBeNull();
  });
});