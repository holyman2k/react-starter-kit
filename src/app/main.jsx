require("jquery");
require("bootstrap");
require ("./css/main.scss");
require('../../node_modules/react-select/dist/react-select.css');

import React from "react"
import { render } from "react-dom"
import App from "./App.jsx"

render(<App />, document.getElementById("app"));