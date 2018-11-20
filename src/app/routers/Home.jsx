import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { welcome } from "../actions/homeActions";

const Home = ({ greeting, showModal, onPresentModal }) => {
    return (
        <div>
            <div class="jumbotron">
                <h1 class="display-4">{greeting}</h1>
                <p class="lead">
                    This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.
                </p>
                <hr class="my-4" />
                <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                <p class="lead">
                    <Link to="/Ni Hao" class="btn btn-primary">
                        Ni Hao
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default withRouter(
    connect(
        (store, props) => {
            return {
                greeting: store.home.greeting || "",
                showModal: store.home.showModal
            };
        },
        (dispatch, props) => {
            setTimeout(() => {
                dispatch(welcome(props.match.params.greeting || "Hello world"));
            }, 0);
            return {
                dispatch,
                onPresentModal: show => {
                    dispatch(presentModal(show));
                }
            };
        }
    )(Home)
);
