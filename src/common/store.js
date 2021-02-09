import { createHashHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import logger from "redux-logger";
import thunk from "redux-thunk";

export const history = createHashHistory({ basename: '/' });

export default function configureStore(preloadedState) {
	const store = createStore(
		preloadedState,
		compose(
			applyMiddleware(
				routerMiddleware(history),
				thunk,
				logger
			)
		)
	);
	return store;
}