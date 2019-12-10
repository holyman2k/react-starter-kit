import axios from "axios";

export const editTodo = userData => {
    return { type: "EDIT_TODO", payload: userData };
};

export const updateTodo = todo => {
    return { type: "UPDATE_TODO", payload: todo };
};

export const fetchCountries = () => {
    return dispatch => {
        axios
            .get("/country.json")
            .then(response => dispatch({ type: "FETCH_COUNTRY_FULFILLED", payload: response.data }))
            .catch(error => dispatch({ type: "FETCH_COUNTRY_FAILED", payload: error }));
    };
};

export const fetchTodoList = () => {
    return dispatch => {
        axios
            .get("/todo-list.json")
            .then(response => dispatch({ type: "FETCH_TODO_FULFILLED", payload: response.data }))
            .catch(error => dispatch({ type: "FETCH_TODO_FAILED", payload: error }));
    };
};
