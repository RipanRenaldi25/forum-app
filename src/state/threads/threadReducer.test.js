/**
 * Should return new state when given by action FETCH_THREAD
 * Should add new thread when adding a new thread
 * Should return unique category of all threads
 * Should add upvote to thread when given by action UPVOTE_THREAD
 */

import { describe, expect, it } from 'vitest';
import threadReducer from './threadReducer';
import ActionType from './ActionType';
import { createThreadActionCreator, downVoteThreadActionCreator, filterThreadActionCreator, getThreadsActionCreator, neutralVoteThreadActionCreator, upVoteThreadActionCreator } from './Action';


describe('Thread Reducer', () => {
  it('Should return new state when given by action FETCH_THREAD', () => {
    const initialThread = [{
      id: 1,
      title: 'Hello',
      body: 'This is body test'
    }];

    const initialState = {
      threads: [],
      category: []
    };

    const fetchThreadAction = {
      type: ActionType.fetchThread,
      payload: {
        threads: {
          threads: initialThread
        }
      }
    };

    const nextState = threadReducer(initialState, fetchThreadAction);

    expect(nextState).toEqual({
      ...initialState,
      threads: initialThread
    });
  });

  it('Should add new thread when adding a new thread', () => {
    const initialThread = [{
      id: 1,
      title: 'Hello',
      body: 'This is body test'
    }];

    const initialState = {
      threads: initialThread,
      category: []
    };

    const newThread = {
      id: 2,
      title: 'Hello',
      body: 'This is body test'
    };

    const nextState = threadReducer(initialState, createThreadActionCreator(newThread));

    expect(nextState).toEqual({
      ...initialState,
      threads: [...initialState.threads, newThread]
    });
  });

  it('Should return unique category of all threads', () => {
    const initialThread = [
      {
        id: 1,
        title: 'Hello',
        body: 'This is body test',
        category: 'react'
      },
      {
        id: 2,
        title: 'Hello2',
        body: 'This is body test2',
        category: 'react2'
      }
    ];

    const initialState = {
      threads: initialThread,
      category: []
    };

    const nextState = threadReducer(initialState, filterThreadActionCreator());

    expect(nextState).toEqual({
      ...initialState,
      category: initialState.threads.map((thread) => thread.category)
    });


  });

  it('Should add upvote to thread when given by action UPVOTE_THREAD', () => {
    const initialThread = {
      threads: [
        {
          id: 1,
          title: 'Hello',
          body: 'This is body test',
          upVotesBy: [],
          downVotesBy: [],
        },
        {
          id: 2,
          title: 'Hello2',
          body: 'This is body test2',
          upVotesBy: [],
          downVotesBy: [],
        }
      ],
    };

    const initialState = {
      threads: initialThread.threads,
      category: []
    };

    const nextState = threadReducer(initialState, upVoteThreadActionCreator(1, 'user-1'));

    expect(nextState).toEqual({
      ...initialState,
      threads: initialState.threads.map((thread) => ({
        ...thread,
        upVotesBy: thread.id === 1 ? [...thread.upVotesBy, 'user-1'] : thread.upVotesBy
      }))
    });
  });

  it('Should neutral vote to thread when given by action NEUTRAL_VOTE_THREAD', () => {
    const initialThread = [{
      id: 1,
      title: 'Hello',
      body: 'This is body test',
      downVotesBy: [],
      upVotesBy: ['user-1']
    },
    {
      id: 2,
      title: 'Hello2',
      body: 'This is body test2',
      downVotesBy: ['user-1'],
      upVotesBy: []
    }
    ];
    const initialState = {
      threads: initialThread,
      category: []
    };

    const nextState = threadReducer(initialState, neutralVoteThreadActionCreator(1, 'user-1'));

    expect(nextState).toEqual({
      ...initialState,
      threads: initialState.threads.map((thread) => {
        let isUpVoted = false;
        let isDownVoted = false;
        if (thread.id === 1) {
          isUpVoted = thread.upVotesBy.includes('user-1');
          isDownVoted = thread.downVotesBy.includes('user-1');
        }
        return ({
          ...thread,
          upVotesBy: isUpVoted ? thread.upVotesBy.filter((userId) => userId !== 'user-1') : thread.upVotesBy,
          downVotesBy: isDownVoted ? thread.downVotesBy.filter((userId) => userId !== 'user-1') : thread.downVotesBy
        });
      })
    });
  });

  it('Should add downvote to thread when given by action DOWNVOTE_THREAD', () => {
    const initialThread = [{
      id: 1,
      title: 'Hello',
      body: 'This is body test',
      downVotesBy: [],
      upVotesBy: []
    },
    {
      id: 2,
      title: 'Hello2',
      body: 'This is body test2',
      downVotesBy: [],
      upVotesBy: []
    }
    ];
    const initialState = {
      threads: initialThread,
      category: []
    };

    const nextState = threadReducer(initialState, {
      type: ActionType.downVoteThread,
      payload: {
        threadId: 1,
        userId: 'user-1'
      }
    });

    expect(nextState).toEqual({
      ...initialState,
      threads: initialState.threads.map((thread) => ({
        ...thread,
        downVotesBy: thread.id === 1 ? [...thread.downVotesBy, 'user-1'] : thread.downVotesBy
      }))
    });
  });

  it('Should toggle vote when user has already voted', () => {
    const initialThread = [
      {
        id: 1,
        title: 'Hello',
        body: 'This is body test',
        upVotesBy: ['user-1'],
        downVotesBy: []
      },
      {
        id: 2,
        title: 'Hello2',
        body: 'This is body test2',
        upVotesBy: [],
        downVotesBy: ['user-1']
      }
    ];

    const initialState = {
      threads: initialThread,
      category: []
    };

    const nextState = threadReducer(initialState, upVoteThreadActionCreator(2, 'user-1'));
    const nextState2 = threadReducer(initialState, downVoteThreadActionCreator(1, 'user-1'));

    expect(nextState2).toEqual({
      ...initialState,
      threads: initialState.threads.map((thread) => {
        if (thread.id === 1) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.filter((userId) => userId !== 'user-1'),
            downVotesBy: [...thread.downVotesBy, 'user-1']
          };
        }
        return thread;
      })
    });

    expect(nextState).toEqual({
      ...initialState,
      threads: initialState.threads.map((thread) => {
        if (thread.id === 2) {
          return {
            ...thread,
            upVotesBy: [...thread.upVotesBy, 'user-1'],
            downVotesBy: thread.downVotesBy.filter((userId) => userId !== 'user-1')
          };
        }
        return thread;
      })
    });
  });
});