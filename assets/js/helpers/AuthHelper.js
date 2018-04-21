import * as AuthConstants from '../constants/AuthConstants';
import jwt_decode from 'jwt-decode';

//TODO: create functions for decoding token and getting user credentials
class AuthHelper {

    clear(key) {
        if (localStorage && localStorage.getItem(key)) {
            return localStorage.removeItem(key);
        }

        return null;
    }

    set(value, key) {
        if (!value) {
            return null;
        }

        return localStorage.setItem(key, JSON.stringify(value));
    }

    get(key) {
        if (localStorage.getItem(key)) {
            return JSON.parse(localStorage.getItem(key));
        }

        return null;
    }

    clearToken() {
        return this.clear(AuthConstants.TOKEN_KEY);
    }

    clearCredentials() {
        return this.clear(AuthConstants.USER_INFO_KEY);
    }

    setToken(jwtToken) {
        return this.set(jwtToken, AuthConstants.TOKEN_KEY);
    }

    setCredentials(data) {
        return this.set(data, AuthConstants.USER_INFO_KEY);
    }

    getToken() {
        return this.get(AuthConstants.TOKEN_KEY);
    }

    getCredentials() {
        return this.get(AuthConstants.USER_INFO_KEY);
    }

    isLoggedIn() {
        if(this.getToken() !== null) {
            // TODO: check if token expired
            // TODO: refresh token and save it
        }

        return false;
    }


}

const authHelper = new AuthHelper();
export default authHelper;