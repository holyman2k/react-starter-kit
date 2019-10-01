import React from "react";
import idx from "idx";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { editTodo as editTodo } from "../actions/todoActions";
import EditTodo from "../components/EditTodo.jsx";

const Todo = ({ todoList, onEditTodo }) => {
    return (
        <div>
            <button class="btn btn-primary" onClick={() => onEditTodo({})}>
                Add
            </button>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Value</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {todoList.map(todo => (
                        <tr key={todo.id}>
                            <th>{todo.id}</th>
                            <td>{todo.title}</td>
                            <td>{todo.email}</td>
                            <td>{todo.value}</td>
                            <td>
                                <button type="button" class="btn btn-link" onClick={() => onEditTodo(todo)}>
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <EditTodo />
        </div>
    );
};

export default withRouter(
    connect(
        (store, props) => {
            return {
                todoList: store.todo.todoList
            };
        },
        (dispatch, props) => {
            return {
                onEditTodo: todo => {
                    dispatch(editTodo(todo));
                }
            };
        }
    )(Todo)
);
