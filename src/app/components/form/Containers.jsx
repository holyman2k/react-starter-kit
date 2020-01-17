import React from "react";

export const FormContainer = ({ children, input, label, meta: { touched, error, warning } }) => {
	const labelClass = touched && error ? "text-danger" : "";
	return (
		<div class="form-group">
			<label class={labelClass} htmlFor={input.name}>
				{label}
			</label>
			{children}
			{touched && ((error && <div class="text-danger">{error}</div>) || (warning && <div class="text-warning">>{warning}</div>))}
		</div>
	);
};

export const PlainFormContainer = ({ children, meta: { touched, error, warning } }) => {
	return (
		<div class="mb-2">
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
		const labelClass = [`col-sm-${labelSize}`, "col-form-label", "text-sm-right"];
		if (touched && error) {
			labelClass.push("text-danger")
		}
		return (
			<div class="form-group row">
				<label class={labelClass.join(" ")} htmlFor={input.name}>
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
