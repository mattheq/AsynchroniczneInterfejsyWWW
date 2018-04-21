import * as AuthConstants from '../constants/AuthConstants';
import * as AuthActions from '../actions/AuthActions';
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

    clearRefreshToken() {
        return this.clear(AuthConstants.REFRESH_TOKEN_KEY);
    }

    clearCredentials() {
        return this.clear(AuthConstants.USER_INFO_KEY);
    }

    setToken(jwtToken) {
        return this.set(jwtToken, AuthConstants.TOKEN_KEY);
    }

    setRefreshToken(refreshToken) {
        return this.set(refreshToken, AuthConstants.REFRESH_TOKEN_KEY);
    }

    setCredentials(data) {
        return this.set(data, AuthConstants.USER_INFO_KEY);
    }

    getToken() {
        return this.get(AuthConstants.TOKEN_KEY);
    }

    getRefreshToken() {
        return this.get(AuthConstants.REFRESH_TOKEN_KEY);
    }

    getCredentials() {
        return this.get(AuthConstants.USER_INFO_KEY);
    }

    logoutUser() {
        this.clearToken();
        this.clearRefreshToken();
        this.clearCredentials();
    }

    isLoggedIn() {
        if(this.getToken() !== null && this.getRefreshToken() !== null) {
            let token = jwt_decode(this.getToken());
            if (this.checkIfTokenExpired(token.exp)) {
                AuthActions.userRefreshToken({refresh_token: this.getRefreshToken()});
            }

            return true;
        }

        return false;
    }

    checkIfTokenExpired(exp) {
        let currentTime = new Date().getTime() / 1000;
        return currentTime > exp;
    }


}

const authHelper = new AuthHelper();
export default authHelper;