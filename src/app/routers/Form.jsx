import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Field, reduxForm, createReduxForm } from "redux-form";
import { Input, SimpleSelect, Select, AsyncSelect } from "../components/form/Fields.jsx";
import { editUser as editUserAction, updateUser } from "../actions/userActions";

const Form = ({ handleSubmit, pristine, reset, submitting, saveUser }) => {
    const options = [{ label: "-- Select --" }, { value: "admin", label: "Admin" }, { value: "user", label: "User" }];
    const loadCountries = (input, callback) => {
        const url = `/country.json`;
        axios.get(url).then(response => {
            const countries = response.data;
            const options = countries.map(item => {
                let option = { ...item };
                option.label = item.name;
                option.value = item.code;
                return option;
            });
            callback(null, { options, complete: true });
        });
    };

    const onSubmit = values => {
        saveUser(values, new Date().getTime());
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Field name="username" component={Input} type="text" label="User Name" list={"hello"} />
                <Field name="email" component={Input} type="email" label="Email" />
                <Field name="firstName" component={Input} type="text" label="First Name" />
                <Field name="lastName" component={Input} type="text" label="Last Name" />
                <Field name="country" component={AsyncSelect} label="Country" loadOptions={loadCountries} />
                <Field name="type" component={Select} label="Account Type" options={options} />
                <p>
                    <button class="btn btn-primary" type="submit" disabled={submitting}>
                        Submit
                    </button>
                    <button class="btn btn-secondary" type="reset" onClick={reset} disabled={submitting}>
                        Reset
                    </button>
                </p>
            </form>
        </div>
    );
};

const validate = values => {
    const errors = {};
    if (!values.username) {
        errors.username = "Required";
    } else if (values.username.length > 15) {
        errors.username = "Must be 15 characters or less";
    }
    if (!values.email) {
        errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address";
    }
    if (!values.firstName) {
        errors.firstName = "Required";
    }
    if (!values.lastName) {
        errors.lastName = "Required";
    }
    if (!values.type) {
        errors.type = "Required";
    }
    if (!values.country) {
        errors.country = "Required";
    }
    return errors;
};

const ReduxForm = reduxForm({
    form: "form",
    validate
})(Form);

export default withRouter(
    connect(
        (store, props) => {
            return {
                initialValues: store.user.editUser
            };
        },
        (dispatch, props) => {
            setTimeout(() => {
                dispatch(editUserAction({}));
            }, 0);
            return {
                saveUser: (value, version) => {
                    console.log("maping on submit", value, version);
                    dispatch(updateUser(value, version));
                }
            };
        }
    )(ReduxForm)
);
