import React from "react";
import { connect } from "react-redux";
import { PlusIcon } from "react-open-iconic-svg";
import { editTodo } from "../actions/todoActions";
import EditTodo from "../components/Todo/EditTodo.jsx";

const Todo = ({ todoList, onEditTodo }) => {
  return (
    <div>
      <button class="btn btn-primary mb-2" onClick={() => onEditTodo({})}>
        <PlusIcon />
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
                <button
                  type="button"
                  class="btn btn-link"
                  onClick={() => onEditTodo(todo)}
                >
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

export default connect(
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
)(Todo);
