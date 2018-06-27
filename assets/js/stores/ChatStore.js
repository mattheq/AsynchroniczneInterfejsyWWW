import { EventEmitter } from 'events';
import dispatcher from "../dispatcher";
import * as ChatConstants from "../constants/ChatConstants";

class ChatStore extends EventEmitter {

    handleActions(action) {
        switch (action.type) {
            case ChatConstants.HIDE_VIEW_ITEM_CHAT: {
                this.emit(ChatConstants.HOME_CHAT_RENDERED);
                break;
            }

            case ChatConstants.HIDE_HOME_CHAT: {
                this.emit(ChatConstants.VIEW_ITEM_CHAT_RENDERED);
                break;
            }
        }
    }
}

const chatStore = new ChatStore();
dispatcher.register(chatStore.handleActions.bind(chatStore));

export default chatStore;