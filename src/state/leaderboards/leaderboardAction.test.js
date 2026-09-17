/**
 * Should call alert when fetchingLeaderboard is failed
 * Should dispatch correctly when leaderboard is exists
 * Should return initialState when dispatching unknown action
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { asyncFetchAllLeaderBoard, putAllLeaderBoardActionCreator } from './action';
import leaderBoardReducer from './leaderboardReducer';
import * as api from '../../utils/api';

describe('Leaderboard Action', () => {

  it('Should return initialState when dispatching unknown action', () => {
    const users = [{
      id: 'user1',
      name: 'test'
    }];


    const nextState = leaderBoardReducer([], putAllLeaderBoardActionCreator(users));

    expect(nextState).toEqual(users);
  });

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

  it('Should return initialState when dispatching unknown action', () => {
    const unknownAction = {
      type: 'UNKNOWN'
    };
    const initialState = [];

    const nextState = leaderBoardReducer(initialState, unknownAction);

    expect(nextState).toEqual(initialState);
  });

});