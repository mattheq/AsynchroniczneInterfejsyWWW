import React from 'react';
import ReactDOM from 'react-dom';
import {Route, HashRouter, Redirect} from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';

import BaseLayout from './components/Layout/BaseLayout';
import HomePage from './components/HomePage/HomePage';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import Registration from './components/Registration/Registration';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import AuthHelper from './helpers/AuthHelper';

const root = document.getElementById('root');

ReactDOM.render(
    <HashRouter>
        <div>
            <Route path="/" component={BaseLayout}/>
            <Route exact path="/" component={HomePage}/>
            <PrivateRoute path="/logout" component={Logout}/>
            <Route path="/login" render={() => (
                AuthHelper.isLoggedIn() ? (
                    <Redirect to="/" />
                ) : (
                    <Login />
                )
            )}/>
            <Route path="/signup" render={() => (
                AuthHelper.isLoggedIn() ? (
                    <Redirect to="/" />
                ) : (
                    <Registration />
                )
            )}/>
        </div>
    </HashRouter>,
    root);