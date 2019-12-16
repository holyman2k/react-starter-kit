import React from "react";
import Spinner from "./Spinner.jsx";
import Loader from "@highpoint/react-loader-advanced";

export default ({ show }) => {
    
    return <Loader show={show} message={<Spinner />} />;
};

