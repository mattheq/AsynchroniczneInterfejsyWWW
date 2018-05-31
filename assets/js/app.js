import React from 'react';
import ReactDOM from 'react-dom';
import {Route, HashRouter, Redirect} from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import '../css/custom.css';

import Footer from './components/Layout/Footer';
import HomePage from './components/HomePage/HomePage';
import ItemForm from './components/Item/ItemForm';
import ItemList from './components/Item/ItemList';
import ItemView from './components/Item/ItemView';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import Registration from './components/Registration/Registration';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import AuthHelper from './helpers/AuthHelper';
import Navbar from "./components/Layout/Navbar";

const root = document.getElementById('root');

ReactDOM.render(
    <HashRouter>
        <div>
            <Route path="/" component={Navbar} />
            <Route exact path="/" component={HomePage}/>
            <Route path="/items/view/:id" component={ItemView} />
            <Route path="/items/add" component={ItemForm} />
            <Route exact path="/items" component={ItemList}/>
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
            <Route path="/" component={Footer} />
        </div>
    </HashRouter>,
    root);