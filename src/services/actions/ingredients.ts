import { TIngr } from '../../types';
import { getIngredients } from '../../utils/burger-api';
import { CLEAR_QTY, DECREASE_ITEM, GET_ITEMS, GET_ITEMS_FAILED, GET_ITEMS_SUCCESS, INCREASE_ITEM } from '../constants/ingrs';
import { AppDispatch, AppThunk } from '../types';

interface IGetItemsAction {
    readonly type: typeof GET_ITEMS
}

interface IGetItemsSuccessAction {
    readonly type: typeof GET_ITEMS_SUCCESS,
    readonly items: ReadonlyArray<TIngr>
}

interface IGetItemsFailedAction {
    readonly type: typeof GET_ITEMS_FAILED
}

interface IIncreaseItemAction {
    readonly type: typeof INCREASE_ITEM,
    readonly payload: TIngr
}

interface IDecreaseAction {
    readonly type: typeof DECREASE_ITEM,
    readonly payload: TIngr
}

interface IClearQtyAction {
    readonly type: typeof CLEAR_QTY
}

export type TIngrsActions = 
    | IGetItemsAction | IGetItemsSuccessAction | IGetItemsFailedAction
    | IIncreaseItemAction
    | IDecreaseAction
    | IClearQtyAction

function getItemsFailed(): IGetItemsFailedAction {
    return { type: GET_ITEMS_FAILED }
}

export const getItems: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch({type: GET_ITEMS});

    getIngredients().then(res => {
        if (res && res.success) {
            dispatch({
                type: GET_ITEMS_SUCCESS,
                items: res.data.map((el) => { return { ...el, qty: 0}})
            })
        } else {
            dispatch(getItemsFailed())
        }
    })
    .catch(err => {
        console.log(err);
        dispatch(getItemsFailed())
    })
}