import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
} from 'react-redux';
import { useLocation as locationHook } from 'react-router-dom';
import { AppDispatch, AppThunk, RootState } from './types';
  
export const useDispatch = () => dispatchHook<AppDispatch & AppThunk>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useLocation = () => locationHook<{
    bg?: { pathname: string, search: string, hash: string, state: undefined},
    num?: string,
    from: { pathname: string }
}>();