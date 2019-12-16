import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Loader from "./Loader.jsx";

const Busy = ({ isBusy = false }) => {
	return <Loader show={isBusy} />;
};

export default withRouter(
	connect(store => {
		return {
			isBusy: store.busy.busy
		};
	})(Busy)
);
