export function welcome(greeting) {

    return function (dispatch) {
        dispatch({ type: "BUSY", payload: true });
        setTimeout(() => {
            dispatch({ type: "WELCOME", payload: greeting });
            dispatch({ type: "BUSY", payload: false });
        }, 1000);
    }
}

export function presentModal(show = true) {

    return {
        type: "HOME_PRESENT_MODAL",
        payload: show,
    }
}