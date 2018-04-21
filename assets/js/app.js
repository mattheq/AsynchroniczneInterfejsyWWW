import React from 'react';
import ReactDOM from 'react-dom';
import {Route, HashRouter} from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';

import BaseLayout from './components/Layout/BaseLayout';
import HomePage from './components/HomePage/HomePage';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import AuthHelper from './helpers/AuthHelper';

const root = document.getElementById('root');

// TODO: do not display login/signup if user is authenticated
ReactDOM.render(
    <HashRouter>
        <div>
            <Route path="/" component={BaseLayout}/>
            <Route exact path="/" component={HomePage}/>
            <Route path="/login" component={Login}/>
            <Route path="/signup" component={Registration}/>
        </div>
    </HashRouter>,
    root);