import axios from "axios"
import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom"
import { Field, reduxForm, createReduxForm } from "redux-form"
import { Input, SimpleSelect, Select, AsyncSelect } from "../components/form/Fields.jsx"
import { welcome } from "../actions/homeActions";

const Form = ({ handleSubmit, pristine, reset, submitting }) => {
    const options = [
        { label: "-- Select --" },
        { value: "admin", label: "Admin" },
        { value: "user", label: "User" },
    ];
    const loadCountries = (input, callback) => {

        const url = `/country.json`;
        axios.get(url).then((response) => {
            const countries = response.data;
            const options = countries.map(item => {
                let option = { ...item };
                option.label = item.name;
                option.value = item.code;
                return option;
            });
            callback(null, { options, complete: true });
        });
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Field name="username" component={Input} type="text" label="User Name" list={"hello"} />
                <Field name="email" component={Input} type="email" label="Email" />
                <Field name="firstName" component={Input} type="text" label="First Name" />
                <Field name="lastName" component={Input} type="text" label="Last Name" />
                <Field name="country" component={AsyncSelect} label="Country" loadOptions={loadCountries} />
                <Field name="type" component={Select} label="Account Type" options={options} />
                <p>
                    <button class="btn btn-primary" type="submit" disabled={submitting || pristine}>Submit</button>
                </p>
            </form>
        </div>
    )
}

const validate = values => {
    const errors = {}
    if (!values.username) {
        errors.username = 'Required'
    } else if (values.username.length > 15) {
        errors.username = 'Must be 15 characters or less'
    }
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    if (!values.firstName) {
        errors.firstName = 'Required'
    }
    if (!values.lastName) {
        errors.lastName = 'Required'
    }
    if (!values.type) {
        errors.type = 'Required'
    }
    if (!values.country) {
        errors.type = 'Required'
    }
    return errors
}

const ReduxForm = reduxForm({
    form: "form",
    validate,
    // initialValues: { firstName: "Charlie", lastName: "Wu", email: "charliewu@hotmail.com" },
})(Form);

export default withRouter(connect(
    (store, props) => {
        return {
        }
    },
    (dispatch, props) => {
        setTimeout(() => {
        }, 0);
        return {
            dispatch,
            onSubmit: (value) => {
                console.log(value);
            }

        }
    }
)(ReduxForm));
