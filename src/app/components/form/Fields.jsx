import React from "react";
import ReactSelect from "react-select";
import { Async } from "react-select";
import NumberFormat from "react-number-format";

export const Input = container => {
    const Wrapper = container;
    return ({ input, label, meta: { touched, error, warning } }) => {
        return (
            <Wrapper input={input} meta={{ touched, error, warning }} label={label}>
                <input class="form-control" {...input} placeholder={label} />
            </Wrapper>
        );
    };
};

export const NumberInput = container => {
    const Wrapper = container;
    return ({ input, touch, prefix, label, valueDidChange, meta: { touched, error, warning } }) => {
        const onValueChange = values => {
            const { floatValue } = values;
            input.onChange(floatValue);
            if (valueDidChange) valueDidChange(floatValue);
        };
        const onBlur = () => {
            input.onBlur(input.value);
        };
        return (
            <Wrapper input={input} meta={{ touched, error, warning }} label={label}>
                <NumberFormat
                    class="form-control"
                    value={input.value}
                    placeholder={label}
                    thousandSeparator={true}
                    onValueChange={onValueChange}
                    prefix={prefix}
                    {...input}
                    onBlur={onBlur}
                    onChange={() => {}} // overwrite onChange, data change is handled by onValueChange
                />
            </Wrapper>
        );
    };
};

/// options [{value:v, label:l}]
// value must be a string
export const SimpleSelect = container => {
    const Wrapper = container;
    return ({ options, input, label, meta: { touched, error, warning } }) => {
        const onChange = event => {
            const value = options[event.target.selectedIndex].value;
            input.onChange(value ? value : null);
        };
        const onBlur = event => {
            const value = options[event.target.selectedIndex].value;
            input.onBlur(value ? value : null);
        };
        return (
            <Wrapper input={input} meta={{ touched, error, warning }} label={label}>
                <select class="form-control" {...input} onChange={onChange} onBlur={onBlur}>
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </Wrapper>
        );
    };
};

// options [{value:"v", label:"l"}]
// value must be a string
export const Select = container => {
    const Wrapper = container;
    return ({ options, input, label, meta: { touched, error, warning }, autoload = true, multi = false }) => {
        const onChange = value => {
            input.onChange(value ? value : null);
        };
        return (
            <Wrapper input={input} meta={{ touched, error, warning }} label={label}>
                <ReactSelect
                    multi={multi}
                    name={input.name}
                    simpleValue
                    value={input.value}
                    options={options}
                    autoload={autoload}
                    onChange={value => onChange(value)}
                />
            </Wrapper>
        );
    };
};

// options [{value:"v", label:"l"}]
// value must be a string
export const AsyncSelect = container => {
    const Wrapper = container;
    return ({ loadOptions, input, label, meta: { touched, error, warning }, autoload = true, multi = false }) => {
        const onChange = value => {
            input.onChange(value ? value : null);
        };
        return (
            <Wrapper input={input} meta={{ touched, error, warning }} label={label}>
                <Async
                    multi={multi}
                    name={input.name}
                    simpleValue
                    value={input.value}
                    autoload={autoload}
                    onChange={value => onChange(value)}
                    loadOptions={loadOptions}
                    type="select"
                />
            </Wrapper>
        );
    };
};

export const FormContainer = ({ children, input, label, meta: { touched, error, warning } }) => {
    const classNames = touched && error ? "form-group has-error" : "form-group";
    return (
        <div class={classNames}>
            <label htmlFor={input.name}>{label}</label>
            {children}
            {touched && ((error && <div class="text-danger">{error}</div>) || (warning && <div class="text-warning">>{warning}</div>))}
        </div>
    );
};

export const PlainFormContainer = ({ children, meta: { touched, error, warning } }) => {
    const classNames = touched && error ? "has-error mb-2" : "mb-2";
    return (
        <div class={classNames}>
            {children}
            {touched && ((error && <div class="text-danger">{error}</div>) || (warning && <div class="text-warning">>{warning}</div>))}
        </div>
    );
};

/// labeSize need to be between 1 to 11 as according to bootstrap column
/// margin need to be between 1 to 5 as according to bootstrap column
export const InlineFormContainer = labelSize => {
    return ({ children, input, label, meta: { touched, error, warning } }) => {
        const bodySizeClass = `col-sm-${12 - labelSize} `;
        const labelSizeClass = `col-sm-${labelSize} col-form-label text-sm-right`;
        const classNames = ["form-group", "row"];
        if (touched && error) classNames.push("has-error");
        return (
            <div class={classNames.join(" ")}>
                <label class={labelSizeClass} htmlFor={input.name}>
                    {label}
                </label>
                <div class={bodySizeClass}>
                    {children}
                    {touched && ((error && <div class="text-danger">{error}</div>) || (warning && <div class="text-warning">>{warning}</div>))}
                </div>
            </div>
        );
    };
};
