import React from 'react';
import {Form, Button, Input, Segment, Container} from 'semantic-ui-react';

class Registration extends React.Component {
    render() {
        return (
            <Container>
                <Segment>
                    <Form>
                        <Form.Field>
                            <label>First name</label>
                            <Input icon={"user"} iconPosition={"left"} placeholder={"First name"}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Last name</label>
                            <Input icon={"user"} iconPosition={"left"} placeholder={"Last name"}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Email</label>
                            <Input icon={"mail"} iconPosition={"left"} placeholder={"Email"} type={"email"}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Phone number</label>
                            <Input icon={"phone"} iconPosition={"left"} placeholder={"Phone number"} type={"tel"}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <Input icon={"lock"} iconPosition={"left"} placeholder={"Password"} type={"password"}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Password repeat</label>
                            <Input icon={"lock"} iconPosition={"left"} placeholder={"Password repeat"}
                                   type={"password"}/>
                        </Form.Field>
                        <Button type={"submit"}>SignUp</Button>
                    </Form>
                </Segment>
            </Container>
        );
    }
}

export default Registration