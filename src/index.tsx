import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import appReducer from "./store/reducers/reducers";
import { reducer as formReducer } from "redux-form";
import * as serviceWorker from "./serviceWorker";

import App from "./App";

const rootReducer = combineReducers({
	form: formReducer,
	...appReducer,
});

const globalStore = createStore(rootReducer, applyMiddleware(thunk, logger));

const app = (
	<Provider store={globalStore}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
