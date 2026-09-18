/**
 * Should call alert when fetchingLeaderboard is failed
 * Should dispatch correctly when leaderboard is exists
 */

import { describe, expect, it, vi } from 'vitest';
import * as api from '../../utils/api';
import { asyncFetchAllLeaderBoard, putAllLeaderBoardActionCreator } from './action';

describe('Leaderboard Action', () => {
  it('Should call alert when fetchingLeaderboard is failed', async () => {
    window.alert = vi.fn();
    const fakeErrorResponse = {
      response: {
        data: {
          message: 'Failed'
        }
      }
    };
    vi.spyOn(api, 'getAllLeaderBoard').mockRejectedValue(fakeErrorResponse);

    await asyncFetchAllLeaderBoard()({});

    expect(window.alert).toHaveBeenCalledOnce();
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.response.data.message);
  });

  it('Should call alert when fetchingLeaderboard is Success', async () => {
    const fakeLeaderBoards = [{
      id: 'user1',
      name: 'test1',
    }];
    const fakeSuccessResponse = {
      data: {
        leaderboards: fakeLeaderBoards
      }
    };
    const dispatch = vi.fn();
    vi.spyOn(api, 'getAllLeaderBoard').mockResolvedValue(fakeSuccessResponse);

    await asyncFetchAllLeaderBoard()(dispatch);

    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith(putAllLeaderBoardActionCreator(fakeLeaderBoards));
  });

});