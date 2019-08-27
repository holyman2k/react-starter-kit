import clone from "clone";

const initialState = {
    user: {}
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case "EDIT_USER": {
            const newState = clone(state);
            newState.editUser = payload;
            return newState;
        }
    }
    switch (type) {
        case "UPDATE_USER": {
            const newState = clone(state);
            const newUser = clone(payload.user);
            newUser.version = payload.version;
            newState.user = newUser;
            return newState;
        }
    }
    return state;
}
