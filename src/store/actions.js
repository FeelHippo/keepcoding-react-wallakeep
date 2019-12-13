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

export const createAdvertsRequest = () => ({
  type: types.ADVERTS_CREATE_REQUEST,
});

export const createAdvertsSuccesfull = advert => ({
  type: types.ADVERTS_CREATE_SUCCESFULL,
  advert,
});

export const createAdvertsFailure = error => ({
  type: types.ADVERTS_CREATE_FAILURE,
  error,
});

export const updateAdvertsRequest = () => ({
  type: types.ADVERTS_UPDATE_REQUEST,
});

export const updateAdvertsSuccesfull = advert => ({
  type: types.ADVERTS_UPDATE_SUCCESFULL,
  advert,
});

export const updateAdvertsFailure = error => ({
  type: types.ADVERTS_UPDATE_FAILURE,
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

// export const createAdvert = advert => async (
//   dispatch,
//   getState,
//   { services: { NodepopAPI }, history },
// ) => {
//   const state = getState();
//   dispatch(createAdvertsRequest());
//   try {
//     const { apiUrl } = getSession(state);
//     const createdAdvert = await NodepopAPI(apiUrl).postAdvert(advert);
//     dispatch(createAdvertsSuccesfull(createdAdvert));
//     history.push(`/advert/${createdAdvert._id}`);
//   } catch (error) {
//     dispatch(createAdvertsFailure(error));
//   }
// };

// export const updateAdvert = advert => async (
//   dispatch,
//   getState,
//   { services: { NodepopAPI }, history },
// ) => {
//   const state = getState();
//   dispatch(updateAdvertsRequest());
//   try {
//     const { apiUrl } = getSession(state);
//     const updatedAdvert = await NodepopAPI(apiUrl).editAdvert(advert);
//     dispatch(updateAdvertsSuccesfull(updatedAdvert));
//     history.push(`/advert/${updatedAdvert._id}`);
//   } catch (error) {
//     dispatch(createAdvertsFailure(error));
//   }
// };

export const createOrUpdateAdvert = advert => async (
  dispatch,
  getState,
  { services: { NodepopAPI }, history },
) => {
  const state = getState();
  const { apiUrl } = getSession(state);
  const { postAdvert, editAdvert } = NodepopAPI(apiUrl);

  const create = !advert._id;
  const actions = {
    request: create ? createAdvertsRequest : updateAdvertsRequest,
    api: create ? postAdvert : editAdvert,
    succesfull: create ? createAdvertsSuccesfull : updateAdvertsSuccesfull,
    failure: create ? createAdvertsFailure : updateAdvertsFailure,
  };

  dispatch(actions.request());
  try {
    const newAdvert = await actions.api(advert);
    dispatch(actions.succesfull(newAdvert));
    history.push(`/advert/${newAdvert._id}`);
  } catch (error) {
    dispatch(actions.failure(error));
  }
};
