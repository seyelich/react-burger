import React  from "react";
import AppHeader from '../header/header';
import Main from "../main/main";

export default class App extends React.Component {
    render() {
        return (
            <>
                <AppHeader />
                <Main />
            </>
        )
    }
}