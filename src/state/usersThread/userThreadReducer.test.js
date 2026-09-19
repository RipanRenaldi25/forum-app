/**
 * Should return initial state when given unknown action
 * Should return newState with users when given by FETCH_ALL_USERS action type
 * Should return user detail when given by FETCH_DETAIL_USER_THREAD action type
 * Should add comment to the user detail when given by ADD_COMMENT action type
 */

import { describe, expect, it } from 'vitest';
import usersThreadReducer from './usersThreadReducer';
import { addCommentToThreadActionCreator, fetchAllUsers, fetchDetailUserThread } from './Action';

describe('User Thread Reducer', () => {
  it('Should return initial state when given unknown action', () => {
    const initialState = {
      users: {},
      userDetail: {}
    };
    const action = {
      type: 'UNKNOWN'
    };

    const nextState = usersThreadReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('Should return newState with users when given by FETCH_ALL_USERS action type', () => {
    const initialState = {
      users: {},
      detailUser: {}
    };
    const users = [{
      id: 1,
      name: 'test',
      avatar: 'test'
    }];

    const nextState = usersThreadReducer(initialState, fetchAllUsers(users));

    expect(nextState).toEqual({
      ...initialState,
      users
    });
  });

  it('Should return user detail when given by FETCH_DETAIL_USER_THREAD action type', () => {
    const initialState = {
      users: null,
      userDetail: null
    };
    const fakeUserDetail = {
      id: 'user1',
      name: 'test',
      avatar: 'test'
    };

    const nextState = usersThreadReducer(initialState, fetchDetailUserThread(fakeUserDetail));

    expect(nextState).toEqual({
      ...initialState,
      userDetail: fakeUserDetail
    });
  });

  it('Should add comment to the user detail when given by ADD_COMMENT action type', () => {
    const initialState = {
      users: null,
      userDetail: {
        id: 'user-1',
        name: 'test',
        avatar: 'test',
        comments: []
      }
    };

    const fakeComment = {
      id: 'comment-1',
      content: 'Contoh Comment',
      createdAt: new Date().toISOString(),
      owner: initialState.userDetail.name,
      upVotesBy: [],
      downVotesBy: [],
    };

    const nextState = usersThreadReducer(initialState, addCommentToThreadActionCreator({ ...fakeComment }));

    expect(nextState).toEqual({
      ...initialState,
      userDetail: {
        ...initialState.userDetail,
        comments: [...initialState.userDetail.comments, {
          ...fakeComment,
          comment: fakeComment.content
        }]
      }
    });
  });
});