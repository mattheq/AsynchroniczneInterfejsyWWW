import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import AuthHelper from '../../helpers/AuthHelper';
//TODO: replace getToken() with isLoggedIn()
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            AuthHelper.getToken() !== null ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location },
                    }}
                />
            )
        }
    />
);

export default PrivateRoute;