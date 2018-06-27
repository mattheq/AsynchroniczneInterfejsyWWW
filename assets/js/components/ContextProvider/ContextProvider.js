import React from 'react';
import AuthHelper from "../../helpers/AuthHelper";
import {Context} from "../Context/Context";

class ContextProvider extends React.Component {

    state = {
        isChatOpen: false,
        disableChat: () => {console.log('context func')}
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