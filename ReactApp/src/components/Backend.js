import React from "react";

import { store } from "../actions/store";
import { Provider } from "react-redux";
import Tulokset from './Tulokset';
import KuormaTyypit from "./KuormaTyypit";

function Backend() {
    return (

        <Provider store={store}>
            <Tulokset />
            <KuormaTyypit />
        </Provider>

    );
}

export default Backend;