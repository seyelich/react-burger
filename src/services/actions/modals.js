import { getOrderInfo } from '../../utils/burger-api';
import { getCookie } from '../../utils/utils';
import { getToken } from './auth';
import { CLEAR_CONSTRUCTOR } from './constructor';
import { CLEAR_QTY } from './ingredients';

export const GET_ORDER = 'GET_ORDER';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

function getOrderFailed() {
    return { type: GET_ORDER_FAILED }
}

export function getOrder(ids) {
    return function(dispatch) {
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
            
            if(res.message === 'jwt expired' || (getCookie('refreshToken') && !getCookie('accessToken'))) {
                dispatch(getToken());
            }
        })
        .catch(err => {
            console.log(err);
            dispatch(getOrderFailed())
        })
    }
}
