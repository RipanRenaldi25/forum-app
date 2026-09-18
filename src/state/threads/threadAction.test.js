/**
 * asyncGetThread
 *  - Should called allert with error message when getThread is failed
 *  - Should dispatch correctly when fetching thread is success
 *
 * asyncCreateThread
 *  - Should called allert with error message when addThread is failed
 *  - Should dispatch correctly when adding new thread is success
 */

import { describe, expect, it, vi } from 'vitest';
import * as api from '../../utils/api';
import { asyncCreateThread, asyncGetThread, createThreadActionCreator, filterThreadActionCreator, getThreadsActionCreator } from './Action';

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
});