import React from 'react';
import {Route, HashRouter, Redirect} from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import './../../../css/custom.css';

import Footer from '../Layout/Footer';
import HomePage from '../HomePage/HomePage';
import ItemForm from '../Item/ItemForm';
import ItemList from '../Item/ItemList';
import ItemView from '../Item/ItemView';
import Login from '../Login/Login';
import Logout from '../Logout/Logout';
import Registration from '../Registration/Registration';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import AuthHelper from '../../helpers/AuthHelper';
import Navbar from "../Layout/Navbar";

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
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
            </HashRouter>
        )
    }
}

export default App;