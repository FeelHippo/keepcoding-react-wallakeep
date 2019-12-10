const initialState = {
  session: null,
  adverts: [],
  currentAdvert: null,
};

export const session = (state = initialState.session) => state;

export const adverts = (state = initialState.adverts) => state;

export const currentAdvert = (state = initialState.currentAdvert) => state;
