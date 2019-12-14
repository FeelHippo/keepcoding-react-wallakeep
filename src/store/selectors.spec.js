import {
  getSession,
  getMaxAdverts,
  isUserRegistered,
  getAdvert,
} from './selectors';

const state = {
  session: {
    name: 'name',
    maxAdverts: 4,
  },
  adverts: [{ _id: '1' }],
};

describe('selectors', () => {
  describe('getSession', () => {
    it('should return session', () => {
      const expectedResult = state.session;
      expect(getSession(state)).toEqual(expectedResult);
    });
  });

  describe('getMaxAdverts', () => {
    it('should return maxAdverts', () => {
      const expectedResult = state.session.maxAdverts;
      expect(getMaxAdverts(state)).toEqual(expectedResult);
    });
  });

  describe('isUserRegistered', () => {
    it('should return true is session has name', () => {
      const expectedResult = true;
      expect(isUserRegistered(state)).toEqual(expectedResult);
    });

    it('should return false if session has no name', () => {
      const newState = { ...state, session: { ...state.session, name: '' } };
      const expectedResult = false;
      expect(isUserRegistered(newState)).toEqual(expectedResult);
    });
  });

  describe('getAdvert', () => {
    it('should return advert if exists', () => {
      const expectedResult = state.adverts[0];
      expect(getAdvert(state)('1')).toEqual(expectedResult);
    });

    it('should return undefined if not exists', () => {
      expect(getAdvert(state)('2')).toBeUndefined();
    });
  });
});
