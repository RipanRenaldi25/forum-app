import { createThread, downVoteThread, getAllThreads, upVoteThread } from '../../utils/api';
import ActionType from './ActionType';

export const getThreadsActionCreator = (threads) => ({
  type: ActionType.fetchThread,
  payload: {
    threads,
  },
});

export const filterThreadActionCreator = () => ({
  type: ActionType.filterThread,
});

export const asyncGetThread = () => async (dispatch) => {
  try {
    const { data: threads } = await getAllThreads();
    dispatch(getThreadsActionCreator(threads));
    dispatch(filterThreadActionCreator());
  } catch ({ response: { data } }) {
    const { message } = data;
    alert(message);
  }
};

export const createThreadActionCreator = (thread) => ({
  type: ActionType.createThread,
  payload: {
    thread,
  },
});

export const asyncCreateThread =
  ({ title, body, category }) =>
    async (dispatch) => {
      try {
        const {
          data: { thread },
        } = await createThread({ title, body, category });
        dispatch(createThreadActionCreator(thread));
        dispatch(filterThreadActionCreator());
      } catch ({
        response: {
          data: { message },
        },
      }) {
        alert(message);
      }
    };

export const upVoteThreadActionCreator = (threadId, userId) => ({
  type: ActionType.upVoteThread,
  payload: {
    threadId,
    userId
  }
});

export const asyncUpVoteThread = (threadId) => async (dispatch) => {
  try {
    const { data } = await upVoteThread(threadId);
    const userId = data.userId;
    dispatch(upVoteThreadActionCreator(threadId, userId));
  } catch (err) {
    if (err.status === 401) {
      alert('You must be logged in to upvote a thread.');
      return;
    }
    const errMessage = err.response?.data?.message || err.message || 'An error occurred while upvoting the thread.';
    alert(errMessage);
    console.error(errMessage);
  }
};