import { getAllLeaderBoard } from '../../utils/api';
import ActionType from './ActionType';

export const putAllLeaderBoardActionCreator = (users) => ({
  type: ActionType.fetchAllLeaderBoard,
  payload: {
    users,
  },
});

export const asyncFetchAllLeaderBoard = () => async (dispatch) => {
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
};
