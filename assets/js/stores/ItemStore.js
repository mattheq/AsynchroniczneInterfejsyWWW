import { EventEmitter } from 'events';
import axios from 'axios';
import AuthHelper from '../helpers/AuthHelper';
import dispatcher from "../dispatcher";
import qs from "qs";
import * as ItemConstants from "../constants/ItemConstants";

class ItemStore extends EventEmitter {
    createItem(data) {
        const form = new FormData();
        form.append('title', data.create_item.title);
        form.append('description', data.create_item.description);
        form.append('type', data.create_item.type);
        data.create_item.files.forEach((file) => {
            form.append('files[]', file);
        });
        form.append("item_details[country]", data.create_item.country);
        form.append("item_details[city]", data.create_item.city);
        form.append("item_details[street]", data.create_item.street);
        form.append("item_details[street_number]", data.create_item.street_number);
        form.append("item_details[daytime]", data.create_item.daytime.unix());
        axios.post('/api/v1/items', form, {
            headers: {
                'Content-Type': 'multipart/form-data',
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
        let headers = {
            'Content-Type': 'application/json'
        };
        if (AuthHelper.getToken()) {
            headers.Authorization = 'Bearer ' + AuthHelper.getToken();
        }
        axios.get(`/api/v1/items/${id}`, {
            headers
        }).then((response) => {
            this.emit(ItemConstants.ITEM_VIEW_SUCCESS, response.data);
        }).catch((error) => {
            this.emit(ItemConstants.ITEM_VIEW_FAILED, error.response.data.error);
        });
    }

    fetchItems(data) {
        let headers = {};
        if (AuthHelper.getToken()) {
            headers.Authorization = 'Bearer ' + AuthHelper.getToken();
        }
        let queryString = qs.stringify(data);
        axios.get('/api/v1/items' + (queryString.length > 0 ? ('?' + queryString) : ''), {
            headers
        }).then((response) => {
            this.emit(ItemConstants.ITEMS_FETCH_SUCCESS, response.data);
        }).catch((error) => {
            this.emit(ItemConstants.ITEMS_FETCH_FAILED, error.response);
        });
    }

    deleteItem(id) {
        axios.delete(`/api/v1/items/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + AuthHelper.getToken()
            }
        }).then((response) => {
            this.emit(ItemConstants.ITEM_DELETE_SUCCESS, response.data);
        }).catch((error) => {
            this.emit(ItemConstants.ITEM_DELETE_FAILED, error.response.data.error);
        });
    }

    updateItem(id, data) {
        axios.put(`/api/v1/items/${id}`, data, {
            headers: {
                'Authorization': 'Bearer ' + AuthHelper.getToken(),
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            this.emit(ItemConstants.ITEM_UPDATE_SUCCESS, response.data);
        }).catch((error) => {
            this.emit(ItemConstants.ITEM_UPDATE_FAILED, error.response.data.error);
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

            case ItemConstants.ITEMS_FETCH: {
                this.fetchItems(action.data);
                break;
            }

            case ItemConstants.ITEM_DELETE: {
                this.deleteItem(action.data);
                break;
            }

            case ItemConstants.ITEM_UPDATE: {
                this.updateItem(action.id, action.data);
                break;
            }
        }
    }
}

const itemStore = new ItemStore();
dispatcher.register(itemStore.handleActions.bind(itemStore));

export default itemStore;