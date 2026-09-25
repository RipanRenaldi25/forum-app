import ActionType from './ActionType';
import { registerUser, loginUser, getOwnProfile } from '../../utils/api';
import { getUserProfileActionCreator } from '../userProfile/Action';

export const setAuthUser = (authUser) => ({
  type: ActionType.setAuthUser,
  payload: {
    authUser,
  },
});

export const unSetAuthUser = () => ({
  type: ActionType.unSetAuthUser,
});

export const asyncUnsetAuthUser = () => {
  return async (dispatch) => {
    dispatch(unSetAuthUser());
    localStorage.removeItem('AUTH_TOKEN');
  };
};

export const asyncRegistUser =
  ({ name, email, password }) =>
    async () => {
      try {
        const { message } = await registerUser({ name, email, password });
        alert(message);
      } catch (err) {
        const message = err.response?.data?.message ?? err.message ?? 'Terjadi kesalahan jaringan';
        alert(message);
      }
    };

export const asyncLoginUser =
  ({ email, password }) =>
    async (dispatch) => {
      try {
        const {
          data: { token },
        } = await loginUser({ email, password });
        dispatch(setAuthUser(token));
        localStorage.setItem('AUTH_TOKEN', token);
        const { data } = await getOwnProfile();
        dispatch(getUserProfileActionCreator(data));
      } catch (err) {
        const message = err.response?.data?.message ?? err.message ?? 'Terjadi kesalahan jaringan';
        alert(message);
      }
    };
