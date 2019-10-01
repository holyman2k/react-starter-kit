import { applyMiddleware, createStore, combineReducers, compose } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import reducers from "./reducers/index.js";

const middleware = applyMiddleware(promise(), thunk, logger);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const combinedReducers = combineReducers({
    ...reducers
});

const composedMiddleware = composeEnhancers(middleware);

export default createStore(combinedReducers, composedMiddleware);
