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
import { addCommentToThreadActionCreator, asyncAddCommentToThread, asyncDownVoteComment, asyncDownVoteDetailThread, asyncFetchAllUsers, asyncFetchDetailUserThread, asyncNeutralVoteComment, asyncNeutralVoteDetailThread, asyncUpVoteComment, asyncUpVoteDetailThread, downVoteCommentActionCreator, downVoteDetailThreadActionCreator, fetchAllUsers, fetchDetailUserThread, neutralVoteCommentActionCreator, neutralVoteDetailThreadActionCreator, upVoteCommentActionCreator, upVoteDetailThreadActionCreator } from './Action';

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

  describe('asyncDownVoteDetailThread', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('Should dispatch correctly when downvoting detail thread', async () => {
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
            voteType: -1
          }
        }
      };

      vi.spyOn(api, 'downVoteThread').mockResolvedValue(fakeResponse);
      await asyncDownVoteDetailThread(fakeResponse.data.vote.threadId, fakeResponse.data.vote.userId)(dispatch, getState);

      expect(dispatch).toHaveBeenCalledOnce();
      expect(dispatch).toHaveBeenCalledWith(downVoteDetailThreadActionCreator(fakeResponse.data.vote.threadId, fakeResponse.data.vote.userId));
    });
  });

  describe('asyncNeutralVoteDetailThread', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('Should dispatch correctly when neutral voting detail thread', async () => {
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
            voteType: 0
          }
        }
      };

      vi.spyOn(api, 'neutralVoteThread').mockResolvedValue(fakeResponse);
      await asyncNeutralVoteDetailThread(fakeResponse.data.vote.threadId, fakeResponse.data.vote.userId)(dispatch, getState);

      expect(dispatch).toHaveBeenCalledOnce();
      expect(dispatch).toHaveBeenCalledWith(neutralVoteDetailThreadActionCreator(fakeResponse.data.vote.threadId, fakeResponse.data.vote.userId));
    });
  });

  describe('asyncUpVoteComment', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('Should dispatch correctly when upvoting comment', async () => {
      const dispatch = vi.fn();
      const getState = vi.fn().mockReturnValue({
        profile: {
          user: {
            id: 'user-1',
            name: 'test',
            avatar: 'test'
          }
        },
        users: {
          userDetail: {
            id: 'thread-1',
            title: 'Contoh Thread',
            body: 'Contoh Body',
            category: 'Contoh Category',
            createdAt: new Date().toISOString(),
            ownerId: 'user-1',
            upVotesBy: [],
            downVotesBy: [],
            comments: [
              {
                id: 'comment-1',
                content: 'Contoh Comment',
                createdAt: new Date().toISOString(),
                ownerId: 'user-1',
                upVotesBy: [],
                downVotesBy: [],
              }
            ]
          }
        }
      });

      const fakeResponse = {
        data: {
          vote: {
            id: 'vote-1',
            commentId: 'comment-1',
            userId: 'user-1',
            voteType: 1
          }
        }
      };

      vi.spyOn(api, 'upVoteComment').mockResolvedValue(fakeResponse);
      await asyncUpVoteComment(fakeResponse.data.vote.commentId)(dispatch, getState);

      expect(dispatch).toHaveBeenCalledOnce();
      expect(dispatch).toHaveBeenCalledWith(upVoteCommentActionCreator(fakeResponse.data.vote.commentId, fakeResponse.data.vote.userId));
    });

    it('Should call alert when upvoting comment is failed', async () => {
      window.alert = vi.fn();
      const dispatch = vi.fn();
      const fakeResponse = {
        response: {
          data: {
            message: 'Upvote failed'
          }
        }
      };

      vi.spyOn(api, 'upVoteComment').mockRejectedValue(fakeResponse);

      await asyncUpVoteComment('comment-1')(dispatch, () => ({
        profile: {
          user: {
            id: 'user-1',
            name: 'test',
            avatar: 'test'
          }
        },
        users: {
          userDetail: {
            id: 'thread-1',
            title: 'Contoh Thread',
            body: 'Contoh Body',
            category: 'Contoh Category',
            createdAt: new Date().toISOString(),
            ownerId: 'user-1',
            upVotesBy: [],
            downVotesBy: [],
            comments: [
              {
                id: 'comment-1',
                content: 'Contoh Comment',
                createdAt: new Date().toISOString(),
                ownerId: 'user-1',
                upVotesBy: [],
                downVotesBy: [],
              }
            ]
          }
        }
      }));

      expect(window.alert).toHaveBeenCalledOnce();
      expect(window.alert).toHaveBeenCalledWith(fakeResponse.response.data.message);
    });

    it('Should revert to neutral vote if upvoting comment is failed and user has not voted', async () => {
      const dispatch = vi.fn();
      const getState = vi.fn().mockReturnValue({
        profile: {
          user: {
            id: 'user-1',
            name: 'test',
            avatar: 'test'
          }
        },
        users: {
          userDetail: {
            id: 'thread-1',
            title: 'Contoh Thread',
            body: 'Contoh Body',
            category: 'Contoh Category',
            createdAt: new Date().toISOString(),
            ownerId: 'user-1',
            upVotesBy: [],
            downVotesBy: [],
            comments: [
              {
                id: 'comment-1',
                content: 'Contoh Comment',
                createdAt: new Date().toISOString(),
                ownerId: 'user-1',
                upVotesBy: [],
                downVotesBy: [],
              }
            ]
          }
        }
      });

      const fakeResponse = {
        response: {
          data: {
            message: 'Upvote failed'
          }
        }
      };

      vi.spyOn(api, 'upVoteComment').mockRejectedValue(fakeResponse);

      await asyncUpVoteComment('comment-1')(dispatch, getState);

      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenCalledWith(upVoteCommentActionCreator('comment-1', 'user-1'));
      expect(dispatch).toHaveBeenCalledWith(neutralVoteCommentActionCreator('comment-1', 'user-1'));
    });

    it('Should revert to downvote if upvoting comment is failed and user hasdownvoted', async () => {
      const dispatch = vi.fn();
      const getState = vi.fn().mockReturnValue({
        profile: {
          user: {
            id: 'user-1',
            name: 'test',
            avatar: 'test'
          }
        },
        users: {
          userDetail: {
            id: 'thread-1',
            title: 'Contoh Thread',
            body: 'Contoh Body',
            category: 'Contoh Category',
            createdAt: new Date().toISOString(),
            ownerId: 'user-1',
            upVotesBy: [],
            downVotesBy: ['user-1'],
            comments: [
              {
                id: 'comment-1',
                content: 'Contoh Comment',
                createdAt: new Date().toISOString(),
                ownerId: 'user-1',
                upVotesBy: [],
                downVotesBy: ['user-1'],
              }
            ]
          }
        }
      });

      const fakeResponse = {
        response: {
          data: {
            message: 'Upvote failed'
          }
        }
      };

      vi.spyOn(api, 'upVoteComment').mockRejectedValue(fakeResponse);
      await asyncUpVoteComment('comment-1')(dispatch, getState);

      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenCalledWith(upVoteCommentActionCreator('comment-1', 'user-1'));
      expect(dispatch).toHaveBeenCalledWith(downVoteCommentActionCreator('comment-1', 'user-1'));
    });
  });

  describe('asyncDownVoteComment', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('Should dispatch correctly when downvoting cmoment', async () => {
      const dispatch = vi.fn();
      const getState = vi.fn().mockReturnValue({
        profile: {
          user: {
            id: 'user-1',
            name: 'test',
            avatar: 'test'
          }
        },
        users: {
          userDetail: {
            id: 'thread-1',
            title: 'Contoh Thread',
            body: 'Contoh Body',
            category: 'Contoh Category',
            createdAt: new Date().toISOString(),
            ownerId: 'user-1',
            upVotesBy: [],
            downVotesBy: [],
            comments: [
              {
                id: 'comment-1',
                content: 'Contoh Comment',
                createdAt: new Date().toISOString(),
                ownerId: 'user-1',
                upVotesBy: [],
                downVotesBy: [],
              }
            ]
          }
        }
      });

      const fakeResponse = {
        data: {
          vote: {
            id: 'vote-1',
            commentId: 'comment-1',
            userId: 'user-1',
            voteType: -1
          }
        }
      };

      vi.spyOn(api, 'downVoteComment').mockResolvedValue(fakeResponse);
      await asyncDownVoteComment(fakeResponse.data.vote.commentId)(dispatch, getState);

      expect(dispatch).toHaveBeenCalledOnce();
      expect(dispatch).toHaveBeenCalledWith(downVoteCommentActionCreator(fakeResponse.data.vote.commentId, fakeResponse.data.vote.userId));
    });

    it('Should call alert when downvoting comment is failed', async () => {
      window.alert = vi.fn();
      const fakeResponse = {
        response: {
          data: {
            message: 'Downvote failed'
          }
        }
      };

      vi.spyOn(api, 'downVoteComment').mockRejectedValue(fakeResponse);

      await asyncDownVoteComment('comment-1')(() => {}, () => ({
        profile: {
          user: {
            id: 'user-1',
            name: 'test',
            avatar: 'test'
          }
        },
        users: {
          userDetail: {
            id: 'thread-1',
            title: 'Contoh Thread',
            body: 'Contoh Body',
            category: 'Contoh Category',
            createdAt: new Date().toISOString(),
            ownerId: 'user-1',
            upVotesBy: [],
            downVotesBy: [],
            comments: [
              {
                id: 'comment-1',
                content: 'Contoh Comment',
                createdAt: new Date().toISOString(),
                ownerId: 'user-1',
                upVotesBy: ['user-1'],
                downVotesBy: [],
              }
            ]
          }
        }
      }));

      expect(window.alert).toHaveBeenCalledOnce();
      expect(window.alert).toHaveBeenCalledWith(fakeResponse.response.data.message);
    });

    it('Should revert to neutral vote if downvoting comment is failed and user has not voted', async () => {
      const dispatch = vi.fn();
      const getState = vi.fn().mockReturnValue({
        profile: {
          user: {
            id: 'user-1',
            name: 'test',
            avatar: 'test'
          }
        },
        users: {
          userDetail: {
            id: 'thread-1',
            title: 'Contoh Thread',
            body: 'Contoh Body',
            category: 'Contoh Category',
            createdAt: new Date().toISOString(),
            ownerId: 'user-1',
            upVotesBy: [],
            downVotesBy: [],
            comments: [
              {
                id: 'comment-1',
                content: 'Contoh Comment',
                createdAt: new Date().toISOString(),
                ownerId: 'user-1',
                upVotesBy: [],
                downVotesBy: [],
              }
            ]
          }
        }
      });

      const fakeResponse = {
        response: {
          data: {
            message: 'Downvote failed'
          }
        }
      };

      vi.spyOn(api, 'downVoteComment').mockRejectedValue(fakeResponse);

      await asyncDownVoteComment('comment-1')(dispatch, getState);

      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenCalledWith(downVoteCommentActionCreator('comment-1', 'user-1'));
      expect(dispatch).toHaveBeenCalledWith(neutralVoteCommentActionCreator('comment-1', 'user-1'));
    });

    it('Should revert to upvote if downvoting comment is failed and user has upvoted', async () => {
      const dispatch = vi.fn();
      const getState = vi.fn().mockReturnValue({
        profile: {
          user: {
            id: 'user-1',
            name: 'test',
            avatar: 'test'
          }
        },
        users: {
          userDetail: {
            id: 'thread-1',
            title: 'Contoh Thread',
            body: 'Contoh Body',
            category: 'Contoh Category',
            createdAt: new Date().toISOString(),
            ownerId: 'user-1',
            upVotesBy: ['user-1'],
            downVotesBy: [],
            comments: [
              {
                id: 'comment-1',
                content: 'Contoh Comment',
                createdAt: new Date().toISOString(),
                ownerId: 'user-1',
                upVotesBy: ['user-1'],
                downVotesBy: [],
              }
            ]
          }
        }
      });

      const fakeResponse = {
        response: {
          data: {
            message: 'Downvote failed'
          }
        }
      };

      vi.spyOn(api, 'downVoteComment').mockRejectedValue(fakeResponse);
      await asyncDownVoteComment('comment-1')(dispatch, getState);

      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenCalledWith(downVoteCommentActionCreator('comment-1', 'user-1'));
      expect(dispatch).toHaveBeenCalledWith(upVoteCommentActionCreator('comment-1', 'user-1'));
    });
  });

  describe('asyncNeutralVoteComment', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('Should dispatch correctly when neutral voting comment', async () => {
      const dispatch = vi.fn();
      const getState = vi.fn().mockReturnValue({
        profile: {
          user: {
            id: 'user-1',
            name: 'test',
            avatar: 'test'
          }
        },
        users: {
          userDetail: {
            id: 'thread-1',
            title: 'Contoh Thread',
            body: 'Contoh Body',
            category: 'Contoh Category',
            createdAt: new Date().toISOString(),
            ownerId: 'user-1',
            upVotesBy: ['user-1'],
            downVotesBy: [],
            comments: [
              {
                id: 'comment-1',
                content: 'Contoh Comment',
                createdAt: new Date().toISOString(),
                ownerId: 'user-1',
                upVotesBy: ['user-1'],
                downVotesBy: [],
              }
            ]
          }
        }
      });
      const fakeResponse = {
        data: {
          vote: {
            id: 'vote-1',
            commentId: 'comment-1',
            userId: 'user-1',
            voteType: 0
          }
        }
      };

      vi.spyOn(api, 'neutralVoteComment').mockResolvedValue(fakeResponse);
      await asyncNeutralVoteComment(fakeResponse.data.vote.commentId)(dispatch, getState);

      expect(dispatch).toHaveBeenCalledOnce();
      expect(dispatch).toHaveBeenCalledWith(neutralVoteCommentActionCreator(fakeResponse.data.vote.commentId, fakeResponse.data.vote.userId));
    });

    it('Should call alert when neutral voting comment is failed', async () => {
      window.alert = vi.fn();
      const fakeResponse = {
        response: {
          data: {
            message: 'Neutral vote failed'
          }
        }
      };

      vi.spyOn(api, 'neutralVoteComment').mockRejectedValue(fakeResponse);

      await asyncNeutralVoteComment('comment-1')({}, () => ({
        profile: {
          user: {
            id: 'user-1',
            name: 'test',
            avatar: 'test'
          }
        },
        users: {
          userDetail: {
            id: 'thread-1',
            title: 'Contoh Thread',
            body: 'Contoh Body',
            category: 'Contoh Category',
            createdAt: new Date().toISOString(),
            ownerId: 'user-1',
            upVotesBy: ['user-1'],
            downVotesBy: [],
            comments: [
              {
                id: 'comment-1',
                content: 'Contoh Comment',
                createdAt: new Date().toISOString(),
                ownerId: 'user-1',
                upVotesBy: ['user-1'],
                downVotesBy: [],
              }
            ]
          }
        }
      }));

      expect(window.alert).toHaveBeenCalledOnce();
      expect(window.alert).toHaveBeenCalledWith(fakeResponse.response.data.message);
    });

  });
});