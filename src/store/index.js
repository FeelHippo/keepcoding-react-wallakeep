import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import * as reducers from './reducers';

const configureMiddleware = config => {
  const middlewares = [thunkMiddleware.withExtraArgument(config)];
  if (process.env.NODE_ENV === 'development') {
    middlewares.push(loggerMiddleware);
  }
  return middlewares;
};

export const configureStore = config => preloadedState => {
  const rootReducer = combineReducers(reducers);
  const middlewares = configureMiddleware(config);
  const composeEnhancers = composeWithDevTools;

  return createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(...middlewares)),
  );
};
