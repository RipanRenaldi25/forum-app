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

export const asyncUpVoteThread = (threadId, userId) => async (dispatch, getState) => {
  const { threads: { threads } } = getState();
  const targetThread = threads.find((thread) => thread.id === threadId);
  const isAlreadyUpVoted = targetThread.upVotesBy.includes(userId);
  if (isAlreadyUpVoted) {
    return;
  }
  dispatch(upVoteThreadActionCreator(threadId, userId));
  try {
    await upVoteThread(threadId);
  } catch (err) {
    const isAlreadyDownVoted = targetThread.downVotesBy.includes(userId);
    if (isAlreadyDownVoted){
      dispatch(downVoteThreadActionCreator(threadId, userId));
    } else {
      dispatch(neutralVoteThreadActionCreator(threadId, userId));
    }
    const statusCode = err.response?.status;
    if (statusCode === 401) {
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
    const statusCode = err.response?.status;
    if (statusCode === 401) {
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

export const asyncDownVoteThread = (threadId, userId) => async (dispatch, getState) => {
  const { threads: { threads } } = getState();
  const targetThread = threads.find((thread) => thread.id === threadId);
  const isAlreadyDownVoted = targetThread.downVotesBy.includes(userId);
  if (isAlreadyDownVoted) {
    return;
  }
  dispatch(downVoteThreadActionCreator(threadId, userId));
  try {
    await downVoteThread(threadId);
  } catch (err) {
    const isAlreadyUpVoted = targetThread.upVotesBy.includes(userId);
    if (isAlreadyUpVoted){
      dispatch(upVoteThreadActionCreator(threadId, userId));
    } else {
      dispatch(neutralVoteThreadActionCreator(threadId, userId));
    }

    const statusCode = err.response?.status;
    if (statusCode === 401) {
      alert('You must be logged in to downvote a thread.');
      return;

    }
    const errMessage = err.response?.data?.message || err.message || 'An error occurred while downvoting the thread.';
    alert(errMessage);
    console.error(errMessage);
  }
};