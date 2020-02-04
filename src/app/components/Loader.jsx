import React from "react";
import Spinner from "./Spinner.jsx";
import Loader from "./ReactLoader.jsx";

export default ({ show }) => {
	if (!show) return null;
	return <Loader show={show} message={<Spinner />} />;
};
