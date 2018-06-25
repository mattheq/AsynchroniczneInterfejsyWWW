import React from 'react';
import AuthHelper from "../../helpers/AuthHelper";
import {Context} from "../Context/Context";

class ContextProvider extends React.Component {

    state = {
        conn: AuthHelper.isLoggedIn() ? new WebSocket('ws://localhost:8080?user_id=' + AuthHelper.getCredentials().user_id) : null
    };

    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        );
    }
}

export default ContextProvider;