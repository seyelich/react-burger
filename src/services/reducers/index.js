import { combineReducers } from 'redux';
import { constructorReducer } from './constructor';
import { ingredientsReducer } from './ingredients';
import { orderModalReducer, itemInfoModalReducer } from './modals';
import { userReducer } from './auth';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    order: orderModalReducer,
    burderConstructor: constructorReducer,
    item: itemInfoModalReducer,
    user: userReducer
});