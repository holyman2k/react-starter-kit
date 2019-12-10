import { applyMiddleware, createStore, combineReducers, compose } from "redux";
import { createLogger } from "redux-logger";
import { createPromise } from "redux-promise-middleware";
import thunk from "redux-thunk";
import reducers from "./reducers/index.js";

const middleware = applyMiddleware(createPromise(), thunk, createLogger());

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const combinedReducers = combineReducers({
	...reducers
});

const composedMiddleware = composeEnhancers(middleware);

export default createStore(combinedReducers, composedMiddleware);
