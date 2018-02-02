require("jquery");
require("bootstrap");
// require("./css/main.less");
require("bootstrap/dist/css/bootstrap.min.css");

import React from "react"
import { render } from "react-dom"
import App from "./App.jsx"

render(<App />, document.getElementById("app"));