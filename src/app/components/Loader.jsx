import React from "react";
import Spinner from "./Spinner.jsx";
import Loader from "./ReactLoader.jsx";

export default ({ show }) => {
	return <Loader show={show} message={<Spinner />} />;
};
