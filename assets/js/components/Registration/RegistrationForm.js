import React from 'react';
import TextInput from '../Input/TextInput.js';
import { Button, Form } from 'semantic-ui-react';
import AuthStore from '../../stores/AuthStore';
import { Formik } from 'formik';
import Yup from 'yup';
import {withRouter} from 'react-router-dom';
import * as AuthActions from '../../actions/AuthActions';
import * as AuthConstants from '../../constants/AuthConstants';
import AuthHelper from '../../helpers/AuthHelper';

class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: {
                email: ''
            },
            userCredentials: {
                _username: '',
                _password: ''
            }
        };

        this.handleUserRegisterSuccess = this.handleUserRegisterSuccess.bind(this);
        this.handleUserRegisterFailed = this.handleUserRegisterFailed.bind(this);
        this.handleLoginSuccess = this.handleLoginSuccess.bind(this);
        this.handleLoginFailed = this.handleLoginFailed.bind(this);
    }

    componentWillMount() {
        AuthStore.on(AuthConstants.USER_REGISTER_SUCCESS, this.handleUserRegisterSuccess);
        AuthStore.on(AuthConstants.USER_REGISTER_FAILED, this.handleUserRegisterFailed);
        AuthStore.on(AuthConstants.USER_LOGIN_SUCCESS, this.handleLoginSuccess);
        AuthStore.on(AuthConstants.USER_LOGIN_FAILED, this.handleLoginFailed);
    }

    componentWillUnmount() {
        AuthStore.removeListener(AuthConstants.USER_REGISTER_SUCCESS, this.handleUserRegisterSuccess);
        AuthStore.removeListener(AuthConstants.USER_REGISTER_FAILED, this.handleUserRegisterFailed);
        AuthStore.removeListener(AuthConstants.USER_LOGIN_SUCCESS, this.handleLoginSuccess);
        AuthStore.removeListener(AuthConstants.USER_LOGIN_FAILED, this.handleLoginFailed);
    }

    handleUserRegisterSuccess() {
        AuthActions.userLogin(this.state.userCredentials);
    }

    handleUserRegisterFailed(error) {
        this.setState({
            error: error
        });
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
                    firstname: '',
                    lastname: '',
                    email: '',
                    phone_number: '',
                    password: '',
                    password_repeat: '',
                }}

                onSubmit={(values, { setSubmitting }) => {
                    this.setState({
                        userCredentials: {
                            _username: values.email,
                            _password: values.password
                        }
                    });
                    AuthActions.userRegister({register_user: values});
                    setSubmitting(false);
                }}

                validationSchema={Yup.object().shape({
                    firstname: Yup.string().required('First name is required'),
                    lastname: Yup.string().required('Last name is required'),
                    email: Yup.string().email('Email must be a valid email').required('Email is required'),
                    phone_number: Yup.number().positive(),
                    password: Yup.string().min(9, 'Password must be at lest 9 characters long').required('Password is required'),
                    password_repeat: Yup.string().required('Password repeat is required').oneOf([Yup.ref('password'), null], 'Passwords don\'t match'),
                })}

                render={({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                    <Form onSubmit={handleSubmit}>
                        <TextInput type={"text"} name={"firstname"} touched={touched.firstname} errors={errors.firstname} label={"First name"} />
                        <TextInput type={"text"} name={"lastname"} touched={touched.lastname} errors={errors.lastname} label={"Last name"} />
                        <TextInput type={"email"} name={"email"} touched={touched.email} errors={errors.email} label={"Email"} />
                        <TextInput type={"text"} name={"phone_number"} touched={touched.phone_number} errors={errors.phone_number} label={"Phone number"} />
                        <TextInput type={"password"} name={"password"} touched={touched.password} errors={errors.password} label={"Password"} />
                        <TextInput type={"password"} name={"password_repeat"} touched={touched.password_repeat} errors={errors.password_repeat} label={"Password repeat"} />
                        <Button type={"submit"} disabled={isSubmitting} primary>SignUp</Button>
                    </Form>
                )}
            />
        );
    }
}

export default withRouter(RegistrationForm)