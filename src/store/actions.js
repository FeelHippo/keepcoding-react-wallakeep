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

export const loadTagsRequest = () => ({
  type: types.TAGS_LOAD_REQUEST,
});

export const loadTagsSuccesfull = tags => ({
  type: types.TAGS_LOAD_SUCCESFULL,
  tags,
});

export const loadTagsFailure = error => ({
  type: types.TAGS_LOAD_FAILURE,
  error,
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
  dispatch(loadTagsRequest());
  try {
    const tags = await NodepopAPI(apiUrl).getTags();
    dispatch(loadTagsSuccesfull(tags));
  } catch (error) {
    dispatch(loadTagsFailure(error));
  }
};
