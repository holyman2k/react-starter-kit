import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import Loader from "react-loader-advanced";
import NavBar from "../components/NavBar.jsx"
import { Container, Divider, Dropdown, Grid, Header, Image, List, Menu, Segment } from 'semantic-ui-react'

const Layout = ({ children }) => {

    return (
        <div>
            <NavBar />
            <Container text style={{ marginTop: '4em' }}>
                {children}
            </Container>
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