import { createThread, downVoteThread, getAllThreads, neutralVoteThread, upVoteThread } from '../../utils/api';
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

export const asyncUpVoteThread = (threadId, userId) => async (dispatch) => {
  try {
    await upVoteThread(threadId);
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

export const neutralVoteThreadActionCreator = (threadId, userId) => {
  return {
    type: ActionType.neutralVoteThread,
    payload: {
      threadId,
      userId
    }
  };
};

export const asyncNeutralVoteThread = (threadId, userId) => async (dispatch) => {
  try {
    await neutralVoteThread(threadId);
    dispatch(neutralVoteThreadActionCreator(threadId, userId));
  } catch (err) {
    if (err.status === 401) {
      alert('You must be logged in to neutral vote a thread.');
      return;
    }
    const errMessage = err.response?.data?.message || err.message || 'An error occurred while neutral voting the thread.';
    alert(errMessage);
    console.error(errMessage);
  }
};

export const downVoteThreadActionCreator = (threadId, userId) => {
  return {
    type: ActionType.downVoteThread,
    payload: {
      threadId,
      userId
    }
  };
};

export const asyncDownVoteThread = (threadId, userId) => async (dispatch) => {
  try {
    await downVoteThread(threadId);
    dispatch(downVoteThreadActionCreator(threadId, userId));
  } catch (err) {
    if (err.status === 401) {
      alert('You must be logged in to downvote a thread.');
      return;
    }
    const errMessage = err.response?.data?.message || err.message || 'An error occurred while downvoting the thread.';
    alert(errMessage);
    console.error(errMessage);
  }
};