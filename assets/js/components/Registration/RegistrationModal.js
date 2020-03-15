import React from 'react';
import {Modal, Button} from 'semantic-ui-react';
import RegistrationForm from './RegistrationForm';
import * as AuthConstants from "../../constants/AuthConstants";
import AuthStore from "../../stores/AuthStore";

class RegistrationModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };

        this.handleUserRegisterSuccess = this.handleUserRegisterSuccess.bind(this);
    }

    componentWillMount() {
        AuthStore.on(AuthConstants.USER_LOGIN_SUCCESS, this.handleUserRegisterSuccess);
    }

    componentWillUnmount() {
        AuthStore.removeListener(AuthConstants.USER_LOGIN_SUCCESS, this.handleUserRegisterSuccess);
    }

    handleUserRegisterSuccess() {
        this.setState({
            open: false
        })
    }

    render() {
        return (
            <Modal trigger={<Button onClick={()=>this.setState({open: true})}>SignUp</Button>} onClose={()=>this.setState({open: false})} open={this.state.open} closeOnEscape={true} closeOnRootNodeClick={true} size='mini' className="scrolling">
                <Modal.Header>SignUp</Modal.Header>
                <Modal.Content>
                    <RegistrationForm />
                </Modal.Content>
            </Modal>
        )
    }
}

export default RegistrationModal;