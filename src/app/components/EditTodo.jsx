import React from "react";
import idx from "idx";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Form, Field, FormSpy } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import { Input, NumberInput, Select } from "./form/Fields.jsx";
import { editTodo, updateTodo, fetchCountries, fetchTodoList } from "../actions/todoActions";
import Modal from "./Modal.jsx";

const EditTodo = ({ editTodo, typeList, countryList, onCancel, onSave }) => {
    return (
        <Modal show={editTodo != null} title="Form" onCancel={onCancel}>
            <Form
                subscription={{ submitting: true, pristine: true }}
                mutators={{
                    ...arrayMutators
                }}
                initialValues={editTodo}
                validate={validate}
                onSubmit={onSave}
            >
                {({
                    handleSubmit,
                    submitting,
                    form,
                    form: {
                        mutators: { push, pop }
                    }
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Field name="task" component={Input} type="text" label="Task" />
                        <Field name="email" component={Input} type="email" label="Email" />
                        <Field name="hour" component={NumberInput} label="Hour" prefix="" decimalScale={2} fixedDecimalScale={true} />
                        <Field name="type" component={Select} label="Account Type" options={typeList} />
                        <FormSpy subscription={{ values: true }}>
                            {props => {
                                const isWork = idx(props, _ => _.values.type) == "work";
                                const countries = !isWork ? countryList : countryList.filter(country => country.value == "AU");
                                return <Field name="country" component={Select} label="Country" options={countries} />;
                            }}
                        </FormSpy>
                        <FieldArray name="subTask">
                            {({ fields }) =>
                                fields.map((name, index) => (
                                    <div key={name} style={{ padding: "20px 10px 20px 20px"}}>
                                        <Field name={`${name}.subTask`} component={Input} type="text" label="Sub Task" />
                                        <Field name={`${name}.hour`} component={Input} type="text" label="Hour" />
                                        <button type="button" className="btn btn-danger" onClick={() => fields.remove(index)}>
                                            DEL
                                        </button>
                                    </div>
                                ))
                            }
                        </FieldArray>
                        <button type="button" class="btn btn-primary" onClick={() => push("subTask")}>
                            Add Sub Task
                        </button>
                        <p class="text-right">
                            <button class="btn btn-primary" type="submit" disabled={submitting}>
                                Save
                            </button>
                            <button class="btn btn-secondary" type="reset" disabled={submitting} onClick={form.reset}>
                                Reset
                            </button>
                        </p>
                    </form>
                )}
            </Form>
        </Modal>
    );
};

const validate = values => {
    const errors = {};
    if (!values.task) {
        errors.task = "Required";
    } else if (values.task.length > 50) {
        errors.task = "Must be 50 characters or less";
    }

    if (!values.hour) {
        errors.hour = "Required";
    }
    if (!values.email) {
        errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address";
    }
    return errors;
};

export default withRouter(
    connect(
        (store, props) => {
            const typeList = [{ label: "-- Select --" }, { value: "work", label: "Work" }, { value: "home", label: "Home" }];
            return {
                editTodo: store.todo.editTodo,
                countryList: store.todo.countries,
                typeList
            };
        },
        (dispatch, props) => {
            setTimeout(() => {
                dispatch(fetchCountries());
                dispatch(fetchTodoList());
            });
            return {
                onSave: values => {
                    dispatch(updateTodo(values));
                },
                onCancel: () => {
                    dispatch(editTodo(null));
                }
            };
        }
    )(EditTodo)
);
