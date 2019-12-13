import * as types from './types';
import { getSession, getAdvert } from './selectors';

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

  dispatch(loadTagsRequest());
  try {
    const { apiUrl } = getSession(state);
    const tags = await NodepopAPI(apiUrl).getTags();
    dispatch(loadTagsSuccesfull(tags));
  } catch (error) {
    dispatch(loadTagsFailure(error));
  }
};

export const checkApi = () => async (
  _dispatch,
  getState,
  { services: { NodepopAPI } },
) => {
  const state = getState();
  const { apiUrl } = getSession(state);
  return NodepopAPI(apiUrl).getTags();
};

export const loadAdvertsRequest = () => ({
  type: types.ADVERTS_LOAD_REQUEST,
});

export const loadAdvertsSuccesfull = adverts => ({
  type: types.ADVERTS_LOAD_SUCCESFULL,
  adverts,
});

export const loadAdvertsFailure = error => ({
  type: types.ADVERTS_LOAD_FAILURE,
  error,
});

export const loadAdverts = () => async (
  dispatch,
  getState,
  { services: { NodepopAPI } },
) => {
  const state = getState();

  dispatch(loadAdvertsRequest());
  try {
    const { apiUrl } = getSession(state);
    const adverts = await NodepopAPI(apiUrl).getAdverts();
    dispatch(loadAdvertsSuccesfull(adverts));
  } catch (error) {
    dispatch(loadAdvertsFailure(error));
  }
};

export const searchAdverts = filters => async (
  dispatch,
  getState,
  { services: { NodepopAPI } },
) => {
  const state = getState();

  dispatch(loadAdvertsRequest());
  try {
    const { apiUrl } = getSession(state);
    const adverts = await NodepopAPI(apiUrl).searchAdverts(filters);
    dispatch(loadAdvertsSuccesfull(adverts));
  } catch (error) {
    dispatch(loadAdvertsFailure(error));
  }
};

export const loadAdvert = advertId => async (
  dispatch,
  getState,
  { services: { NodepopAPI } },
) => {
  const state = getState();
  if (getAdvert(state)(advertId)) {
    return;
  }

  dispatch(loadAdvertsRequest());
  try {
    const { apiUrl } = getSession(state);
    const advert = await NodepopAPI(apiUrl).getAdvert(advertId);
    dispatch(loadAdvertsSuccesfull([advert]));
  } catch (error) {
    dispatch(loadAdvertsFailure(error));
  }
};
