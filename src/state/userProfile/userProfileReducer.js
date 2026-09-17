import ActionType from './ActionType';

const userProfileReducer = (state = null, action = {}) => {
  switch (action.type) {
  case ActionType.getUserProfile:
    return action.payload.profile;
  case ActionType.removeProfile:
    return null;
  default: return state;
  }
};

export default userProfileReducer;
