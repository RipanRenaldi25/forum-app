import ActionType from './ActionType';

const initialState = {
  threads: [],
  category: [],
};
const threadReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case ActionType.fetchThread:
    return {
      ...state,
      threads: action.payload.threads.threads,
    };
  case ActionType.createThread:
    return {
      ...state,
      threads: [...state.threads, action.payload.thread],
    };
  case ActionType.filterThread:
    return {
      ...state,
      category: state.threads.map((thread) => thread.category),
    };
  case ActionType.upVoteThread:
    return {
      ...state,
      threads: state.threads.map((thread) => {
        if (thread.id !== action.payload.threadId) {
          return thread;
        }
        const isAlreadyupVoted = thread.upVotesBy.includes(action.payload.userId);
        if (isAlreadyupVoted) {
          return thread;
        }
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy:  [...thread.upVotesBy, action.payload.userId],
            downVotesBy: thread.downVotesBy.filter((userId) => userId !== action.payload.userId)
          };
        }
      })
    };
  case ActionType.neutralVoteThread:
    return {
      ...state,
      threads: state.threads.map((thread) => {
        if (thread.id !== action.payload.threadId) {
          return thread;
        }
        const isUpVoted = thread.upVotesBy.includes(action.payload.userId);
        const isDownVoted = thread.downVotesBy.includes(action.payload.userId);
        return {
          ...thread,
          upVotesBy: isUpVoted ? thread.upVotesBy.filter((userId) => userId !== action.payload.userId) : thread.upVotesBy,
          downVotesBy: isDownVoted ? thread.downVotesBy.filter((userId) => userId !== action.payload.userId) : thread.downVotesBy
        };
      })
    };
  case ActionType.downVoteThread:
    return {
      ...state,
      threads: state.threads.map((thread) => {
        if (thread.id !== action.payload.threadId) {
          return thread;
        }
        const isAlreadyDownVoted = thread.downVotesBy.includes(action.payload.userId);
        if (isAlreadyDownVoted) {
          return thread;
        }
        return {
          ...thread,
          downVotesBy: [...thread.downVotesBy, action.payload.userId],
          upVotesBy: thread.upVotesBy.filter((userId) => userId !== action.payload.userId)
        };
      })
    };
  default: return state;
  }
};

export default threadReducer;
