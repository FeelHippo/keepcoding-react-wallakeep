import React from 'react';
import { shallow } from 'enzyme';

import Profile from './Profile';

describe('Profile', () => {
  const props = {
    session: {
      name: 'name',
      surname: 'surname',
      maxAdverts: 4,
      apiUrl: 'apiUrl',
    },
    saveSession: jest.fn(),
    enqueueSnackbar: jest.fn(),
    userLogout: jest.fn(),
  };

  const wrapper = shallow(<Profile {...props} />);

  it('should render a Profile component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('saving profile', () => {
    const preventDefault = jest.fn();
    wrapper.find('form').simulate('submit', { preventDefault });

    it('should prevent default form submission', () => {
      expect(preventDefault).toHaveBeenCalled();
    });

    it('should save session', () => {
      expect(props.saveSession).toHaveBeenCalledWith(
        expect.objectContaining(props.session),
        true,
      );
    });

    it('should launch a succesfull snackBar', () => {
      expect(props.enqueueSnackbar).toHaveBeenCalledWith(
        expect.stringContaining('actualizado correctamente'),
        expect.objectContaining({ variant: 'success' }),
      );
    });

    it('should launch an error snackBar if name is empty', () => {
      props.enqueueSnackbar.mockClear();
      wrapper.setState({ name: '' });
      wrapper.find('form').simulate('submit', { preventDefault });
      expect(props.enqueueSnackbar).toHaveBeenCalledWith(
        expect.stringContaining('Rellene'),
        expect.objectContaining({ variant: 'error' }),
      );
    });
  });

  describe('deleting profile', () => {
    wrapper
      .find('.Profile__Footer')
      .childAt(1)
      .simulate('click');

    it('should logout user', () => {
      expect(props.userLogout).toHaveBeenCalled();
    });
  });
});
