import configureStore, { history } from "../common/store";
import createRootReducer from "./reducers";

const store = configureStore(createRootReducer(history));

export {
    history,
    store
}