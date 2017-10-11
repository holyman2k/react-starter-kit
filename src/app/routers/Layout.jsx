import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import Loader from "react-loader-advanced";
import NavBar from "../components/NavBar.jsx"
import Spinner from "../components/Spinner.jsx"
import Busy from "../components/Busy.jsx"

const Layout = ({ children }) => {

    return (
        <div>
            <NavBar />
            <div class="container">
                {children}
            </div>
            <Busy />
        </div>
    )
}

export default withRouter(connect(
    (store) => {
        return {
            // isBusy: store.busy.busy,
        }
    }
)(Layout));