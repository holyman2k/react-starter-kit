export function welcome(greeting) {

    return function (dispatch) {
        dispatch({ type: "WELCOME", payload: greeting });
        dispatch({ type: "BUSY", payload: true });
        setTimeout(() => {
            dispatch({ type: "BUSY", payload: false });
        }, 500);
    }
}

export function modalAction(open = true) {

    return {
        type: "HOME_MODAL_ACTION",
        payload: open,
    }
}