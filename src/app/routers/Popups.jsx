import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { presentModal } from "../actions/homeActions";
import Modal, { Footer, Body, Alert, Confirm } from "../components/Modal.jsx";

const Home = ({ showModal, onPresentModal }) => {
    return (
        <div>
            <h1>Popups</h1>
            <button class="btn btn-info" onClick={() => onPresentModal(true)}>
                Modal
            </button>

            {/* <Modal show={showModal} title="Alert" onCancel={() => onPresentModal(false)} onAction={() => onPresentModal(false)}>
                <Body>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut malesuada sem eu rutrum pharetra. Aliquam aliquam, ex in aliquet gravida, sapien erat lobortis enim, ac blandit nisi risus non nibh. Suspendisse mauris ipsum, convallis vitae rutrum nec, vehicula eget ligula. Nulla congue condimentum vehicula. Etiam pellentesque interdum neque nec aliquet </p>
                </Body>
                <Footer>
                    <button type="button" class="btn btn-secondary" onClick={() => onPresentModal(false)}>Close</button>
                </Footer>
            </Modal> */}
            <Alert show={showModal} title="Alert" onClose={() => onPresentModal(false)}>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut malesuada sem eu rutrum pharetra. Aliquam aliquam, ex in aliquet
                    gravida, sapien erat lobortis enim, ac blandit nisi risus non nibh. Suspendisse mauris ipsum, convallis vitae rutrum nec, vehicula
                    eget ligula. Nulla congue condimentum vehicula. Etiam pellentesque interdum neque nec aliquet{" "}
                </p>
            </Alert>
            {/* <Confirm show={showModal} title="Alert" onCancel={() => onPresentModal(false)} onAction={() => onPresentModal(false)}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut malesuada sem eu rutrum pharetra. Aliquam aliquam, ex in aliquet gravida, sapien erat lobortis enim, ac blandit nisi risus non nibh. Suspendisse mauris ipsum, convallis vitae rutrum nec, vehicula eget ligula. Nulla congue condimentum vehicula. Etiam pellentesque interdum neque nec aliquet </p>
            </Confirm> */}
        </div>
    );
};

export default withRouter(
    connect(
        (store, props) => {
            return {
                showModal: store.home.showModal
            };
        },
        (dispatch, props) => {
            return {
                dispatch,
                onPresentModal: show => {
                    dispatch(presentModal(show));
                }
            };
        }
    )(Home)
);
