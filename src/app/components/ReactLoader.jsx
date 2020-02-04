import React from "react";

const backgroundStyle = {
	position: "fixed",
	top: 0,
	left: 0,
	height: "100%",
	width: "100%",
	backgroundColor: "rgba(0, 0, 0, 0.3)",
	zIndex: 10
};

const messageStyle = {
	position: "fixed",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)"
};

export default ({ show, message }) => {
	if (!show) return null;
	return (
		<div style={backgroundStyle}>
			<div style={messageStyle}>{message}</div>
		</div>
	);
};
