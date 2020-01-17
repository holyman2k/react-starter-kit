import React, { Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { FieldArray } from "redux-form";
import { PlusIcon, XIcon } from "react-open-iconic-svg";
import { Input, NumberInput, Select, DateTime } from "../form/FormControls.jsx";
import { FormContainer, InlineFormContainer, PlainFormContainer } from "../form/Containers.jsx";
import { editTodo, updateTodo, fetchCountries, fetchTodoList } from "../../actions/todoActions";
import { required, email, minValue, maxValue } from "../form/validators";
import Modal from "../Modal.jsx";

const InlineContainer = InlineFormContainer(2);
const BaseInput = Input(FormContainer);
const BaseDateTime = DateTime(FormContainer);
const FormNumberInput = NumberInput(InlineContainer);
const FormSelect = Select(InlineContainer);
const PlainFormInput = Input(PlainFormContainer);

const minValue1 = minValue(1);
const maxValue24 = maxValue(24);

const EditTodo = ({ show, typeList, countries, submitting, reset, onCancel, handleSubmit }) => {
	return (
		<Modal show={show} title="Todo" onCancel={onCancel}>
			<form onSubmit={handleSubmit}>
				<Field name="task" component={BaseInput} type="text" label="Task" validate={[required]} />
				<Field name="due" component={BaseDateTime} type="due" label="Due" dateFormat="MMM DD, YYYY" validate={[required]} />
				<Field name="email" component={BaseInput} type="email" label="Email" validate={[required, email]} />

				<hr />
				<Field
					name="hour"
					component={FormNumberInput}
					label="Hour"
					prefix=""
					decimalScale={2}
					fixedDecimalScale={true}
					validate={[required, minValue1, maxValue24]}
				/>
				<Field name="type" component={FormSelect} label="Type" options={typeList} validate={[required]} />
				<Field name="country" component={FormSelect} label="Country" options={countries} validate={[required]} />
				<hr />
				<div class="form-group row">
					<label class="col-sm-2 col-form-label text-sm-right">Sub Tasks:</label>
					<div class="col-sm-10">
						<FieldArray
							name="subTask"
							component={({ fields, meta: { errors } }) => (
								<Fragment>
									{fields.map((name, index) => (
										<div key={name}>
											<div class="form-row">
												<div class="col-7">
													<Field
														name={`${name}.task`}
														component={PlainFormInput}
														type="text"
														label="Sub Task"
														validate={[required]}
													/>
												</div>
												<div class="col-4">
													<Field name={`${name}.hour`} component={PlainFormInput} type="number" label="Hour" />
												</div>
												<div class="col-1">
													<button type="button" className="btn btn-danger" onClick={() => fields.remove(index)}>
														<XIcon />
													</button>
												</div>
											</div>
										</div>
									))}
									<button type="button" class="btn btn-dark" onClick={() => fields.push("subTask")}>
										<PlusIcon />
									</button>
								</Fragment>
							)}
						/>
					</div>
				</div>
				<p class="text-right">
					<button class="btn btn-primary mr-1" type="submit" disabled={submitting}>
						Save
					</button>
				</p>
			</form>
		</Modal>
	);
};

const Form = reduxForm({
	form: "todo",
	enableReinitialize: true
})(EditTodo);

export default withRouter(
	connect(
		(store, props) => {
			const typeList = [
				{ value: "work", label: "Work" },
				{ value: "home", label: "Home" }
			];
			const selector = formValueSelector("todo");
			const todotType = selector(store, "type");
			const isWork = todotType == "work";
			const countries = store.todo.countries.filter(country => (isWork && country.value == "AU") || !isWork);
			return {
				show: store.todo.editTodo != null,
				initialValues: store.todo.editTodo,
				countries,
				typeList
			};
		},
		(dispatch, props) => {
			setTimeout(() => {
				dispatch(fetchCountries());
				dispatch(fetchTodoList());
			});
			return {
				onSubmit: values => {
					dispatch(updateTodo(values));
				},
				onCancel: () => {
					dispatch(editTodo(null));
				}
			};
		}
	)(Form)
);
