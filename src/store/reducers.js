import * as types from './types';

import Session from '../models/Session';

const initialState = {
  session: new Session(),
  adverts: [],
  currentAdvert: null,
};

export const session = (state = initialState.session, action) => {
  switch (action.type) {
    case types.SESSION_SAVE:
      return { ...state, ...action.session };

    case types.SESSION_CLEAR:
      return initialState.session;

    default:
      return state;
  }
};

export const adverts = (state = initialState.adverts) => state;

export const currentAdvert = (state = initialState.currentAdvert) => state;
