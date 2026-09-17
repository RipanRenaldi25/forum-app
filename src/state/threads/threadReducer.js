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
  default: return state;
  }
};

export default threadReducer;
