import ActionType from './ActionType';

function leaderBoardReducer(leaderboard = [], action = {}) {
  switch (action.type) {
  case ActionType.fetchAllLeaderBoard:
    return action.payload.users;
  default: return leaderboard;
  }
}

export default leaderBoardReducer;
