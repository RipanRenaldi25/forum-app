import ActionType from './ActionType';

const initialState = {
  users: {},
  userDetail: {},
};

function usersThreadReducer(state = initialState, action = {}) {
  switch (action.type) {
  case ActionType.fetchAllUsers:
    return {
      ...state,
      users: action.payload.users,
    };
  case ActionType.fetchDetailUserThread:
    return {
      ...state,
      userDetail: action.payload.detail,
    };
  case ActionType.addComment:
    return {
      ...state,
      userDetail: {
        ...state.userDetail,
        comments: [
          {
            content: action.payload.comment,
            ...action.payload,
          },
          ...state.userDetail.comments,
        ],
      },
    };
  default:
    return state;
  }
}

export default usersThreadReducer;
