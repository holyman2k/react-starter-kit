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
			<table class="table table-hover table-responsive-sm">
				<thead>
					<tr>
						<th scope="col">ID</th>
						<th scope="col-4">Name</th>
						<th scope="col">Email</th>
						<th scope="col">Value</th>
						<th scope="col"></th>
					</tr>
				</thead>
				<tbody>
					{todoList.map(todo => (
						<tr key={todo.id} onClick={() => onEditTodo(todo)} class="pointer">
							<th class="align-middle">{todo.id}</th>
							<td class="align-middle">{todo.task}</td>
							<td class="align-middle">{todo.email}</td>
							<td class="align-middle">{todo.type}</td>
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
