import { combineReducers } from 'redux';
import { constructorReducer } from './constructor';
import { ingredientsReducer } from './ingredients';
import { orderModalReducer } from './modals';
import { userReducer } from './auth';
import { wsReducer } from './ws';
import { wsReducerAuth } from './ws-auth';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    order: orderModalReducer,
    burderConstructor: constructorReducer,
    user: userReducer,
    ws: wsReducer,
    wsAuth: wsReducerAuth
});