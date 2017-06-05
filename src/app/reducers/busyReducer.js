import clone from "clone";

const initialState = {
    busy: false,
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case "BUSY": {
            const newState = clone(state);
            newState.busy = payload;
            return newState;
        }
    }
    return state;
}