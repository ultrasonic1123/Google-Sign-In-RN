import { createStore } from "redux";
import App from "./App"
import React from "react";
import { Provider } from "react-redux";
import SettingReducer from "./SettingReducer"
const newApp = () => {
    const store = createStore(SettingReducer);
    return(
        <Provider store={store}>
            <App />
        </Provider>
    )
}
export default newApp;