import React from 'react';
import * as AuthActions from '../../actions/AuthActions';
import { toast } from 'react-toastify';

class Logout extends React.Component {

    componentDidMount() {
        toast.success("You have logged out!");
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