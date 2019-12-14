import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

describe('App', () => {
  const render = () => shallow(<App />);

  it('should render a App component', () => {
    const wrapper = render();
    expect(wrapper).toMatchSnapshot();
  });
});
