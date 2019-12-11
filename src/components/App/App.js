import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import PrivateRoute from '../PrivateRoute';
import Profile from '../Profile/Profile';
import AdvertEdit from '../AdvertEdit/AdvertEdit';
import AdvertDetail from '../AdvertDetail/AdvertDetail';
import Register from '../Register';
import Home from '../Home/Home';
import Error404 from '../Error404/Error404';

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
