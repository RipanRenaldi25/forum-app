/**
 * asyncFetchAllUsers
 *  - should call alert when fecthing users is failed
 *  - Should dispatch correctly when fetching users is success
 *
 * asyncFetchDetailUserThread
    - Should call alert when fetching user detail by thread is failed
    - Should dispatch detail thread correctly when fetching is success
  * asyncAddCommentToThread
      - Should call alert when fetching is failed
      - Should dispatch add comment action creator when fetching data is success
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as api from '../../utils/api';
import { addCommentToThreadActionCreator, asyncAddCommentToThread, asyncFetchAllUsers, asyncFetchDetailUserThread, asyncUpVoteDetailThread, fetchAllUsers, fetchDetailUserThread, upVoteDetailThreadActionCreator } from './Action';

describe('User Thread Thunk Action', () => {
  describe('Async fetch all users', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('should call alert when fecthing users is failed', async () => {
      window.alert = vi.fn();
      const fakeResponse = {
        response: {
          data: {
            message: 'Fetch Failed'
          }
        }
      };
      vi.spyOn(api, 'getAllUsers').mockRejectedValue(fakeResponse);

      await asyncFetchAllUsers()({});

      expect(window.alert).toHaveBeenCalledOnce();
      expect(window.alert).toHaveBeenCalledWith(fakeResponse.response.data.message);
    });

    it('Should dispatch correctly when fetching users is success', async () => {
      const fakeUsers = [{
        id: 'user-1',
        name: 'user-1',
        avatar: 'user-1',
      }];
      const fakeResponse = {
        data: fakeUsers
      };
      vi.spyOn(api, 'getAllUsers').mockResolvedValue(fakeResponse);

      const dispatch = vi.fn();

      await asyncFetchAllUsers()(dispatch);

      expect(dispatch).toHaveBeenCalledOnce();

      expect(dispatch).toHaveBeenCalledWith(fetchAllUsers(fakeUsers));
    });
  });

  describe('asyncFetchDetailUserThread', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('should call alert when fecthing threadDetail is failed', async () => {
      window.alert = vi.fn();
      const fakeResponse = {
        response: {
          data: {
            message: 'Fetch Failed'
          }
        }
      };

      vi.spyOn(api, 'getUserDetailByThread').mockRejectedValue(fakeResponse);

      await asyncFetchDetailUserThread()({});

      expect(window.alert).toHaveBeenCalledOnce();
      expect(window.alert).toHaveBeenCalledWith(fakeResponse.response.data.message);
    });

    it('Should dispatch detail thread correctly when fetching is success', async () => {
      const fakeDetailThread = {
        id: 'detailThread-1',
        content: 'content-1',
        comments: [],
        upVotesBy: [],
        downVotesBy: [],
      };
      const fakeResponse = {
        data: {
          detailThread: fakeDetailThread
        }
      };
      vi.spyOn(api, 'getUserDetailByThread').mockResolvedValue(fakeResponse);

      const dispatch = vi.fn();

      await asyncFetchDetailUserThread(fakeDetailThread.id)(dispatch);

      expect(dispatch).toHaveBeenCalledOnce();

      expect(dispatch).toHaveBeenCalledWith(fetchDetailUserThread(fakeDetailThread));
    });
  });

  describe('asyncAddCommentToThread', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('Should call alert when fetching is failed', async () => {
      window.alert = vi.fn();
      const fakeResponse = {
        response: {
          data: {
            message: 'Fetch Failed'
          }
        }
      };

      vi.spyOn(api, 'createComment').mockRejectedValue(fakeResponse);

      await asyncAddCommentToThread({})({});

      expect(window.alert).toHaveBeenCalledOnce();
      expect(window.alert).toHaveBeenCalledWith(fakeResponse.response.data.message);
    });

    it('Should dispatch add comment action creator when fetching data is success', async () => {
      const fakeComment = {
        id: 'comment-1',
        content: 'content-1',
        threadId: 'thread-id-id',
        comments: [],
        upVotesBy: [],
        downVotesBy: [],
      };

      const fakeResponse = {
        data: {
          comment: fakeComment
        }
      };
      vi.spyOn(api, 'createComment').mockResolvedValue(fakeResponse);

      const dispatch = vi.fn();

      await asyncAddCommentToThread({
        content: fakeComment.comments,
        threadId: fakeComment.threadId
      })(dispatch);

      expect(dispatch).toHaveBeenCalledOnce();

      expect(dispatch).toHaveBeenCalledWith(addCommentToThreadActionCreator(fakeComment));
    });
  });

  describe('asyncUpVoteDetailThread', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('Should dispatch correctly when upvoting detail thread', async () => {
      const dispatch = vi.fn();
      const getState = vi.fn().mockReturnValue({
        profile: {
          user: {
            id: 'user-1',
            name: 'test',
            avatar: 'test'
          }
        }
      });

      const fakeResponse = {
        data: {
          vote: {
            id: 'vote-1',
            threadId: 'thread-1',
            userId: 'user-1',
            voteType: 1
          }
        }
      };

      vi.spyOn(api, 'upVoteThread').mockResolvedValue(fakeResponse);
      await asyncUpVoteDetailThread(fakeResponse.data.vote.threadId, fakeResponse.data.vote.userId)(dispatch, getState);

      expect(dispatch).toHaveBeenCalledOnce();
      expect(dispatch).toHaveBeenCalledWith(upVoteDetailThreadActionCreator(fakeResponse.data.vote.threadId, fakeResponse.data.vote.userId));

    });
  });

});