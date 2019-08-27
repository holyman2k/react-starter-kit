export const editUser = userData => {
    return { type: "EDIT_USER", payload: userData };
};

export const updateUser = (user, version) => {
    return { type: "UPDATE_USER", payload: { user, version } };
};
