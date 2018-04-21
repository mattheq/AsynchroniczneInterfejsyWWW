import React from 'react';
import * as AuthActions from '../../actions/AuthActions';

class Logout extends React.Component {

    componentDidMount() {
        AuthActions.userLogout();
        this.props.history.push('/');
    }

    render() {
        return (
            <h1>
                Logging out...
            </h1>
        )
    }
}

export default Logout;