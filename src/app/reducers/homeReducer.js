import clone from "clone";

const initialState = {
    greeting: "Welcome",
    openModal: false,
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case "WELCOME": {
            const newState = clone(state);
            newState.greeting = payload;
            return newState;
        }
        case "HOME_MODAL_ACTION": {
            const newState = clone(state);
            newState.openModal = payload;
            return newState;
        }
    }
    return state;
}