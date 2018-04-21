import React from 'react';
import { Button, Segment, Container, Form } from 'semantic-ui-react';
import AuthStore from '../../stores/AuthStore';
import { Formik, Field } from 'formik';
import Yup from 'yup';
import * as AuthActions from '../../actions/AuthActions';
import * as AuthConstants from '../../constants/AuthConstants';

class Registration extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: {
                email: ''
            }
        };

        this.handleUserRegisterSuccess = this.handleUserRegisterSuccess.bind(this);
        this.handleUserRegisterFailed = this.handleUserRegisterFailed.bind(this);
    }

    componentWillMount() {
        AuthStore.on(AuthConstants.USER_REGISTER_SUCCESS, this.handleUserRegisterSuccess);
        AuthStore.on(AuthConstants.USER_REGISTER_FAILED, this.handleUserRegisterFailed);
    }

    componentWillUnmount() {
        AuthStore.removeListener(AuthConstants.USER_REGISTER_SUCCESS, this.handleUserRegisterSuccess);
        AuthStore.removeListener(AuthConstants.USER_REGISTER_FAILED, this.handleUserRegisterFailed);
    }

    handleUserRegisterSuccess() {
        this.props.history.push("/login");
    }

    handleUserRegisterFailed(error) {
        this.setState({
            error: error
        });
    }

    render() {
        return (
            <Container className="ui grid centered">
                <Segment className="four wide column">
                    <Formik
                        initialValues={{
                            firstname: 'a',
                            lastname: 'a',
                            email: 'a@a.pl',
                            phone_number: '123456789',
                            password: '123456789',
                            password_repeat: '123456789',
                        }}

                        onSubmit={(values, { setSubmitting }) => {
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
                                <div className={"field " + (touched.firstname && errors.firstname && "error")}>
                                    <label>First name</label>
                                    <Field type="text" name="firstname" />
                                    {touched.firstname && errors.firstname && <div className="ui basic red pointing prompt label">{errors.firstname}</div>}
                                </div>
                                <div className={"field " + (touched.lastname && errors.lastname && "error")}>
                                    <label>Last name</label>
                                    <Field type="text" name="lastname" />
                                    {touched.lastname && errors.lastname && <div className="ui basic red pointing prompt label">{errors.lastname}</div>}
                                </div>
                                <div className={"field " + (touched.email && (errors.email || this.state.error.email) && "error")}>
                                    <label>Email</label>
                                    <Field type="email" name="email" />
                                    {(touched.email && errors.email && <div className="ui basic red pointing prompt label">{errors.email}</div>) || (this.state.error.email && <div className="ui basic red pointing prompt label">{this.state.error.email[0]}</div>)}
                                </div>
                                <div className={"field " + (errors.phone_number && "error")}>
                                    <label>Phone number</label>
                                    <Field type="text" name="phone_number" />
                                    {errors.phone_number && <div className="ui basic red pointing prompt label">{errors.phone_number}</div>}
                                </div>
                                <div className={"field " + (touched.password && errors.password && "error")}>
                                    <label>Password</label>
                                    <Field type="password" name="password" />
                                    {touched.password && errors.password && <div className="ui basic red pointing prompt label">{errors.password}</div>}
                                </div>
                                <div className={"field " + (touched.password_repeat && errors.password_repeat && "error")}>
                                    <label>Password repeat</label>
                                    <Field type="password" name="password_repeat" />
                                    {touched.password_repeat && errors.password_repeat && <div className="ui basic red pointing prompt label">{errors.password_repeat}</div>}
                                </div>
                                <Button type={"submit"} disabled={isSubmitting}>SignUp</Button>
                            </Form>
                        )}
                    />
                </Segment>
            </Container>
        );
    }
}

export default Registration