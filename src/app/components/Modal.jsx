import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

class Modal extends React.Component {

    componentDidMount() {
        const { onCancel } = this.props;
        const modal = ReactDOM.findDOMNode(this);
        $(modal).on("hidden.bs.modal", function (e) {
            onCancel();
        });
    }

    componentWillUnmount() {
        const modal = ReactDOM.findDOMNode(this);
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
            $(modal).modal("show");
        } else if (!show && !isHidden) {
            $(modal).modal("hide");
        }
    }

    cancel() {
        const modal = ReactDOM.findDOMNode(this);
        $(modal).modal(modal, "hide");
    }

    render() {
        const { show, children, title, size = "large" } = this.props;
        const sizeClass = size == "large" ? "modal-lg" : size == "small" ? "modal-sm" : "";
        const Body = Array.isArray(children) ? children.filter(_ => _.type.name == "Body").pop() : null;
        const Footer = Array.isArray(children) ? children.filter(_ => _.type.name == "Footer").pop() : null;
        const showButtons = Body == null && Footer == null;

        return (
            <div class="modal fade" tabIndex="-1" role="dialog" data-backdrop="static" data-keyboard="true" data-focus="true">
                <div class={`modal-dialog ${sizeClass}`} role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">{title}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">{Body}</div>
                        <div class="modal-footer">{Footer}</div>
                    </div>
                </div>
            </div>
        )
    }
}

Modal.propTypes = {
    show: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(function (propValue, key, componentName, location, propFullName) {
        if (!Array.isArray(propValue) || propValue.filter(_ => _.type.name != "Body" && _.type.name != "Footer").length > 0) {
            return new Error(`Invalid prop children supplied to ${componentName}. Children can only contain type Model.Body or Model.Footer`);
        }
    }),
    onCancel: PropTypes.func.isRequired,
    size: PropTypes.string,   // "large", "small", "normal"
};

export default Modal;

export const Body = ({ children }) => {
    return children;
}


export const Footer = ({ children }) => {
    return children;
}

export const Confirm = ({ show, children, title, onCancel, onAction }) => {
    const style = { width: 70 }
    return (
        <Modal show={show} title={title} onCancel={onCancel}>
            <Body>{children}</Body>
            <Footer>
                <button style={style} type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button style={style} type="button" class="btn btn-primary" onClick={onAction}>OK</button>
            </Footer>
        </Modal>
    )
}

export const Alert = ({ show, children, title, onClose }) => {
    return (
        <Modal show={show} title={title} onCancel={onClose}>
            <Body>{children}</Body>
            <Footer>
                <button type="button" class="btn btn-primary" data-dismiss="modal">OK</button>
            </Footer>
        </Modal>
    )
}