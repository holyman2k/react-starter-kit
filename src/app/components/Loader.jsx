import React from "react";
import Spinner from "./Spinner.jsx";

export default ({ show }) => {
	if (!show) {
		return null;
	}
	return (
		<div class="Loader__background">
			<div class="Loader__foreground">
				<div class="Loader__message">
					<Spinner />
				</div>
			</div>
		</div>
	);
};
