import React from 'react';
import TextInput from '../Input/TextInput.js';
import { Button, Form } from 'semantic-ui-react';
import AuthStore from '../../stores/AuthStore';
import { Formik } from 'formik';
import Yup from 'yup';
import * as AuthActions from '../../actions/AuthActions';
import * as AuthConstants from '../../constants/AuthConstants';
import AuthHelper from '../../helpers/AuthHelper';
import {withRouter} from 'react-router-dom';

class LoginForm extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            error: ''
        };

        this.handleLoginSuccess = this.handleLoginSuccess.bind(this);
        this.handleLoginFailed = this.handleLoginFailed.bind(this);
    }

    componentWillMount() {
        AuthStore.on(AuthConstants.USER_LOGIN_SUCCESS, this.handleLoginSuccess);
        AuthStore.on(AuthConstants.USER_LOGIN_FAILED, this.handleLoginFailed);
    }

    componentWillUnmount() {
        AuthStore.removeListener(AuthConstants.USER_LOGIN_SUCCESS, this.handleLoginSuccess);
        AuthStore.removeListener(AuthConstants.USER_LOGIN_FAILED, this.handleLoginFailed);
    }

    handleLoginSuccess(data) {
        AuthHelper.setToken(data.jwtToken);
        AuthHelper.setRefreshToken(data.refreshToken);
        this.props.history.push(this.props.location.pathname);
    }

    handleLoginFailed(error) {
        this.setState({
            error: error
        });
    }

    render() {
        return (
            <Formik
                initialValues={{
                    _username: '',
                    _password: '',
                }}

                onSubmit={(values, { setSubmitting }) => {
                    AuthActions.userLogin(values);
                    setSubmitting(false);
                }}

                validationSchema={Yup.object().shape({
                    _username: Yup.string().required('Email is required').email('Email must be a valid email'),
                    _password: Yup.string().required('Password is required').min(9, 'Password must be at lest 9 characters long')
                })}

                render={({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
                    <Form onSubmit={handleSubmit}>
                        <TextInput type={"email"} name={"_username"} touched={touched._username} errors={errors._username} label={"Email"} />
                        <TextInput type={"password"} name={"_password"} touched={touched._password} errors={errors._password} label={"Password"} />
                        {this.state.error ? (
                            <div className="ui negative message">
                                <div className="header">
                                    {this.state.error}
                                </div>
                            </div>
                        ) : '' }
                        <Button type={"submit"} disabled={isSubmitting} primary>Login</Button>
                    </Form>
                )}
            />
        )
    }
}

export default withRouter(LoginForm);