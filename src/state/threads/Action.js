// import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { createThread, getAllThreads } from '../../utils/api';
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
  // dispatch(showLoading());
  try {
    const { data: threads } = await getAllThreads();
    dispatch(getThreadsActionCreator(threads));
    dispatch(filterThreadActionCreator());
  } catch ({ response: { data } }) {
    const { message } = data;
    alert(message);
  }
  // dispatch(hideLoading());
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
    // dispatch(showLoading());
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
    // dispatch(hideLoading());
    };
