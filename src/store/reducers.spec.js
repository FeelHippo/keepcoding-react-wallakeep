import { ui } from './reducers';

describe('reducers', () => {
  describe('ui', () => {
    const initialState = {
      loading: false,
      error: null,
    };

    it('should handle any _REQUEST action', () => {
      const action = { type: 'ANY_ACTION_REQUEST' };
      const expectedState = {
        loading: true,
        error: null,
      };
      expect(ui(initialState, action)).toEqual(expectedState);
    });

    it('should handle any _SUCCESFULL action', () => {
      const action = { type: 'ANY_ACTION_SUCCESFULL' };
      const expectedState = {
        loading: false,
        error: null,
      };
      expect(ui(initialState, action)).toEqual(expectedState);
    });

    it('should handle any _FAILURE action', () => {
      const error = 'error';
      const action = { type: 'ANY_ACTION_FAILURE', error };
      const expectedState = {
        loading: false,
        error,
      };
      expect(ui(initialState, action)).toEqual(expectedState);
    });

    it('should handle any other action', () => {
      const action = { type: 'ANY_ACTION' };
      const expectedState = initialState;
      expect(ui(initialState, action)).toEqual(expectedState);
    });
  });
});
