import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';

import Root from './components/Root';
import LocalStorage from './utils/Storage';
import { configureStore } from './store';
import { getSession, isUserRegistered } from './store/selectors';

// histórico del browser
const history = createBrowserHistory();

// cargamos la session que hubiese en localStorage
const session = LocalStorage.readLocalStorage() || undefined;

// configuramos un store, pasando los datos de la sesion como estado inicial
const store = configureStore({ history })({ session });

// cuando haya un cambio en el store, sincronizamos localStorage
store.subscribe(() => {
  const state = store.getState();
  if (isUserRegistered(state)) {
    LocalStorage.saveLocalStorage(getSession(state));
  } else {
    LocalStorage.clearLocalStorage();
  }
});

ReactDOM.render(
  <Root store={store} history={history} />,
  document.getElementById('root'),
);
