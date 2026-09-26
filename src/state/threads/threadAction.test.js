/**
 * asyncGetThread
 *  - Should called allert with error message when getThread is failed
 *  - Should dispatch correctly when fetching thread is success
 *
 * asyncCreateThread
 *  - Should called allert with error message when addThread is failed
 *  - Should dispatch correctly when adding new thread is success
 *
 * asyncUpVoteThread
 * - Should dispatch correctly when upvoting thread is success
 * - Should dispatch correctly when upvoting thread is failed
 */

import { describe, expect, it, vi } from 'vitest';
import * as api from '../../utils/api';
import { asyncCreateThread, asyncDownVoteThread, asyncGetThread, asyncNeutralVoteThread, asyncUpVoteThread, createThreadActionCreator, downVoteThreadActionCreator, filterThreadActionCreator, getThreadsActionCreator, neutralVoteThreadActionCreator, upVoteThreadActionCreator } from './Action';

describe('Thread Action Thunk', () => {
  describe('asyncGetThread', () => {
    it('Should called allert with error message when getThread is failed', async () => {
      window.alert = vi.fn();
      const fakeErrorResponse = {
        response: {
          data: {
            message: 'Failed'
          }
        }
      };

      vi.spyOn(api, 'getAllThreads').mockRejectedValue(fakeErrorResponse);

      await asyncGetThread()({});

      expect(window.alert).toHaveBeenCalledOnce();
      expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.response.data.message);
    });

    it('Should dispatch correctly when fetching thread is success', async () => {
      const dispatch = vi.fn();
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
      const fakeResponse = {
        data: {
          threads: initialThread
        }
      };

      vi.spyOn(api, 'getAllThreads').mockResolvedValue(fakeResponse);

      await asyncGetThread()(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenCalledWith(getThreadsActionCreator(fakeResponse.data));
      expect(dispatch).toHaveBeenCalledWith(filterThreadActionCreator());
    });
  });

  describe('asyncCreateThread', () => {
    it('Should called allert with error message when addThread is failed', async () => {
      const fakeErrorResponse = {
        response: {
          data: {
            message: 'Fetch failed'
          }
        }
      };
      const fakePayload = {
        title: 'test',
        body: 'test',
        category: 'test'
      };
      window.alert = vi.fn();
      vi.spyOn(api, 'createThread').mockImplementation(() => Promise.reject(fakeErrorResponse));


      await asyncCreateThread(fakePayload)({});

      expect(window.alert).toHaveBeenCalledOnce();
      expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.response.data.message);
    });

    it('Should dispatch correctly when adding new thread is success', async () => {
      const dispatch = vi.fn();
      const fakePayload = {
        title: 'test',
        body: 'test',
        category: 'test'
      };
      const fakeResponse = {
        data: {
          thread: fakePayload
        }
      };
      vi.spyOn(api, 'createThread').mockResolvedValue(fakeResponse);


      await asyncCreateThread(fakePayload)(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenCalledWith(createThreadActionCreator(fakePayload));
      expect(dispatch).toHaveBeenCalledWith(filterThreadActionCreator());

    });
  });

  describe('asyncUpVoteThread', () => {
    it('Should dispatch correctly when upvoting thread is success', async () => {
      const dispatch = vi.fn();
      const fakeResponse = {
        data: {
          id: 1,
          userId: 1,
          threadId: 1,
          voteType: 1
        }
      };

      vi.spyOn(api, 'upVoteThread').mockResolvedValue(fakeResponse);

      await asyncUpVoteThread(fakeResponse.data.threadId, fakeResponse.data.userId)(dispatch, () => ({
        threads: {
          threads: [
            {
              id: 1,
              title: 'Hello',
              body: 'This is body test',
              category: 'react',
              upVotesBy: [],
              downVotesBy: []
            }
          ]
        }
      }));

      expect(dispatch).toHaveBeenCalledOnce();
      expect(dispatch).toHaveBeenCalledWith(upVoteThreadActionCreator(fakeResponse.data.threadId, fakeResponse.data.userId));
    });

    it('Should dispatch correctly when upvoting thread is failed', async () => {
      const dispatch = vi.fn();
      const fakeResponse = {
        data: {
          id: 1,
          userId: 'user-1',
          threadId: 1,
          voteType: 1
        }
      };
      const fakeErrorResponse = {
        response: {
          status: 401,
          data: {
            message: 'You must be logged in to upvote a thread.'
          }
        }
      };

      window.alert = vi.fn();
      vi.spyOn(api, 'upVoteThread').mockRejectedValue(fakeErrorResponse);

      await asyncUpVoteThread(fakeResponse.data.threadId, fakeResponse.data.userId)(dispatch, () => ({
        threads: {
          threads: [
            {
              id: 1,
              title: 'Hello',
              body: 'This is body test',
              category: 'react',
              upVotesBy: [],
              downVotesBy: ['user-1']
            }
          ]
        }
      }));

      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenCalledWith(upVoteThreadActionCreator(fakeResponse.data.threadId, fakeResponse.data.userId));
      expect(dispatch).toHaveBeenCalledWith(downVoteThreadActionCreator(fakeResponse.data.threadId, fakeResponse.data.userId));
      expect(window.alert).toHaveBeenCalledOnce();
      expect(window.alert).toHaveBeenCalledWith('You must be logged in to upvote a thread.');
    });
  });

  describe('asyncNeutralVoteThread', () => {
    it('Should dispatch correctly when neutral voting thread is success', async () => {
      const dispatch = vi.fn();
      const fakeResponse = {
        data: {
          id: 1,
          userId: 1,
          threadId: 1,
          voteType: 0
        }
      };

      vi.spyOn(api, 'neutralVoteThread').mockResolvedValue(fakeResponse);

      await asyncNeutralVoteThread(fakeResponse.data.threadId, fakeResponse.data.userId)(dispatch);

      expect(dispatch).toHaveBeenCalledOnce();
      expect(dispatch).toHaveBeenCalledWith(neutralVoteThreadActionCreator(fakeResponse.data.threadId, fakeResponse.data.userId));
    });
  });

  describe('asyncDownVoteThread', () => {
    it('Should dispatch correctly when downvoting thread is success', async () => {
      const dispatch = vi.fn();
      const fakeResponse = {
        data: {
          id: 1,
          userId: 1,
          threadId: 1,
          voteType: -1
        }
      };
      vi.spyOn(api, 'downVoteThread').mockResolvedValue(fakeResponse);

      await asyncDownVoteThread(fakeResponse.data.threadId, fakeResponse.data.userId)(dispatch, () => ({
        threads: {
          threads: [
            {
              id: 1,
              title: 'Hello',
              body: 'This is body test',
              category: 'react',
              upVotesBy: [],
              downVotesBy: []
            }
          ]
        }
      }));

      expect(dispatch).toHaveBeenCalledOnce();
      expect(dispatch).toHaveBeenCalledWith(downVoteThreadActionCreator(fakeResponse.data.threadId, fakeResponse.data.userId));
    });

    it('Should dispatch correctly when downvoting thread is failed', async () => {
      const dispatch = vi.fn();
      const fakeResponse = {
        data: {
          id: 1,
          userId: 'user-1',
          threadId: 1,
          voteType: -1
        }
      };
      const fakeErrorResponse = {
        response: {
          status: 401,
          data: {
            message: 'You must be logged in to downvote a thread.'
          }
        }
      };

      window.alert = vi.fn();
      vi.spyOn(api, 'downVoteThread').mockRejectedValue(fakeErrorResponse);

      await asyncDownVoteThread(fakeResponse.data.threadId, fakeResponse.data.userId)(dispatch, () => ({
        threads: {
          threads: [
            {
              id: 1,
              title: 'Hello',
              body: 'This is body test',
              category: 'react',
              upVotesBy: ['user-1'],
              downVotesBy: []
            }
          ]
        }
      }));

      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenCalledWith(downVoteThreadActionCreator(fakeResponse.data.threadId, fakeResponse.data.userId));
      expect(dispatch).toHaveBeenCalledWith(upVoteThreadActionCreator(fakeResponse.data.threadId, fakeResponse.data.userId));
      expect(window.alert).toHaveBeenCalledOnce();
      expect(window.alert).toHaveBeenCalledWith('You must be logged in to downvote a thread.');
    });
  });
});