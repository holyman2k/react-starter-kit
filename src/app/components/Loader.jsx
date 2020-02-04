import React from "react";
import Spinner from "./Spinner.jsx";
// import Loader from "@highpoint/react-loader-advanced";
var Loader = require("react-loader");

export default ({ show }) => {
	var options = {
		lines: 10,
		length: 12,
		width: 10,
		radius: 12,
		scale: 0.8,
		corners: 1,
		color: "#333",
		opacity: 0.25,
		rotate: 0,
		direction: 1,
		speed: 1.3,
		trail: 60,
		fps: 20,
		zIndex: 2e9,
		top: "50%",
		left: "50%",
		shadow: false,
		hwaccel: true,
		position: "absolute"
	};

	return <Loader loaded={!show} options={options} className="spinner"></Loader>;
};
