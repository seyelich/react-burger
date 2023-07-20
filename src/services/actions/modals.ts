import { getOrderInfo } from '../../utils/burger-api';
import { getToken } from './auth';
import { CLEAR_CONSTRUCTOR } from '../constants/constructor';
import { CLEAR_QTY } from '../constants/ingrs';
import { GET_ORDER, GET_ORDER_FAILED, GET_ORDER_SUCCESS } from '../constants/modals';
import { AppDispatch, AppThunk } from '../types';
import { TOrder } from '../../types';

interface IGetOrderAction {
    readonly type: typeof GET_ORDER
}

interface IGetSuccessOrderAction {
    readonly type: typeof GET_ORDER_SUCCESS,
    readonly order: TOrder
}

interface IGetOrderFailedAction {
    readonly type: typeof GET_ORDER_FAILED
}

export type TModalActions = IGetOrderAction | IGetSuccessOrderAction | IGetOrderFailedAction;

function getOrderFailed(): IGetOrderFailedAction {
    return { type: GET_ORDER_FAILED }
}

export const getOrder: AppThunk = (ids: Array<string>) => (dispatch: AppDispatch & AppThunk) => {
    dispatch({ type: GET_ORDER });

    getOrderInfo(ids).then(res => {
        if (res && res.success) {
            dispatch({
                type: GET_ORDER_SUCCESS,
                order: res.order
            })
            dispatch({ type: CLEAR_CONSTRUCTOR });
            dispatch({ type: CLEAR_QTY });
        } else {
            dispatch(getOrderFailed())
        }
    })
    .catch(err => {
        console.log(err);
        if(err.message === 'jwt expired') {
            dispatch(getToken());
        }
        dispatch(getOrderFailed())
    })
}
