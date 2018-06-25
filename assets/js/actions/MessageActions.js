import dispatcher from '../dispatcher';
import * as MessageConstants from '../constants/MessageConstants';

export function receiveMessage(data) {
    dispatcher.dispatch({
        type: MessageConstants.MESSAGE_RECEIVED,
        data,
    });
}

export function fetchMessages(data) {
    dispatcher.dispatch({
        type: MessageConstants.MESSAGE_FETCH,
        data,
    });
}