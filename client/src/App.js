import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Components/layout/Navbar';
import Home from './Components/pages/Home';
import About from './Components/pages/About';
import Contactstate from './Components/contact/ContactState';
import AuthState from '../src/Components/context/Auth/AuthState';
import register from './Components/AuthForm/Register';
import login from './Components/AuthForm/Login';
import AlertState from './Components/context/alert/AlertState';
import Alert from './Components/layout/Alerts';

import './App.css';

const App = () => {
  return (
    <AuthState>
      <Contactstate>
        <AlertState>F
          <Router>
            <Fragment className='App'>
              <Navbar />
              <div className='container'>
                <Alert />
                <Switch>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/register' component={register} />
                  <Route exact path='/login' component={login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </Contactstate>
    </AuthState>
  );
};

export default App;
