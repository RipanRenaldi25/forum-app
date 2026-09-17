import ActionType from './ActionType';

function userReducer(
  authUser = null,
  action = {},
) {
  switch (action.type) {
  case ActionType.setAuthUser:
    return action.payload.authUser;
  case ActionType.unSetAuthUser:
    return null;
  default:
    return authUser;
  }
}

export default userReducer;
