// import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { getOwnProfile } from '../../utils/api';
import ActionType from './ActionType';

export const getUserProfileActionCreator = (payload) => ({
  type: ActionType.getUserProfile,
  payload: {
    profile: payload,
  },
});

export const asyncGetUserProfile = () => async (dispatch) => {
  // dispatch(showLoading());
  try {
    const { data } = await getOwnProfile();
    dispatch(getUserProfileActionCreator(data));
  } catch ({ response: { data } }) {
    const { message } = data;
    alert(message);
  }
  // dispatch(hideLoading());
};

export const unsetProfile = () => ({
  type: ActionType.removeProfile
});