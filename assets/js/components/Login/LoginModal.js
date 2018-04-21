import React from 'react';
import {Modal, Button} from 'semantic-ui-react';
import LoginForm from './LoginForm';

class LoginModal extends React.Component {

    render() {
        return (
            <Modal trigger={<Button>Login</Button>} size='mini'>
                <Modal.Header>Login</Modal.Header>
                <Modal.Content>
                    <LoginForm />
                </Modal.Content>
            </Modal>
        )
    }
}

export default LoginModal;