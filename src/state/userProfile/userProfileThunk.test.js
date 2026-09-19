/**
 * Should call alert when fetching is failed
 * Should dispatch correctly when fetching is success
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as API from '../../utils/api';
import { asyncGetUserProfile, getUserProfileActionCreator } from './Action';

describe('UserProfileThunk Action',  () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('Should call alert when fetching is failed', async () => {
    const fakeResponse = {
      response: {
        data: {
          message: 'Failed to fetch'
        }
      }
    };
    window.alert = vi.fn();
    vi.spyOn(API, 'getOwnProfile').mockRejectedValue(fakeResponse);

    await asyncGetUserProfile()({});

    expect(window.alert).toHaveBeenCalledOnce();
    expect(window.alert).toHaveBeenCalledWith(fakeResponse.response.data.message);
  });

  it('Should dispatch correctly when fetching is success',  async () => {
    const fakeResponse = {
      data: {
        id: 'user1',
        name: 'test',
        avatar: 'test'
      }
    };
    vi.spyOn(API, 'getOwnProfile').mockResolvedValue(fakeResponse);
    const dispatch = vi.fn();

    await asyncGetUserProfile()(dispatch);

    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith(getUserProfileActionCreator(fakeResponse.data));
  });
});