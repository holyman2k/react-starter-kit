require("./css/main.less");
import 'semantic-ui-css/semantic.min.css';

import React from "react"
import { render } from "react-dom"
import App from "./App.jsx"

render(<App />, document.getElementById("app"));