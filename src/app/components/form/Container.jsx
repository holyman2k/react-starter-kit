import React from "react";

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
