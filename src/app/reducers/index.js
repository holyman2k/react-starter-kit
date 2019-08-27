import { reducer as form } from "redux-form";
import home from "./homeReducer";
import busy from "./busyReducer";
import user from "./userReducer";

export default {
    home,
    busy,
    user,
    form
};
