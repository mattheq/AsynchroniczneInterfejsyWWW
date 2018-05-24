import { EventEmitter } from 'events';
import axios from 'axios';
import AuthHelper from '../helpers/AuthHelper';
import dispatcher from "../dispatcher";
import qs from "qs";
import * as ItemConstants from "../constants/ItemConstants";

class ItemStore extends EventEmitter {

    createItem(data) {
        axios.post('/api/v1/items', qs.stringify(data), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + AuthHelper.getToken()
            }
        }).then((response) => {
            console.log(response);
            this.emit(ItemConstants.ITEM_CREATE_SUCCESS);
        }).catch((error) => {
            console.log(error);
            this.emit(ItemConstants.ITEM_CREATE_FAILED, error.response.data.error);
        });
    }

    handleActions(action) {
        switch (action.type) {
            case ItemConstants.ITEM_CREATE: {
                this.createItem(action.data);
                break;
            }
        }
    }
}

const itemStore = new ItemStore();
dispatcher.register(itemStore.handleActions.bind(itemStore));

export default itemStore;