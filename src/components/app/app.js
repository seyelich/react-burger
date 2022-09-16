import { useEffect } from 'react';
import AppHeader from '../header/header';
import Main from "../main/main";
import { useDispatch } from 'react-redux';
import { getItems } from '../../services/actions/ingredients';

export default function App() {
    const dispatch = useDispatch();

    useEffect(() => { dispatch(getItems()) }, [dispatch]);

    return (
        <>
            <AppHeader />
            <Main />
        </>
    )
}