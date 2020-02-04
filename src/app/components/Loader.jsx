import React from "react";
import Spinner from "./Spinner.jsx";

export default ({ show }) => {
	if (!show) return null;
	return (
		<div class="loader-background">
			<div class="loader-message">
				<Spinner />
			</div>
		</div>
	);
};
