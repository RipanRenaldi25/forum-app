import { describe, expect, it } from 'vitest';
import leaderBoardReducer from './leaderboardReducer';
import { putAllLeaderBoardActionCreator } from './action';
import ActionType from './ActionType';

/**
 * Should return initialState when dispatching unknown action
 */
describe('LeaderBoard Reducer', () => {

  it('Should return initialState when dispatching unknown action', () => {
    const users = [{
      id: 'user1',
      name: 'test'
    }];


    const nextState = leaderBoardReducer([], putAllLeaderBoardActionCreator(users));

    expect(nextState).toEqual(users);
  });

  it(`Should return leaderboard when given ${ActionType.fetchAllLeaderBoard} action creator`, () => {
    const fakeLeaderBoards = [{
      id: 'user1',
      name: 'user1'
    },
    {
      id: 'user2',
      name: 'user2'

    },
    {
      id: 'user3',
      name: 'user3'
    }
    ];

    const nextState = leaderBoardReducer(fakeLeaderBoards, ActionType.fetchAllLeaderBoard);

    expect(nextState).toEqual(fakeLeaderBoards);
  });
});
