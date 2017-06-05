import clone from "clone";

const initialState = {
    greeting: "Welcome",
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case "WELCOME": {
            const newState = clone(state);
            newState.greeting = `Welcome ${payload} `;
            return newState;
        }
    }
    return state;
}