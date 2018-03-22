import React from "react";

export const Input = ({ input, label, type, meta: { touched, error, warning } }) => {
    const classes = touched && error ? "form-control is-invalid" : "form-control"
    return (
        <div class="form-group">
            <label htmlFor={input.name}>{label}</label>
            <input class={classes} {...input} placeholder={label} type={type} />
            {touched && ((error && <div class="text-danger">{error}</div>) || (warning && <div class="text-warning">>{warning}</div>))}
        </div>
    )
};

export const SimpleSelect = ({ options, input, label, meta: { touched, error, warning } }) => {
    const classes = touched && error ? "form-control is-invalid" : "form-control";
    const onChange = (event) => {
        const value = options[event.target.selectedIndex].value;
        input.onChange(value ? value : null);
    }
    const onBlur = (event) => {

        const value = options[event.target.selectedIndex].value;
        input.onBlur(value ? value : null);
    }
    return (
        <div class="form-group">
            <label htmlFor={input.name}>{label}</label>
            <select class={classes} {...input} onChange={onChange} onBlur={onBlur}>
                {options.map((option, index) => <option key={index} value={option.value}>{option.label}</option>)}
            </select>
            {touched && ((error && <div class="text-danger">{error}</div>) || (warning && <div class="text-warning">>{warning}</div>))}
        </div>
    )
};
