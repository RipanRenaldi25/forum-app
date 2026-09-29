import ActionType from './ActionType';

const initialState = {
  users: [],
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
  case ActionType.upVoteDetailThread:
    if (state.userDetail.id === action.payload.threadId) {
      return {
        ...state,
        userDetail: {
          ...state.userDetail,
          upVotesBy: [...state.userDetail.upVotesBy, action.payload.userId],
        },
      };
    }
    return state;
  case ActionType.downVoteDetailThread:
    return {
      ...state,
      userDetail: {
        ...state.userDetail,
        downVotesBy: [...state.userDetail.downVotesBy, action.payload.userId]
      }
    };
  case ActionType.neutralVoteDetailThread:
  {
    const isUpVoted = state.userDetail.upVotesBy.includes(action.payload.userId);
    const isDownVoted = state.userDetail.downVotesBy.includes(action.payload.userId);

    return {
      ...state,
      userDetail: {
        ...state.userDetail,
        upVotesBy: isUpVoted ? state.userDetail.upVotesBy.filter((userId) => userId !== action.payload.userId) : state.userDetail.upVotesBy,
        downVotesBy: isDownVoted ? state.userDetail.downVotesBy.filter((userId) => userId !== action.payload.userId) : state.userDetail.downVotesBy
      }
    };
  }
  case ActionType.upVoteComment:
  {
    const isAlreadyUpVoted = state.userDetail.comments.find((comment) => comment.id === action.payload.commentId)?.upVotesBy.includes(action.payload.userId);
    if (isAlreadyUpVoted) {
      return state;
    }
    const isAlreadyDownVoted = state.userDetail.comments.find((comment) => comment.id === action.payload.commentId)?.downVotesBy.includes(action.payload.userId);
    return {
      ...state,
      userDetail: {
        ...state.userDetail,
        comments: state.userDetail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: [...comment.upVotesBy, action.payload.userId],
              downVotesBy: isAlreadyDownVoted ? comment.downVotesBy.filter((userId) => userId !== action.payload.userId) : comment.downVotesBy
            };
          };
          return comment;
        })
      }
    };
  }
  case ActionType.downVoteComment:
  {
    const isAlreadyDownVoted = state.userDetail.comments.find((comment) => comment.id === action.payload.commentId)?.downVotesBy.includes(action.payload.userId);
    if (isAlreadyDownVoted) {
      return state;
    }
    const isAlreadyUpVoted = state.userDetail.comments.find((comment) => comment.id === action.payload.commentId)?.upVotesBy.includes(action.payload.userId);
    return {
      ...state,
      userDetail: {
        ...state.userDetail,
        comments: state.userDetail.comments.map((comment) => comment.id === action.payload.commentId ? {
          ...comment,
          downVotesBy:  [...comment.downVotesBy, action.payload.userId],
          upVotesBy: isAlreadyUpVoted ? comment.upVotesBy.filter((userId) => userId !== action.payload.userId) : comment.upVotesBy
        } : comment)
      }
    };
  }
  default:
    return state;
  }
}

export default usersThreadReducer;
