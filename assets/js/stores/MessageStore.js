import { EventEmitter } from 'events';
import axios from 'axios';
import AuthHelper from '../helpers/AuthHelper';
import dispatcher from "../dispatcher";
import qs from "qs";
import * as MessageConstants from "../constants/MessageConstants";
import * as ItemConstants from "../constants/ItemConstants";

class MessageStore extends EventEmitter {

    handleReceivedMessage(text) {
        this.emit(MessageConstants.MESSAGE_RECEIVED_SUCCESS, text);
    }

    fetchMessages(user_id) {
        axios.get(`/api/v1/messages/conversation/${user_id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + AuthHelper.getToken()
            }
        }).then((response) => {
            this.emit(MessageConstants.MESSAGE_FETCH_SUCCESS, response.data);
        }).catch((error) => {
            console.log(error);
            this.emit(MessageConstants.MESSAGE_FETCH_FAILED, error.response);
        });
    }

    handleActions(action) {
        switch (action.type) {
            case MessageConstants.MESSAGE_RECEIVED: {
                this.handleReceivedMessage(action.data);
                break;
            }

            case MessageConstants.MESSAGE_FETCH: {
                this.fetchMessages(action.data);
                break;
            }
        }
    }
}

const messageStore = new MessageStore();
dispatcher.register(messageStore.handleActions.bind(messageStore));

export default messageStore;