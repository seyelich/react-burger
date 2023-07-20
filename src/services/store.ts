import thunkMiddleware from 'redux-thunk';
import { compose, createStore, applyMiddleware } from 'redux';
import { rootReducer } from "./reducers/index";
import { socketMiddleware } from "./middleware/socketMiddleware";
import { wsActions } from './constants/ws';
import { wsActionsAuth } from './constants/ws-auth';
import { wsUrl } from '../utils/constants';

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(
    thunkMiddleware, 
    socketMiddleware(wsUrl, wsActions, false),
    socketMiddleware(wsUrl, wsActionsAuth, true)
));

export const store = createStore(
    rootReducer,
    enhancer
);