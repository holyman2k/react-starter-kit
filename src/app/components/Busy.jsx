import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import Loader from "react-loader-advanced"
import Spinner from "../components/Spinner.jsx"

const Busy = ({ isBusy = false }) => {

    return (
        <Loader show={isBusy} message={<Spinner />}>
            <div />
        </Loader>
    )
}

export default withRouter(connect(
    (store) => {
        return {
            isBusy: store.busy.busy,
        }
    }
)(Busy));