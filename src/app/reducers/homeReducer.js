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
            newState.greeting = true;
            return newState;
        }
    }
    return state;
}