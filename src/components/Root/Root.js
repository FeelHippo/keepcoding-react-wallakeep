import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import App from '../App';
import '../../index.css';

const Root = ({ store, ...props }) => (
  <Provider store={store}>
    <Router>
      <SnackbarProvider maxSnack={2}>
        <App {...props} />
      </SnackbarProvider>
    </Router>
  </Provider>
);

export default Root;
