import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import home from "./homeReducer";
import busy from "./busyReducer"

export default combineReducers({
    home,
    busy,
    routing: routerReducer
});