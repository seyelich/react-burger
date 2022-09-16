import { getOrderInfo } from '../../components/utils/burger-api';

export const ADD_ITEM_INFO = 'ADD_ITEM_INFO';
export const DELETE_ITEM_INFO = 'DELETE_ITEM_INFO';
export const GET_ORDER = 'GET_ORDER';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export function getOrder(ids) {
    return function(dispatch) {
        dispatch({type: GET_ORDER});

        getOrderInfo(ids).then(res => {
            if (res && res.success) {
                dispatch({
                    type: GET_ORDER_SUCCESS,
                    order: res.order
                })
            } else {
                dispatch({type: GET_ORDER_FAILED})
            }
        })
        .catch(err => {
            dispatch({
                type: GET_ORDER_FAILED
            })
        })
    }
}
