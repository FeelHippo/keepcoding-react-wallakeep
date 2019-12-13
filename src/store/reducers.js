import * as types from './types';

import Session from '../models/Session';

const defaultState = {
  session: new Session(),
  tags: [],
  adverts: [],
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

export const adverts = (state = defaultState.adverts, action) => {
  if (action.type === types.SESSION_CLEAR) {
    return defaultState.adverts;
  }
  if (action.type === types.ADVERTS_LOAD_SUCCESFULL) {
    return action.adverts;
  }
  return state;
};

export const ui = (state = defaultState.ui, action) => {
  if (/_REQUEST$/.test(action.type)) {
    return {
      loading: true,
      error: null,
    };
  }

  if (/_SUCCESFULL$/.test(action.type)) {
    return {
      loading: false,
      error: null,
    };
  }

  if (/_FAILURE$/.test(action.type)) {
    return {
      loading: false,
      error: action.error,
    };
  }
  return state;
};
