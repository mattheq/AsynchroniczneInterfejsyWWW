import dispatcher from '../dispatcher';
import * as ChatConstants from '../constants/ChatConstants';

export function hideHomeChat() {
    dispatcher.dispatch({
        type: ChatConstants.HIDE_HOME_CHAT
    });
}

export function hideViewItemChat() {
    dispatcher.dispatch({
        type: ChatConstants.HIDE_VIEW_ITEM_CHAT
    });
}