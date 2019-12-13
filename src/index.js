import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';

import Root from './components/Root';
import LocalStorage from './utils/Storage';
import NodepopAPI from './services/NodepopAPI';
import { configureStore } from './store';
import * as types from './store/types';
import { loadTags } from './store/actions';

// funcion render de la applicacion
const renderApp = props =>
  ReactDOM.render(<Root {...props} />, document.getElementById('root'));

// histórico del browser
const history = createBrowserHistory();

// cargamos la session que hubiese en localStorage
const session = LocalStorage.readLocalStorage() || undefined;

// configuramos un store, pasando los datos de la sesion como estado inicial
const store = configureStore({
  history,
  services: { NodepopAPI },
})({
  session,
});

// cuando haya un cambio en el store, sincronizamos localStorage
store.subscribe(() => {
  const { lastAction, session } = store.getState();
  if (lastAction.type === types.SESSION_SAVE && lastAction.remember) {
    LocalStorage.saveLocalStorage(session);
  }

  if (lastAction.type === types.SESSION_CLEAR) {
    LocalStorage.clearLocalStorage();
  }

  // cuando tengamos las tags en el store, renderizamos la app
  if (lastAction.type === types.TAGS_LOAD_SUCCESFULL) {
    renderApp({ store, history });
  }
});

// lanzamos una accion inicial para cargar las tags
store.dispatch(loadTags());
