import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

class Modal extends React.Component {

    componentDidMount() {
        let modal = ReactDOM.findDOMNode(this);
        let props = this.props;
        $(modal).on("hidden.bs.modal", function () {
            props.onCancel();
        });
    }

    componentWillUnmount() {
        let modal = ReactDOM.findDOMNode(this);
        if (modal) {
            $(modal).off("hidden.bs.modal");
            $(modal).modal("hide");
        }
    }

    componentWillReceiveProps(props) {
        const { show } = props;
        const modal = ReactDOM.findDOMNode(this);
        const isHidden = $(modal).css("display") != "block";
        if (show && isHidden) {
            let options = {
                backdrop: "static",
                keyboard: true,
                focus: true,
                show: true,
            };
            $(modal).modal(options);
        } else if (!show && !isHidden) {
            $(modal).modal("hide");
        }
    }
    cancel() {
        let modal = ReactDOM.findDOMNode(this);
        $(modal).modal(modal, "hide");
        this.props.onCancel();
    }

    render() {
        const { show, children, title, onAction, actionButtonTitle = "OK", closeButtonTitle = "Cancel", actionButtonClass = "btn-primary", showButtons = true, size = "large" } = this.props;
        const sizeClass = size == "large" ? "modal-lg" : size == "small" ? "modal-sm" : "";
        console.log(children)
        if (Array.isArray(children)) {

        }
        return (
            <div class="modal fade" tabIndex="-1" role="dialog">
                <div class={`modal-dialog ${sizeClass}`} role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">{title}</h5>
                            <button type="button" class="close" onClick={this.cancel.bind(this)} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            {children}
                        </div>
                        {showButtons &&
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" onClick={this.cancel.bind(this)}>
                                    {closeButtonTitle}
                                </button>
                                <button type="button" class={"btn " + actionButtonClass} onClick={onAction}>
                                    {actionButtonTitle}
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

Modal.propTypes = {
    show: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired,
    onAction: PropTypes.func,
    onCancel: PropTypes.func.isRequired,
    actionButtonTitle: PropTypes.string,
    actionButtonClass: PropTypes.string,
    showButtons: PropTypes.bool,
    size: PropTypes.string,   // "large", "small", "normal"
};

export default Modal;
