import { getIngredients } from '../../components/utils/burger-api';

export const GET_ITEMS = 'GET_ITEMS';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';
export const INCREASE_ITEM = 'INCREASE_ITEM';
export const DECREASE_ITEM = 'DECREASE_ITEM';

export function getItems() {
    return function(dispatch) {
        dispatch({type: GET_ITEMS});

        getIngredients().then(res => {
            if (res && res.success) {
                dispatch({
                    type: GET_ITEMS_SUCCESS,
                    items: res.data.map((el) => { return { ...el, qty: 0}})
                })
            } else {
                dispatch({type: GET_ITEMS_FAILED})
            }
        })
        .catch(err => {
            dispatch({
                type: GET_ITEMS_FAILED
            })
        })
    }
}