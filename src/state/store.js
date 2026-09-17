import { configureStore } from '@reduxjs/toolkit';
import userReducer from './users/userReducer';
import userProfileReducer from './userProfile/userProfileReducer';
import threadReducer from './threads/threadReducer';
import usersThreadReducer from './usersThread/usersThreadReducer';
import leaderBoardReducer from './leaderboards/leaderboardReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    profile: userProfileReducer,
    threads: threadReducer,
    users: usersThreadReducer,
    leaderBoard: leaderBoardReducer,
  },
});

export default store;
