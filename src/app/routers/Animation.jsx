import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom"
import { Fade, FadeIn, FadeOut, FadeInOut } from "../transitions/Fade.jsx"
import { welcome, presentModal } from "../actions/homeActions";
import Modal, { Footer, Body, Alert, Confirm } from "../components/Modal.jsx"

const Animation = ({ greeting, showModal, onPresentModal }) => {

    return (
        <div>
            <h1>Animation</h1>

            <FadeOut duration={2000}>
                <h2>Fading out</h2>
            </FadeOut>

            <FadeIn duration={3000} delay={2000}>
                <h2>Fading in</h2>
            </FadeIn>

            <FadeInOut duration={3000} delay={2000}>
                <h2>Fading in out</h2>
            </FadeInOut>
        </div>
    )
}

export default withRouter(connect()(Animation));
