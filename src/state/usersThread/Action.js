// import { showLoading, hideLoading } from 'react-redux-loading-bar';
import {
  createComment,
  downVoteComment,
  downVoteThread,
  getAllUsers,
  getUserDetailByThread,
  neutralVoteThread,
  upVoteComment,
  upVoteThread,
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
    console.log({ detailThread });
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


export const upVoteDetailThreadActionCreator = (threadId, userId) => ({
  type: ActionType.upVoteDetailThread,
  payload: {
    threadId,
    userId
  }
});

export const asyncUpVoteDetailThread = (threadId) => async (dispatch, getState) => {
  const { profile } = getState();
  if (!profile){
    alert('You must be logged in to upvote this thread');
    return;
  }
  const { user } = profile;
  try {
    await upVoteThread(threadId);
    dispatch(upVoteDetailThreadActionCreator(threadId, user.id));
  } catch (err){
    alert(err.message);
  }
};

export const downVoteDetailThreadActionCreator = (threadId, userId) => ({
  type: ActionType.downVoteDetailThread,
  payload: {
    threadId,
    userId
  }
});

export const asyncDownVoteDetailThread = (threadId) => async (dispatch, getState) => {
  const { profile } = getState();
  if (!profile){
    alert('You must be logged in to downvote this thread');
    return;
  }
  const { user } = profile;
  try {
    await downVoteThread(threadId);
    dispatch(downVoteDetailThreadActionCreator(threadId, user.id));
  } catch (err) {
    alert(err.message);
  }
};

export const neutralVoteDetailThreadActionCreator = (threadId, userId) => ({
  type: ActionType.neutralVoteDetailThread,
  payload: {
    threadId,
    userId
  }
});

export const asyncNeutralVoteDetailThread = (threadId) => async (dispatch, getState) => {
  const { profile } = getState();
  if (!profile){
    alert('You must be logged in to neutral vote this thread');
    return;
  }
  const { user } = profile;
  try {
    await neutralVoteThread(threadId);
    dispatch(neutralVoteDetailThreadActionCreator(threadId, user.id));
  } catch (err) {
    alert(err.message);
  }
};

export const upVoteCommentActionCreator = (commentId, userId) => ({
  type: ActionType.upVoteComment,
  payload: {
    commentId,
    userId
  }
});

export const asyncUpVoteComment = (commentId) => async (dispatch, getState) => {
  const { profile } = getState();
  if (!profile){
    alert('You must be logged in to upvote this comment');
    return;
  }
  const { users: { userDetail } } = getState();
  const { user } = profile;
  try {
    await upVoteComment(userDetail.id, commentId);
    dispatch(upVoteCommentActionCreator(commentId, user.id));
  } catch (err){
    alert(err.message);
  }
};

export const downVoteCommentActionCreator = (commentId, userId) => ({
  type: ActionType.downVoteComment,
  payload: {
    commentId,
    userId
  }
});

export const asyncDownVoteComment = (commentId) => async (dispatch, getState) => {
  const { profile } = getState();
  if (!profile){
    alert('You must be logged in to downvote this comment');
    return;
  }
  const { user } = profile;
  const { users: { userDetail } } = getState();
  if (!userDetail || !userDetail.id){
    alert('No thread selected');
    return;
  }
  try {
    await downVoteComment(userDetail.id, commentId);
    dispatch(downVoteCommentActionCreator(commentId, user.id));
  } catch (err) {
    const errMessage = err.response?.data?.message || err.message || 'An error occurred while downvoting the comment.';
    alert(errMessage);
  }
};