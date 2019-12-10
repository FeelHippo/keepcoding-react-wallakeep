import React from 'react';
import ReactDOM from 'react-dom';

import Root from './components/Root';
import LocalStorage from './utils/Storage';
import Session from './models/Session';
import { configureStore } from './store';

// generamos un objeto session (de localStorage o nuevo)
const session = LocalStorage.readLocalStorage() || new Session();

// configuramos un store, pasando los datos de la sesion como estado inicial
const store = configureStore({ session });

// cuando haya un cambio en el store, sincronizamos localStorage
store.subscribe(() => {
  const { session } = store.getState();
  if (!session.name) {
    LocalStorage.clearLocalStorage();
  } else {
    LocalStorage.saveLocalStorage(session);
  }
});

ReactDOM.render(<Root store={store} />, document.getElementById('root'));
