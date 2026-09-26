import { getOwnProfile } from '../../utils/api';
import { setAuthUser, unSetAuthUser } from '../users/Action';
import ActionType from './ActionType';

export const getUserProfileActionCreator = (payload) => ({
  type: ActionType.getUserProfile,
  payload: {
    profile: payload,
  },
});

export const asyncGetUserProfile = () => async (dispatch) => {
  try {
    const { data } = await getOwnProfile();
    dispatch(getUserProfileActionCreator(data));
  } catch ({ response: { data } }) {
    const { message } = data;
    alert(message);
  }
};

export const unsetProfile = () => ({
  type: ActionType.removeProfile
});

export const asyncPreloadProcess = () => async (dispatch) => {
  const token = localStorage.getItem('AUTH_TOKEN');
  if (!token){
    dispatch(unsetProfile());
    return;
  }
  try {
    const { data } = await getOwnProfile();
    dispatch(getUserProfileActionCreator(data));
    dispatch(setAuthUser(token));
  } catch (err) {
    localStorage.removeItem('AUTH_TOKEN');
    console.error('[ERROR] asyncPreloadProcess:', err);
    dispatch(unsetProfile());
    dispatch(unSetAuthUser());
  }
};