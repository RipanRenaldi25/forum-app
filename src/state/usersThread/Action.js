// import { showLoading, hideLoading } from 'react-redux-loading-bar';
import {
  createComment,
  getAllUsers,
  getUserDetailByThread,
} from '../../utils/api';
import ActionType from './ActionType';

export function fetchAllUsers(users) {
  return {
    type: ActionType.fetchAllUsers,
    payload: {
      users,
    },
  };
}

export function asyncFetchAllUsers() {
  return async (dispatch) => {
    try {
      const { data } = await getAllUsers();
      dispatch(fetchAllUsers(data));
    } catch ({ response: { data } }) {
      const { message } = data;
      alert(message);
    }
  };
}

export const fetchDetailUserThread = (detail) => ({
  type: ActionType.fetchDetailUserThread,
  payload: {
    detail,
  },
});

export const asyncFetchDetailUserThread = (id) => async (dispatch) => {
  try {
    const {
      data: { detailThread },
    } = await getUserDetailByThread(id);
    dispatch(fetchDetailUserThread(detailThread));
  } catch ({
    response: {
      data: { message },
    },
  }) {
    alert(message);
  }
};

export const addCommentToThreadActionCreator = ({
  content,
  owner,
  createdAt,
  upVotesBy,
  downVotesBy,
  id,
}) => ({
  type: ActionType.addComment,
  payload: {
    id,
    comment: content,
    createdAt,
    owner,
    upVotesBy: upVotesBy || [],
    downVotesBy: downVotesBy || [],
  },
});

export const asyncAddCommentToThread =
  ({ threadId, content }) =>
    async (dispatch) => {
      try {
        const {
          data: { comment },
        } = await createComment({ threadId, comment: content });
        dispatch(addCommentToThreadActionCreator(comment));
      } catch ({
        response: {
          data: { message },
        },
      }) {
        alert(message);
      }
    };
