import clone from "clone";

const initialState = {
    todoList: [],
    countries: [],
    editTodo: null
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case "FETCH_TODO_FULFILLED": {
            const newState = clone(state);
            newState.todoList = payload;
            return newState;
        }
        case "FETCH_COUNTRY_FULFILLED": {
            const newState = clone(state);
            newState.countries = payload.map(item => {
                return {
                    label: item.name,
                    value: item.code
                };
            });
            return newState;
        }
        case "EDIT_TODO": {
            const newState = clone(state);
            newState.editTodo = payload;
            return newState;
        }
        case "UPDATE_TODO": {
            const newState = clone(state);
            const todo = clone(payload);
            if (todo.id) {
                const users = newState.todoList.map(_ => (_.id == todo.id ? todo : _));
                newState.todoList = users;
            } else {
                todo.id = Date.now();
                newState.todoList.unshift(todo);
            }
            newState.editTodo = null;
            return newState;
        }
    }
    return state;
}
