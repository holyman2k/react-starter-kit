import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom"
import { welcome, presentModal } from "../actions/homeActions";
import Modal from "../components/Modal.jsx"

const Home = ({ greeting, showModal, onPresentModal }) => {
    return (
        <div>
            <h1>{greeting}</h1>

            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porta aliquam gravida. Nulla lobortis aliquet purus vel venenatis. Aliquam eget porta sapien. Cras sodales metus in nunc porta consectetur. Etiam lobortis ultrices nulla, ac lobortis neque lobortis vitae. Fusce pellentesque posuere dui in iaculis. Mauris elit elit, condimentum quis ex nec, aliquet euismod turpis.
            </p>

            <p>
                Etiam interdum urna lacus, at tempor urna aliquet et. Proin at justo varius magna luctus dignissim. Quisque ac dignissim odio. Ut congue arcu ligula, et sollicitudin tellus dictum eget. Vivamus risus massa, posuere nec tristique eget, auctor vitae lorem. Sed viverra neque dui, ut dapibus tellus tempor eu. Curabitur dignissim ante nec iaculis venenatis. Aenean quis eros pulvinar, auctor lorem nec, consectetur leo. Ut sodales nunc pretium justo sodales, quis varius leo luctus.
            </p>

            <Link to="/Ni Hao" class="btn btn-primary">Ni Hao</Link>

            <button class="btn btn-info" onClick={() => onPresentModal(true)}>Modal</button>

            <Modal show={showModal} title="Alert" onCancel={() => onPresentModal(false)} onAction={() => onPresentModal(false)} >
                <h1>Hello world</h1>
            </Modal>
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
            dispatch(welcome(props.match.params.greeting || "Hello"));
        }, 0);
        return {
            dispatch,
            onPresentModal: (show) => {
                dispatch(presentModal(show));
            },
        }
    }
)(Home));
