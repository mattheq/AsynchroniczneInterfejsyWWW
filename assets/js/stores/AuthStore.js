import { EventEmitter } from 'events';
import axios from 'axios';
import AuthHelper from '../helpers/AuthHelper';
import dispatcher from "../dispatcher";
import qs from "qs";
import * as AuthConstants from "../constants/AuthConstants";

class AuthStore extends EventEmitter {

    registerUser(data) {
        axios.post('/api/v1/auth/register', qs.stringify(data), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).then((response) => {
            this.emit(AuthConstants.USER_REGISTER_SUCCESS);
        }).catch((error) => {
            this.emit(AuthConstants.USER_REGISTER_FAILED, error.response.data.error);
        });
    }

    loginUser(data) {
        axios.post('/api/v1/auth/login_check', qs.stringify(data), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            if (response.data.token && response.data.refresh_token) {
                this.emit(AuthConstants.USER_LOGIN_SUCCESS, {jwtToken: response.data.token, refreshToken: response.data.refresh_token});
            } else {
                this.emit(AuthConstants.USER_LOGIN_FAILED, 'Something went wrong, please try again.');
            }
        }).catch((error) => {
            this.emit(AuthConstants.USER_LOGIN_FAILED, error.response.data.message);
        });
    }

    logoutUser() {
        AuthHelper.logoutUser();
    }

    refreshToken(refresh_token) {
        axios.post('/api/v1/auth/refresh', qs.stringify(refresh_token), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            if (response.data.token && !AuthHelper.checkIfTokenExpired(response.data.token)) {
                AuthHelper.setToken(response.data.token);
            } else {
                AuthHelper.logoutUser();
            }
        }).catch((error) => {
            AuthHelper.logoutUser();
        });
    }

    handleActions(action) {
        switch (action.type) {
            case AuthConstants.USER_REGISTER: {
                this.registerUser(action.data);
                break;
            }

            case AuthConstants.USER_LOGIN: {
                this.loginUser(action.data);
                break;
            }

            case AuthConstants.USER_REFRESH_TOKEN: {
                this.refreshToken(action.data);
                break;
            }

            case AuthConstants.USER_LOGOUT: {
                this.logoutUser();
                break;
            }
        }
    }
}

const authStore = new AuthStore();
dispatcher.register(authStore.handleActions.bind(authStore));

export default authStore;