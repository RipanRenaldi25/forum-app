// import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { getAllLeaderBoard } from '../../utils/api';
import ActionType from './ActionType';

export const putAllLeaderBoardActionCreator = (users) => ({
  type: ActionType.fetchAllLeaderBoard,
  payload: {
    users,
  },
});

export const asyncFetchAllLeaderBoard = () => async (dispatch) => {
  // dispatch(showLoading());
  try {
    const {
      data: { leaderboards },
    } = await getAllLeaderBoard();
    dispatch(putAllLeaderBoardActionCreator(leaderboards));
  } catch ({
    response: {
      data: { message },
    },
  }) {
    alert(message);
  }
  // dispatch(hideLoading());
};
