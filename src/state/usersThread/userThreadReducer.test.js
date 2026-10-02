/**
 * Should return initial state when given unknown action
 * Should return newState with users when given by FETCH_ALL_USERS action type
 * Should return user detail when given by FETCH_DETAIL_USER_THREAD action type
 * Should add comment to the user detail when given by ADD_COMMENT action type
 */

import { describe, expect, it } from 'vitest';
import usersThreadReducer from './usersThreadReducer';
import { addCommentToThreadActionCreator, downVoteCommentActionCreator, downVoteDetailThreadActionCreator, fetchAllUsers, fetchDetailUserThread, neutralVoteCommentActionCreator, neutralVoteDetailThreadActionCreator, upVoteCommentActionCreator, upVoteDetailThreadActionCreator } from './Action';

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

  it('Should upvote detail thread to the user detail when given by UPVOTE_DETAIL_THREAD action type', () => {
    const initialState = {
      users: null,
      userDetail: {
        id: 'thread-1',
        title: 'Contoh Thread',
        body: 'Contoh Body',
        category: 'Contoh Category',
        createdAt: new Date().toISOString(),
        ownerId: 'user-1',
        upVotesBy: [],
        downVotesBy: [],
      }
    };

    const nextState = usersThreadReducer(initialState, {
      type: 'UP_VOTE_DETAIL_THREAD',
      payload: {
        userId: 'user-1',
        threadId: 'thread-1'
      }
    });

    expect(nextState).toEqual({
      ...initialState,
      userDetail: {
        ...initialState.userDetail,
        upVotesBy: [...initialState.userDetail.upVotesBy, 'user-1']
      }
    });
  });

  it('Should remove downvote detail thread when given by upvote detail thread action creator', () => {
    const initialState = {
      users: null,
      userDetail: {
        id: 'thread-1',
        title: 'Contoh Thread',
        body: 'Contoh Body',
        category: 'Contoh Category',
        createdAt: new Date().toISOString(),
        ownerId: 'user-1',
        upVotesBy: [],
        downVotesBy: ['user-1'],
      }
    };
    const nextState = usersThreadReducer(initialState, upVoteDetailThreadActionCreator('thread-1', 'user-1'));

    const isAlreadyDownVoted = initialState.userDetail.downVotesBy.includes('user-1');

    expect(nextState).toEqual({
      ...initialState,
      userDetail: {
        ...initialState.userDetail,
        upVotesBy: [...initialState.userDetail.upVotesBy, 'user-1'],
        downVotesBy: isAlreadyDownVoted ? initialState.userDetail.downVotesBy.filter((userId) => userId !== 'user-1') : initialState.userDetail.downVotesBy
      }
    });
  });

  it('Should remove upvote detail thread when given by downvote detail thread action creator', () => {
    const initialState = {
      users: null,
      userDetail: {
        id: 'thread-1',
        title: 'Contoh Thread',
        body: 'Contoh Body',
        category: 'Contoh Category',
        createdAt: new Date().toISOString(),
        ownerId: 'user-1',
        upVotesBy: ['user-1'],
        downVotesBy: [],
      }
    };
    const nextState = usersThreadReducer(initialState, downVoteDetailThreadActionCreator('thread-1', 'user-1'));

    const isAlreadyUpVoted = initialState.userDetail.upVotesBy.includes('user-1');

    expect(nextState).toEqual({
      ...initialState,
      userDetail: {
        ...initialState.userDetail,
        downVotesBy: [...initialState.userDetail.downVotesBy, 'user-1'],
        upVotesBy: isAlreadyUpVoted ? initialState.userDetail.upVotesBy.filter((userId) => userId !== 'user-1') : initialState.userDetail.upVotesBy
      }
    });
  });

  it('Should downvote detail thread to the user detail when given by DOWNVOTE_DETAIL_THREAD action type', () => {
    const initialState = {
      users: null,
      userDetail: {
        id: 'thread-1',
        title: 'Contoh Thread',
        body: 'Contoh Body',
        category: 'Contoh Category',
        createdAt: new Date().toISOString(),
        ownerId: 'user-1',
        upVotesBy: [],
        downVotesBy: [],
      }
    };

    const nextState = usersThreadReducer(initialState, downVoteDetailThreadActionCreator('thread-1', 'user-1'));

    expect(nextState).toEqual({
      ...initialState,
      userDetail: {
        ...initialState.userDetail,
        downVotesBy: [...initialState.userDetail.downVotesBy, 'user-1']
      }
    });
  });

  it('Should neutral vote detail thread when upvoting to the user detail when given by NEUTRAL_VOTE_DETAIL_THREAD action type', () => {
    const initialState = {
      users: null,
      userDetail: {
        id: 'thread-1',
        title: 'Contoh Thread',
        body: 'Contoh Body',
        category: 'Contoh Category',
        createdAt: new Date().toISOString(),
        ownerId: 'user-1',
        upVotesBy: ['user-1'],
        downVotesBy: [],
      }
    };

    const nextState = usersThreadReducer(initialState, neutralVoteDetailThreadActionCreator('thread-1', 'user-1'));

    expect(nextState).toEqual({
      ...initialState,
      userDetail: {
        ...initialState.userDetail,
        upVotesBy: initialState.userDetail.upVotesBy.filter((userId) => userId !== 'user-1')
      }
    });
  });

  it('Should neutral vote detail thread when downvoting to the user detail when given by NEUTRAL_VOTE_DETAIL_THREAD action type', () => {
    const initialState = {
      users: null,
      userDetail: {
        id: 'thread-1',
        title: 'Contoh Thread',
        body: 'Contoh Body',
        category: 'Contoh Category',
        createdAt: new Date().toISOString(),
        ownerId: 'user-1',
        upVotesBy: [],
        downVotesBy: ['user-1'],
      }
    };

    const nextState = usersThreadReducer(initialState, neutralVoteDetailThreadActionCreator('thread-1', 'user-1'));

    expect(nextState).toEqual({
      ...initialState,
      userDetail: {
        ...initialState.userDetail,
        downVotesBy: initialState.userDetail.downVotesBy.filter((userId) => userId !== 'user-1')
      }
    });
  });

  it('Should upvote comment to the user detail when given by UPVOTE_COMMENT action type', () => {
    const initialState = {
      users: null,
      userDetail: {
        id: 'user-1',
        name: 'test',
        avatar: 'test',
        comments: [
          {
            id: 'comment-1',
            content: 'Contoh Comment',
            createdAt: new Date().toISOString(),
            owner: 'user-1',
            upVotesBy: [],
            downVotesBy: [],
          }
        ]
      }
    };

    const nextState = usersThreadReducer(initialState, upVoteCommentActionCreator('comment-1', 'user-1'));

    expect(nextState).toEqual({
      ...initialState,
      userDetail: {
        ...initialState.userDetail,
        comments: initialState.userDetail.comments.map((comment) => comment.id === 'comment-1' ? {
          ...comment,
          upVotesBy: [...comment.upVotesBy, 'user-1']
        } : comment)
      }
    });
  });

  it('Should downvote comment to the user detail when given by DOWNVOTE_COMMENT action type', () => {
    const initialState = {
      users: null,
      userDetail: {
        id: 'user-1',
        name: 'test',
        avatar: 'test',
        comments: [
          {
            id: 'comment-1',
            content: 'Contoh Comment',
            createdAt: new Date().toISOString(),
            owner: 'user-1',
            upVotesBy: [],
            downVotesBy: [],
          }
        ]
      }
    };

    const nextState = usersThreadReducer(initialState, downVoteCommentActionCreator('comment-1', 'user-1'));

    expect(nextState).toEqual({
      ...initialState,
      userDetail: {
        ...initialState.userDetail,
        comments: initialState.userDetail.comments.map((comment) => comment.id === 'comment-1' ? {
          ...comment,
          downVotesBy: [...comment.downVotesBy, 'user-1']
        } : comment)
      }
    });
  });

  it('Should neutral up vote comment when given by NEUTRAL_VOTE_COMMENT action type', () => {
    const initialState = {
      users: null,
      userDetail: {
        id: 'user-1',
        name: 'test',
        avatar: 'test',
        comments: [
          {
            id: 'comment-1',
            content: 'Contoh Comment',
            createdAt: new Date().toISOString(),
            owner: 'user-1',
            upVotesBy: ['user-1'],
            downVotesBy: [],
          }
        ]
      }
    };

    const nextState = usersThreadReducer(initialState,  neutralVoteCommentActionCreator('comment-1', 'user-1'));

    expect(nextState).toEqual({
      ...initialState,
      userDetail: {
        ...initialState.userDetail,
        comments: initialState.userDetail.comments.map((comment) => comment.id === 'comment-1' ? {
          ...comment,
          upVotesBy: comment.upVotesBy.filter((userId) => userId !== 'user-1')
        } : comment)
      }
    });
  });

  it('Should neutral downvote comment when given by NEUTRAL_VOTE_COMMENT action type', () => {
    const initialState = {
      users: null,
      userDetail: {
        id: 'user-1',
        name: 'test',
        avatar: 'test',
        comments: [
          {
            id: 'comment-1',
            content: 'Contoh Comment',
            createdAt: new Date().toISOString(),
            owner: 'user-1',
            upVotesBy: [],
            downVotesBy: ['user-1'],
          }
        ]
      }
    };

    const nextState = usersThreadReducer(initialState, neutralVoteCommentActionCreator('comment-1', 'user-1'));

    expect(nextState).toEqual({
      ...initialState,
      userDetail: {
        ...initialState.userDetail,
        comments: initialState.userDetail.comments.map((comment) => comment.id === 'comment-1' ? {
          ...comment,
          downVotesBy: comment.downVotesBy.filter((userId) => userId !== 'user-1')
        } : comment)
      }
    });
  });
});