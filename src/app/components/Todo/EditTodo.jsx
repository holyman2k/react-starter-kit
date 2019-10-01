import React from "react";
import idx from "idx";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Form, Field, FormSpy } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import { PlusIcon, XIcon } from "react-open-iconic-svg";
import { Input, NumberInput, Select } from "../form/Fields.jsx";
import { FormContainer, InlineFormContainer, PlainFormContainer } from "../form/Fields.jsx";
import { editTodo, updateTodo, fetchCountries, fetchTodoList } from "../../actions/todoActions";
import Modal from "../Modal.jsx";

// const FormInput = Input(FormContainer);
// const FormNumberInput = NumberInput(FormContainer);
// const FormSelect = Select(FormContainer);

const InlineContainer = InlineFormContainer(2);
const BaseInput = Input(FormContainer);
const FormInput = Input(InlineContainer);
const FormNumberInput = NumberInput(InlineContainer);
const FormSelect = Select(InlineContainer);

const PlainFormInput = Input(PlainFormContainer);

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
                        <Field name="task" component={BaseInput} type="text" label="Task" />
                        <Field name="email" component={BaseInput} type="email" label="Email" />
                        <hr/>
                        <Field name="hour" component={FormNumberInput} label="Hour" prefix="" decimalScale={2} fixedDecimalScale={true} />
                        <Field name="type" component={FormSelect} label="Account Type" options={typeList} />
                        <FormSpy subscription={{ values: true }}>
                            {props => {
                                const isWork = idx(props, _ => _.values.type) == "work";
                                const countries = !isWork ? countryList : countryList.filter(country => country.value == "AU");
                                return <Field name="country" component={FormSelect} label="Country" options={countries} />;
                            }}
                        </FormSpy>
                        <hr/>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label text-sm-right">
                                Sub Tasks:
                            </label>
                            <div class="col-sm-8">
                                <FieldArray name="subTask">
                                    {({ fields }) =>
                                        fields.map((name, index) => (
                                            <div key={name}>
                                                <div class="form-row">
                                                    <div class="col-7">
                                                        <Field name={`${name}.task`} component={PlainFormInput} type="text" label="Sub Task" />
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
                                        ))
                                    }
                                </FieldArray>

                                <button type="button" class="btn btn-dark" onClick={() => push("subTask")}>
                                    <PlusIcon />
                                </button>
                            </div>
                        </div>

                        <p class="text-right">
                            <button class="btn btn-primary mr-1" type="submit" disabled={submitting}>
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
