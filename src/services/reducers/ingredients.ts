import { GET_ITEMS, GET_ITEMS_SUCCESS, INCREASE_ITEM, DECREASE_ITEM, GET_ITEMS_FAILED, CLEAR_QTY } from '../constants/ingrs';
import { TIngrsActions } from '../actions/ingredients';
import { TIngr } from '../../types';

type TIngrsState = {
    items: ReadonlyArray<TIngr>,
    itemsRequest: boolean,
    itemsFailed: boolean,
}

const initialState: TIngrsState = {
    items: [],
    itemsRequest: false,
    itemsFailed: false,
}

export const ingredientsReducer = (state = initialState, action: TIngrsActions) => {
    switch (action.type) {
        case GET_ITEMS: {
            return {
                ...state, itemsRequest: true
            }
        }
            
        case GET_ITEMS_SUCCESS: {
            return { ...state, itemsFailed: false, items: action.items, itemsRequest: false };
        }

        case GET_ITEMS_FAILED: {
            return { ...state, itemsFailed: true, itemsRequest: false };
        }

        case INCREASE_ITEM: {
            return {
                ...state,
                items: [...state.items].map((el) => {
                    if(el._id === action.payload._id) {
                        return el.type !== 'bun' ? {...el, qty: ++el.qty} : {...el, qty: 2}
                    }
                    else {
                        return el.type !== 'bun' ? el : action.payload.type === 'bun' ? {...el, qty: 0} : el
                    }
                })
            }
        }

        case DECREASE_ITEM: {
            return {
                ...state,
                items: [...state.items].map((el) => {
                    if(el._id === action.payload._id) {
                        return el.type !== 'bun' ? {...el, qty: --el.qty} : {...el, qty: 0}
                    }
                    else {
                        return el.type !== 'bun' ? el : action.payload.type === 'bun' ? {...el, qty: 2} : el
                    }
                })
            }
        }

        case CLEAR_QTY: {
            return {
                ...state,
                items: [...state.items].map((el) => {
                    return {...el, qty: 0}
                })
            }
        }

        default: {
            return state;
        }
    }
}