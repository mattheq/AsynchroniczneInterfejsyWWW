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
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + AuthHelper.getToken()
            }
        }).then((response) => {
            this.emit(ItemConstants.ITEM_CREATE_SUCCESS, response.data);
        }).catch((error) => {
            this.emit(ItemConstants.ITEM_CREATE_FAILED, error.response.data.error);
        });
    }

    viewItem(id) {
        axios.get(`/api/v1/items/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + AuthHelper.getToken()
            }
        }).then((response) => {
            this.emit(ItemConstants.ITEM_VIEW_SUCCESS, response.data);
        }).catch((error) => {
            this.emit(ItemConstants.ITEM_VIEW_FAILED, error.response.data.error);
        });
    }

    fetchItem(data) {
        let queryString = qs.stringify(data);
        axios.get('/api/v1/items' + (queryString.length > 0 ? ('?' + queryString) : ''), {
            headers: {
                'Authorization': 'Bearer ' + AuthHelper.getToken()
            }
        }).then((response) => {
            this.emit(ItemConstants.ITEM_FETCH_SUCCESS, response.data);
        }).catch((error) => {
            console.log(error);
            this.emit(ItemConstants.ITEM_FETCH_FAILED, error.response);
        });
    }

    handleActions(action) {
        switch (action.type) {
            case ItemConstants.ITEM_CREATE: {
                this.createItem(action.data);
                break;
            }

            case ItemConstants.ITEM_VIEW: {
                this.viewItem(action.data);
                break;
            }

            case ItemConstants.ITEM_FETCH: {
                this.fetchItem(action.data);
                break;
            }
        }
    }
}

const itemStore = new ItemStore();
dispatcher.register(itemStore.handleActions.bind(itemStore));

export default itemStore;