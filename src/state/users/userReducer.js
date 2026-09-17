import ActionType from './ActionType';

function userReducer(
  authUser = localStorage.getItem('AUTH_TOKEN') || null,
  action = {},
) {
  switch (action.type) {
  case ActionType.setAuthUser:
    return action.payload.authUser;
  case ActionType.unSetAuthUser:
    localStorage.removeItem('AUTH_TOKEN');
    return null;
  default:
    return authUser;
  }
}

export default userReducer;
