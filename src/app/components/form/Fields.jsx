import React from "react";
import ReactSelect, { Async as async } from "react-select";
import NumberFormat from "react-number-format";
import variables from "../../css/variables.scss";

export const Input = container => {
	const Wrapper = container;
	return ({ input, label, meta: { touched, error, warning } }) => {
		const className = touched && error ? "form-control is-invalid" : "form-control";
		console.log("label", className, label, touched, error);
		return (
			<Wrapper input={input} meta={{ touched, error, warning }} label={label}>
				<input class={className} {...input} placeholder={label} />
			</Wrapper>
		);
	};
};

export const NumberInput = container => {
	const Wrapper = container;
	return ({ input, prefix, label, valueDidChange, meta: { touched, error, warning } }) => {
		const className = touched && error ? "form-control is-invalid" : "form-control";
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
					class={className}
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
		const className = touched && error ? "form-control is-invalid" : "form-control";
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
				<select class={className} {...input} onChange={onChange} onBlur={onBlur}>
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
			input.onChange(value ? value.value : null);
		};
		const value = options.filter(item => item.value == input.value).pop();
		const styles = {
			control: (provided, state) => ({
				...provided,
				border: `1px solid ${touched && error ? variables.borderColorInvalid : variables.borderColor}`,
				borderRadius: 0,
				boxShadow: "none",
				"&:hover": { borderColor: touched && error ? variables.borderColorInvalid : variables.borderColor }
			})
		};
		return (
			<Wrapper input={input} meta={{ touched, error, warning }} label={label}>
				<ReactSelect
					isClearable={true}
					styles={styles}
					multi={multi}
					name={input.name}
					value={value}
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
			input.onChange(value ? value.value : null);
		};
		const value = options.filter(item => item.value == input.value).pop();
		const styles = {
			control: (provided, state) => ({
				...provided,
				border: `1px solid ${touched && error ? variables.borderColorInvalid : variables.borderColor}`,
				borderRadius: 0,
				boxShadow: "none",
				"&:hover": { borderColor: touched && error ? variables.borderColorInvalid : variables.borderColor }
			})
		};
		return (
			<Wrapper input={input} meta={{ touched, error, warning }} label={label}>
				<Async
					isClearable={true}
					styles={styles}
					multi={multi}
					name={input.name}
					simpleValue
					value={value}
					autoload={autoload}
					onChange={value => onChange(value)}
					loadOptions={loadOptions}
					type="select"
				/>
			</Wrapper>
		);
	};
};
