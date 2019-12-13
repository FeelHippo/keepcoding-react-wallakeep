import * as types from './types';

import Session from '../models/Session';

const defaultState = {
  session: new Session(),
  tags: [],
  adverts: [],
  currentAdvert: null,
  ui: {
    loading: false,
    error: null,
  },
};

export const session = (state = defaultState.session, action) => {
  switch (action.type) {
    case types.SESSION_SAVE:
      return { ...state, ...action.session };

    case types.SESSION_CLEAR:
      return defaultState.session;

    default:
      return state;
  }
};

export const tags = (state = defaultState.tags, action) => {
  if (action.type === types.TAGS_LOAD_SUCCESFULL) {
    return action.tags;
  }
  return state;
};

export const adverts = (state = defaultState.adverts) => state;

export const currentAdvert = (state = defaultState.currentAdvert) => state;

export const ui = (state = defaultState.ui, { type, error }) => {
  if (/_REQUEST$/.test(type)) {
    return {
      loading: true,
      error: null,
    };
  }

  if (/_SUCCESFULL$/.test(type)) {
    return {
      loading: false,
      error: null,
    };
  }

  if (/_FAILURE$/.test(type)) {
    return {
      loading: false,
      error,
    };
  }

  return state;
};
