import React from "react";
import ReactSelect, { Async as async } from "react-select";
import NumberFormat from "react-number-format";
import ReactDateTime from "react-datetime";
import moment from 'moment-timezone';	// required to display time zone in react-datetime
import variables from "../../css/variables.scss";
import "react-datetime/css/react-datetime.css";

export const Input = container => {
	const Wrapper = container;
	return ({ input, label, meta: { touched, error, warning } }) => {
		const className = touched && error ? "form-control is-invalid" : "form-control";
		return (
			<Wrapper input={input} meta={{ touched, error, warning }} label={label}>
				<input class={className} {...input} placeholder={label} />
			</Wrapper>
		);
	};
};

export const DateTime = container => {
	const Wrapper = container;
	return ({ input, label, timeZone, dateFormat = "", timeFormat = "", meta: { touched, error, warning } }) => {
		const className = touched && error ? "form-control is-invalid" : "form-control";
		const inputProps = {
			placeholder: label,
			className
		};
		return (
			<Wrapper input={input} meta={{ touched, error, warning }} label={label}>
				<ReactDateTime
					{...input}
					displayTimeZone={timeZone}
					placeholder={label}
					dateFormat={dateFormat}
					timeFormat={timeFormat}
					inputProps={inputProps}
					closeOnSelect={true}
				/>
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
		return (
			<Wrapper input={input} meta={{ touched, error, warning }} label={label}>
				<select class={className} {...input} onChange={onChange} onBlur={() => input.onBlur()}>
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

// options [{value, label}]
// value is value or array of values
export const Select = container => {
	const Wrapper = container;
	return ({ options, input, label, meta: { touched, error, warning }, isMulti = false }) => {
		const onChange = value => {
			if (isMulti) {
				input.onChange(value ? value.map(item => item.value) : null);
			} else {
				input.onChange(value ? value.value : null);
			}
		};
		const style = {
			control: (provided, state) => ({
				...provided,
				border: `1px solid ${touched && error ? variables.borderColorInvalid : variables.borderColor}`,
				borderRadius: 0,
				boxShadow: "none",
				"&:hover": { borderColor: touched && error ? variables.borderColorInvalid : variables.borderColor }
			})
		};

		const value = isMulti
			? options.filter(item => (input.value ? input.value.indexOf(item.value) != -1 : false))
			: options.filter(item => item.value == input.value);

		return (
			<Wrapper input={input} meta={{ touched, error, warning }} label={label}>
				<ReactSelect
					isClearable={true}
					styles={style}
					isMulti={isMulti}
					name={input.name}
					value={value}
					options={options}
					onChange={value => onChange(value)}
					onBlur={input.onBlur}
				/>
			</Wrapper>
		);
	};
};

// options [{value, label}]
// value is value or array of values
export const AsyncSelect = container => {
	const Wrapper = container;
	return ({ loadOptions, input, label, meta: { touched, error, warning }, autoload = true, isMulti = false }) => {
		const onChange = value => {
			input.onChange(value ? value.value : null);
		};
		const styles = {
			control: (provided, state) => ({
				...provided,
				border: `1px solid ${touched && error ? variables.borderColorInvalid : variables.borderColor}`,
				borderRadius: 0,
				boxShadow: "none",
				"&:hover": { borderColor: touched && error ? variables.borderColorInvalid : variables.borderColor }
			})
		};
		const value = isMulti
			? options.filter(item => (input.value ? input.value.indexOf(item.value) != -1 : false))
			: options.filter(item => item.value == input.value);
		return (
			<Wrapper input={input} meta={{ touched, error, warning }} label={label}>
				<Async
					isClearable={true}
					styles={styles}
					isMulti={isMulti}
					name={input.name}
					value={value}
					autoload={autoload}
					onBlur={input.onBlur}
					onChange={value => onChange(value)}
					onBlur={() => input.onBlur()}
					loadOptions={loadOptions}
				/>
			</Wrapper>
		);
	};
};
