import { applyMiddleware, createStore, combineReducers, compose } from "redux";
import { routerMiddleware, routerReducer } from "react-router-redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import reducers from "./reducers/index.js";
import history from "./history.js";

const middleware = applyMiddleware(promise(), thunk, logger, routerMiddleware(history));

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const combinedReducers = combineReducers({
    ...reducers,
    router: routerReducer
});

const composedMiddleware = composeEnhancers(middleware);

export default createStore(combinedReducers, composedMiddleware);
