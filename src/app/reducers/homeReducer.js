import clone from "clone";

const initialState = {
    greeting: "Welcome",
    showModal: false,
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case "WELCOME": {
            const newState = clone(state);
            newState.greeting = payload;
            return newState;
        }
        case "HOME_PRESENT_MODAL": {
            const newState = clone(state);
            newState.showModal = payload;
            return newState;
        }
    }
    return state;
}