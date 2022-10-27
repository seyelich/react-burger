import thunkMiddleware from 'redux-thunk';
import { compose, createStore, applyMiddleware } from 'redux';
import { rootReducer } from "./reducers/index";
import { socketMiddleware } from "./middleware/socketMiddleware";
import { wsActions } from './actions/ws';
import { wsActionsAuth } from './actions/ws-auth';
import { wsUrl } from '../utils/constants';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(
    thunkMiddleware, 
    socketMiddleware(wsUrl, wsActions, false),
    socketMiddleware(wsUrl, wsActionsAuth, true)
));

export const store = createStore(
    rootReducer,
    enhancer
);