export function welcome(greeting) {

    return function (dispatch) {
        dispatch({ type: "WELCOME", payload: greeting });
        dispatch({ type: "BUSY", payload: true });
        setTimeout(() => {
            dispatch({ type: "BUSY", payload: false });
        }, 500);
    }

}