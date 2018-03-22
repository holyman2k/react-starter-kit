import React from "react";
import ReactSelect from 'react-select';

export const FormField = ({ children, input, label, meta: { touched, error, warning } }) => {
    const classNames = touched && error ? "form-group has-error" : "form-group"
    return (
        <div class={classNames}>
            <label htmlFor={input.name}>{label}</label>
            {children}
            {touched && ((error && <div class="text-danger">{error}</div>) || (warning && <div class="text-warning">>{warning}</div>))}
        </div>
    )
};

export const Input = ({ input, label, type, meta: { touched, error, warning } }) => {
    return (
        <FormField input={input} meta={{ touched, error, warning }} label={label}>
            <input class="form-control" {...input} placeholder={label} type={type} />
        </FormField>
    )
};

/// options [{value:v, label:l}]
// value must be a string
export const SimpleSelect = ({ options, input, label, meta: { touched, error, warning } }) => {
    const onChange = (event) => {
        const value = options[event.target.selectedIndex].value;
        input.onChange(value ? value : null);
    }
    const onBlur = (event) => {
        const value = options[event.target.selectedIndex].value;
        input.onBlur(value ? value : null);
    }
    return (
        <FormField input={input} meta={{ touched, error, warning }} label={label}>
            <select class="form-control" {...input} onChange={onChange} onBlur={onBlur}>
                {options.map((option, index) => <option key={index} value={option.value}>{option.label}</option>)}
            </select>
        </FormField>
    )
};

// options [{value:"v", label:"l"}]
// value must be a string
export const Select = ({ options, input, label, meta: { touched, error, warning }, autoload = true, multi = false }) => {
    const onChange = (value) => {
        input.onChange(value ? value : null);
    };
    return (
        <FormField input={input} meta={{ touched, error, warning }} label={label}>
            <ReactSelect multi={multi} name={input.name} simpleValue value={input.value} options={options} autoload={autoload}
                onChange={value => onChange(value)} />
        </FormField>

    );
};

// options [{value:"v", label:"l"}]
// value must be a string
export const AsyncSelect = ({ loadOptions, input, label, meta: { touched, error, warning }, autoload = true, multi = false }) => {
    const onChange = (value) => {
        input.onChange(value ? value : null);
    };
    return (
        <FormField input={input} meta={{ touched, error, warning }} label={label}>
            <ReactSelect.Async multi={multi} name={input.name} simpleValue value={input.value} autoload={autoload}
                onChange={value => onChange(value)} loadOptions={loadOptions} />
        </FormField>

    );
};