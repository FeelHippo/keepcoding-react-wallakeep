import * as types from './types';
import { getSession, areTagsLoaded } from './selectors';

export const saveSession = (session, remember) => ({
  type: types.SESSION_SAVE,
  session,
  remember,
});

export const clearSession = () => ({
  type: types.SESSION_CLEAR,
});

export const userLogin = (...args) => (dispatch, _getState, { history }) => {
  dispatch(saveSession(...args));
  history.push('/');
};

export const userLogout = (...args) => (dispatch, _getState, { history }) => {
  dispatch(clearSession(...args));
  history.push('/register');
};

export const saveTags = tags => ({
  type: types.TAGS_SAVE,
  tags,
});

export const loadTags = () => async (
  dispatch,
  getState,
  { services: { NodepopAPI } },
) => {
  const state = getState();
  if (areTagsLoaded(state)) {
    return;
  }
  const { apiUrl } = getSession(state);
  const tags = await NodepopAPI(apiUrl).getTags();
  dispatch(saveTags(tags));
};
