import * as types from './types';

import Session from '../models/Session';

const defaultState = {
  session: new Session(),
  tags: [],
  adverts: [],
  currentAdvert: null,
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
  if (action.type === types.TAGS_SAVE) {
    return action.tags;
  }
  return state;
};

export const adverts = (state = defaultState.adverts) => state;

export const currentAdvert = (state = defaultState.currentAdvert) => state;
