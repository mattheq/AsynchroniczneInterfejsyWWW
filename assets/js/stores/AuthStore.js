import { EventEmitter } from 'events';
import axios from 'axios';
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
        // TODO: make react login user
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
        }
    }
}

const authStore = new AuthStore();
dispatcher.register(authStore.handleActions.bind(authStore));

export default authStore;