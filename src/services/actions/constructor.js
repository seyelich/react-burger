export const GET_CHOSEN_ITEMS = 'GET_CHOSEN_ITEMS';
export const SET_TOTAL_PRICE = 'SET_TOTAL_PRICE';
export const DELETE_ITEM = 'DELETE_ITEM';
export const MOVE_ITEM = 'MOVE_ITEM';
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';
export const MAKE_KEY = 'MAKE_KEY';

export function makeKey(key) {
    return { type: MAKE_KEY, key}
}