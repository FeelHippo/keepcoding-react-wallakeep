import * as types from './types';
import {
  saveSession,
  clearSession,
  userLogin,
  userLogout,
  loadTags,
} from './actions';

const state = { session: { apiUrl: 'apiUrl' } };
const session = { name: 'name' };
const remember = true;
const getState = () => state;

describe('actions', () => {
  describe('saveSession', () => {
    it('should create a SESSION_SAVE action', () => {
      const expectedAction = {
        type: types.SESSION_SAVE,
        session,
        remember,
      };
      expect(saveSession(session, remember)).toEqual(expectedAction);
    });
  });

  describe('clearSession', () => {
    it('should create a SESSION_CLEAR action', () => {
      const expectedAction = {
        type: types.SESSION_CLEAR,
      };
      expect(clearSession()).toEqual(expectedAction);
    });
  });

  describe('userLogin', () => {
    const dispatch = jest.fn();
    const history = { push: jest.fn() };
    const expectedAction = {
      type: types.SESSION_SAVE,
      session,
      remember,
    };
    userLogin(session, remember)(dispatch, getState, { history });

    it('should dispatch a saveSession action', () => {
      expect(dispatch).toHaveBeenCalledWith(expectedAction);
    });

    it('should navigate to /', () => {
      expect(history.push).toHaveBeenCalledWith('/');
    });
  });

  describe('userLogout', () => {
    const dispatch = jest.fn();
    const history = { push: jest.fn() };
    const expectedAction = {
      type: types.SESSION_CLEAR,
    };
    userLogout()(dispatch, getState, { history });

    it('should dispatch a clearSession action', () => {
      expect(dispatch).toHaveBeenCalledWith(expectedAction);
    });

    it('should navigate to /register', () => {
      expect(history.push).toHaveBeenCalledWith('/register');
    });
  });

  describe('loadTags', () => {
    const tags = 'tags';
    const error = 'error';
    const getTags = jest
      .fn()
      .mockResolvedValueOnce(tags)
      .mockRejectedValueOnce(error);
    const NodepopAPI = () => ({
      getTags,
    });

    describe('when service api resolves', () => {
      const dispatch = jest.fn();
      loadTags()(dispatch, getState, { services: { NodepopAPI } });

      it('should dispatch a loadTagsRequest action', () => {
        const expectedAction = {
          type: types.TAGS_LOAD_REQUEST,
        };
        expect(dispatch).toHaveBeenCalledWith(expectedAction);
      });

      it('should call api service', () => {
        expect(getTags).toHaveBeenCalled();
      });

      it('should dispatch a loadTagsSuccesfull action', () => {
        const expectedAction = {
          type: types.TAGS_LOAD_SUCCESFULL,
          tags,
        };
        expect(dispatch).toHaveBeenCalledWith(expectedAction);
      });
    });

    describe('when service api rejects', () => {
      const dispatch = jest.fn();
      loadTags()(dispatch, getState, { services: { NodepopAPI } });

      it('should dispatch a loadTagsFailure action', () => {
        const expectedAction = {
          type: types.TAGS_LOAD_FAILURE,
          error,
        };
        expect(dispatch).toHaveBeenCalledWith(expectedAction);
      });
    });
  });
});
