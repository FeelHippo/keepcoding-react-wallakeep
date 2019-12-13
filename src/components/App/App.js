import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ErrorBoundary from '../ErrorBoundary';
import PrivateRoute from '../PrivateRoute';
import Profile from '../Profile';
import AdvertEdit from '../AdvertEdit';
import AdvertDetail from '../AdvertDetail';
import Register from '../Register';
import Home from '../Home';
import Error404 from '../Error404';

const App = () => (
  <ErrorBoundary>
    <Switch>
      <Route path="/register" exact component={Register} />
      <PrivateRoute path="/profile" exact component={Profile} />
      <PrivateRoute path="/advert/create" exact component={AdvertEdit} />
      <PrivateRoute path="/advert/:id/edit" exact component={AdvertEdit} />
      <PrivateRoute path="/advert/:id" exact component={AdvertDetail} />
      <PrivateRoute path="/" exact component={Home} />
      <PrivateRoute component={Error404} />
    </Switch>
  </ErrorBoundary>
);

export default App;
