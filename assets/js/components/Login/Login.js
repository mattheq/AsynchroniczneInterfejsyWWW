import React from 'react';
import {Segment, Container} from 'semantic-ui-react';
import LoginForm from './LoginForm';

class Login extends React.Component {

    render() {
        return (
            <Container className="ui grid centered">
                <Segment className="four wide column">
                    <LoginForm />
                </Segment>
            </Container>
        );
    }
}

export default Login