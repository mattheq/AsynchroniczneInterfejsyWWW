import React from 'react';
import {Form, Button, Input, Segment, Container} from 'semantic-ui-react';
import axios from 'axios';
import qs from 'qs';

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            register_user: {
                firstname: '',
                lastname: '',
                email: '',
                phone_number: '',
                password: '',
                password_repeat: ''
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        axios.post('/api/v1/auth/register', qs.stringify(this.state), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    }

    handleChange(event) {
        this.setState({register_user: {
                ...this.state.register_user,
                [event.target.name]: event.target.value
            }
        });
    }

    render() {
        return (
            <Container>
                <Segment>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field required>
                            <label>First name</label>
                            <Input icon={"user"} iconPosition={"left"} placeholder={"First name"} name={"firstname"} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field required>
                            <label>Last name</label>
                            <Input icon={"user"} iconPosition={"left"} placeholder={"Last name"} name={"lastname"} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field required>
                            <label>Email</label>
                            <Input icon={"mail"} iconPosition={"left"} placeholder={"Email"} type={"email"} name={"email"} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Phone number</label>
                            <Input icon={"phone"} iconPosition={"left"} placeholder={"Phone number"} type={"tel"} name={"phone_number"} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field required>
                            <label>Password</label>
                            <Input icon={"lock"} iconPosition={"left"} placeholder={"Password"} type={"password"} name={"password"} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field required>
                            <label>Password repeat</label>
                            <Input icon={"lock"} iconPosition={"left"} placeholder={"Password repeat"} type={"password"} name={"password_repeat"} onChange={this.handleChange}/>
                        </Form.Field>
                        <Button type={"submit"}>SignUp</Button>
                    </Form>
                </Segment>
            </Container>
        );
    }
}

export default Registration