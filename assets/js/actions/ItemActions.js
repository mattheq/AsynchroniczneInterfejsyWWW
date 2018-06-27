import dispatcher from '../dispatcher';
import * as ItemConstants from '../constants/ItemConstants';

export function itemCreate(data) {
    dispatcher.dispatch({
        type: ItemConstants.ITEM_CREATE,
        data,
    });
}

export function itemView(data) {
    dispatcher.dispatch({
        type: ItemConstants.ITEM_VIEW,
        data
    })
}

export function itemFetch(data = {}) {
    dispatcher.dispatch({
        type: ItemConstants.ITEM_FETCH,
        data
    })
}

export function itemDelete(data) {
    dispatcher.dispatch({
        type: ItemConstants.ITEM_DELETE,
        data,
    });
}

export function itemUpdate(id, data) {
    dispatcher.dispatch({
        type: ItemConstants.ITEM_UPDATE,
        id,
        data,
    });
}