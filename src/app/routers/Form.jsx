import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Field, reduxForm, formValueSelector, change } from "redux-form";
import { Input, SimpleSelect, Select, AsyncSelect } from "../components/form/Fields.jsx";
import { editUser as editUserAction, updateUser, updateBaseRate } from "../actions/userActions";

const Form = ({ handleSubmit, dispatch, formState: { country, baseRate }, typeOptions, pristine, reset, submitting, saveUser }) => {

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

    const countryDidChange = (value) => {
        if (value == "AU") {
            dispatch(change("form", "baseRate", 1000));
        } else {
            dispatch(change("form", "baseRate", 0));
        }
    }

    const typeDidChange = (value) => {
        console.log("type", value);
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Field name="username" component={Input} type="text" label="User Name" list={"hello"} />
                <Field name="email" component={Input} type="email" label="Email" disabled={baseRate == 0} />
                <Field name="firstName" component={Input} type="text" label="First Name" />
                <Field name="lastName" component={Input} type="text" label="Last Name" />
                <Field name="country" component={AsyncSelect} label="Country" loadOptions={loadCountries} valueDidChange={countryDidChange} />
                <Field name="type" component={Select} label="Account Type" options={typeOptions} valueDidChange={typeDidChange} />
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
            const selector = formValueSelector('form');
            const formState = selector(store, "country", "type", "baseRate");
            const initialValues = store.user.editUser || {};
            const baseRate = formState.baseRate || 0;
            const country = formState.country || "";
            const typeOptions = country != "AU" ? [{ value: "", label: "-- Select --" }, { value: "admin", label: "Admin" }, { value: "user", label: "User" }] : [];
            return {
                initialValues: initialValues,
                formState,
                typeOptions,
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
                },
                dispatch
            };
        }
    )(ReduxForm)
);
