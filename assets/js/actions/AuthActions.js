import dispatcher from '../dispatcher';
import * as AuthConstants from '../constants/AuthConstants';

export function userLogin(data) {
    dispatcher.dispatch({
        type: AuthConstants.USER_LOGIN,
        data,
    });
}

export function userRegister(data) {
    dispatcher.dispatch({
        type: AuthConstants.USER_REGISTER,
        data,
    });
}

export function userRefreshToken(data) {
    dispatcher.dispatch({
        type: AuthConstants.USER_REFRESH_TOKEN,
        data,
    });
}

export function userLogout() {
    dispatcher.dispatch({
        type: AuthConstants.USER_LOGOUT,
    })
}