import React from 'react';
import AppHeader from '../header/header';
import Main from "../main/main";
import getIngredients from '../utils/burger-api';

export default function App() {
    const [data, setData] = React.useState([]);

    React.useEffect(() => { getIngredients(setData) }, [])

    return (
        <>
            <AppHeader />
            <Main data={data} />
        </>
    )
}