import React from 'react';
import {Modal, Button} from 'semantic-ui-react';
import RegistrationForm from './RegistrationForm';

class RegistrationModal extends React.Component {

    render() {
        return (
            <Modal trigger={<Button>SignUp</Button>} size='mini' className="scrolling">
                <Modal.Header>SignUp</Modal.Header>
                <Modal.Content>
                    <RegistrationForm />
                </Modal.Content>
            </Modal>
        )
    }
}

export default RegistrationModal;