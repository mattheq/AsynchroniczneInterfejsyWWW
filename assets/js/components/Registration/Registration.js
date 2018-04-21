import React from 'react';
import {Segment, Container} from 'semantic-ui-react';
import RegistrationForm from './RegistrationForm';

class Registration extends React.Component {

    render() {
        return (
            <Container className="ui grid centered">
                <Segment className="four wide column">
                    <RegistrationForm />
                </Segment>
            </Container>
        );
    }
}

export default Registration