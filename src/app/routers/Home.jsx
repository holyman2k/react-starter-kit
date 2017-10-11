import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom"
import { welcome, modalAction } from "../actions/homeActions";
import { Button, Header, Image, Modal } from 'semantic-ui-react'


const Home = ({ greeting, openModal, modalClick }) => {
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

            <br />

            <a href="#" onClick={e => modalClick(e, true)}>Modal</a>

            <Modal
                size="mini"
                open={openModal}
                closeOnEscape={true}
                closeOnRootNodeClick={false}
                onClose={e => modalClick(e, false)}>
                <Modal.Header>
                    Delete Your Account
                </Modal.Header>
                    <Modal.Content>
                        <p>Are you sure you want to delete your account</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={e => modalClick(e, false)}>No</Button>
                        <Button positive onClick={e => modalClick(e, false)}>Yes</Button>
                    </Modal.Actions>
                </Modal>
        </div>
    )
}

export default withRouter(connect(
    (store, props) => {
        return {
            greeting: store.home.greeting,
            openModal: store.home.openModal || false,
        }
    },
    (dispatch, props) => {
        setTimeout(() => {
            dispatch(welcome(props.match.params.greeting || "Hello"));
        }, 0);
        return {
            dispatch,
            modalClick: (e, open) => {
                if (e) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                dispatch(modalAction(open));
            }
        }
    }
)(Home));
