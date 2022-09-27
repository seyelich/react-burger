import { combineReducers } from 'redux';
import { constructorReducer } from './constructor';
import { ingredientsReducer } from './ingredients';
import { orderModalReducer, itemInfoModalReducer } from './modals';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    order: orderModalReducer,
    burderConstructor: constructorReducer,
    item: itemInfoModalReducer
});