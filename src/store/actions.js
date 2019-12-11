import * as types from './types';

export const saveSession = session => ({
  type: types.SESSION_SAVE,
  session,
});

export const clearSession = () => ({
  type: types.SESSION_CLEAR,
});

export const userLogin = session => (dispatch, _getState, { history }) => {
  dispatch(saveSession(session));
  history.push('/');
};
