import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom"
import Fade from "../transitions/Fade.jsx"
import { welcome, presentModal } from "../actions/homeActions";
import Modal, { Footer, Body, Alert, Confirm } from "../components/Modal.jsx"

const Home = ({ greeting, showModal, onPresentModal }) => {
    return (
        <div>
            <Fade duration={1000}>
                <div class="jumbotron">
                    <h1 class="display-4">{greeting}</h1>
                    <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                    <hr class="my-4" />
                    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                    <p class="lead">
                        <Link to="/Ni Hao" class="btn btn-primary">Ni Hao</Link>
                        <button class="btn btn-info" onClick={() => onPresentModal(true)}>Modal</button>
                    </p>
                </div>
            </Fade>

            {/* <Modal show={showModal} title="Alert" onCancel={() => onPresentModal(false)} onAction={() => onPresentModal(false)}>
                <Body>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut malesuada sem eu rutrum pharetra. Aliquam aliquam, ex in aliquet gravida, sapien erat lobortis enim, ac blandit nisi risus non nibh. Suspendisse mauris ipsum, convallis vitae rutrum nec, vehicula eget ligula. Nulla congue condimentum vehicula. Etiam pellentesque interdum neque nec aliquet </p>
                </Body>
                <Footer>
                    <button type="button" class="btn btn-secondary" onClick={() => onPresentModal(false)}>Close</button>
                </Footer>
            </Modal> */}
            <Alert show={showModal} title="Alert" onClose={() => onPresentModal(false)}>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut malesuada sem eu rutrum pharetra. Aliquam aliquam, ex in aliquet gravida, sapien erat lobortis enim, ac blandit nisi risus non nibh. Suspendisse mauris ipsum, convallis vitae rutrum nec, vehicula eget ligula. Nulla congue condimentum vehicula. Etiam pellentesque interdum neque nec aliquet </p>
            </Alert>
            {/* <Confirm show={showModal} title="Alert" onCancel={() => onPresentModal(false)} onAction={() => onPresentModal(false)}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut malesuada sem eu rutrum pharetra. Aliquam aliquam, ex in aliquet gravida, sapien erat lobortis enim, ac blandit nisi risus non nibh. Suspendisse mauris ipsum, convallis vitae rutrum nec, vehicula eget ligula. Nulla congue condimentum vehicula. Etiam pellentesque interdum neque nec aliquet </p>
            </Confirm> */}
        </div>
    )
}

export default withRouter(connect(
    (store, props) => {
        return {
            greeting: store.home.greeting || "",
            showModal: store.home.showModal,
        }
    },
    (dispatch, props) => {
        setTimeout(() => {
            dispatch(welcome(props.match.params.greeting || "Hello world"));
        }, 0);
        return {
            dispatch,
            onPresentModal: (show) => {
                dispatch(presentModal(show));
            },
        }
    }
)(Home));
