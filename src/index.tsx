import React from "react";
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from "./components/app/app";
import './index.css';
import { store } from "./services/store";

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HashRouter>
                <App />
            </HashRouter>
        </Provider>
    </React.StrictMode>
)