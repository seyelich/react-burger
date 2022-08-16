import React from 'react';
import AppHeader from '../header/header';
import Main from "../main/main";
import { adress } from '../utils/utils';

export default function App() {
    const [data, setData] = React.useState([]);

    React.useEffect(() => { getData() }, [])

    function getData() {
        fetch(adress)
            .then(res => {
                if(res.ok) { 
                    return res.json();
                }
                return Promise.reject(`Что-то пошло не так: ${res.status}`)
            })
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }

    return (
        <>
            <AppHeader />
            <Main data={data} />
        </>
    )
}