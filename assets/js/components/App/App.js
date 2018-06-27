import React from 'react';
import {Route, HashRouter, Redirect} from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import './../../../css/custom.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-image-gallery/styles/css/image-gallery.css';

import Footer from '../Layout/Footer';
import HomePage from '../HomePage/HomePage';
import ItemForm from '../Item/ItemForm';
import ItemUpdateForm from '../Item/ItemUpdateForm';
import ItemList from '../Item/ItemList';
import ItemView from '../Item/ItemView';
import Login from '../Login/Login';
import Logout from '../Logout/Logout';
import Registration from '../Registration/Registration';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import AuthHelper from '../../helpers/AuthHelper';
import Navbar from "../Layout/Navbar";
import ContextProvider from "../ContextProvider/ContextProvider";

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ContextProvider>
                <HashRouter>
                    <div>
                        <Route path="/" component={Navbar} />
                        <Route exact path="/" component={HomePage}/>
                        <Route path="/items/view/:id" component={ItemView} />
                        <PrivateRoute path="/items/update/:id" component={ItemUpdateForm}/>
                        <PrivateRoute path="/items/add" component={ItemForm} />
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
            </ContextProvider>
        )
    }
}

export default App;