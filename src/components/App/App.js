/* NPM modules */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
/* Material UI */
/* Own modules */
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { UserProvider } from '../../context/UserContext';
import AdvertDetail from '../AdvertDetail/AdvertDetail';
import AdvertEdit from '../AdvertEdit/AdvertEdit';
import LocalStorage from '../../utils/Storage';
import Error404 from '../Error404/Error404';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Home from '../Home/Home';
import Session from '../../models/Session';
/* Assets */
/* CSS */

/**
 * Main App
 */
export default class App extends Component {
  
  /**
   * Constructor
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    // Intento recuperar la sesión del storage
    let user = LocalStorage.readLocalStorage();
    if (!user) {
      // Si no hay nada en el local storage, creo un objeto sesión vacio correcto
      user = new Session ();
    }
    this.state = {
      session: user
    }
  }

  /**
   * Render
   */
  render() {   
    return (
      <ErrorBoundary>
        <UserProvider value={this.state}>
            <Router>
              <Switch>
                  <Route path='/register' exact component={Register} />
                  <Route path='/profile' exact component={Profile} />
                  <Route path='/advert/display/:id' exact component={AdvertDetail} />
                  <Route path='/advert/create' exact render={(props) => <AdvertEdit {...props} mode='create'/>}/>
                  <Route path='/advert/edit/:id' exact render={(props) => <AdvertEdit {...props} mode='edit'/>}/>
                  <Route path='/' exact component={Home} />
                  <Route component={Error404} />
              </Switch>
            </Router>
        </UserProvider>
      </ErrorBoundary>
    );
  }
}