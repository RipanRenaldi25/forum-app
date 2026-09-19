import { getOwnProfile } from '../../utils/api';
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