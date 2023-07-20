import { TAuthActions } from '../actions/auth';
import { TCnstrActions } from '../actions/constructor';
import { TIngrsActions } from '../actions/ingredients';
import { TModalActions } from '../actions/modals';
import { TWsActions } from '../actions/ws';
import { TWsAuthActions } from '../actions/ws-auth';
import { store } from '../store';
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { rootReducer } from '../reducers';

export type RootState = ReturnType<typeof rootReducer>;

export type TApplicationActions = 
    | TAuthActions
    | TCnstrActions
    | TIngrsActions
    | TModalActions
    | TWsActions
    | TWsAuthActions
;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

export type AppDispatch = typeof store.dispatch; 

export type TWsActionsDefault = {
  wsInit: string,
  wsSendMessage: string,
  onOpen: string,
  onClose: string,
  onError: string,
  onMessage: string
}