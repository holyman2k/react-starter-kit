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
        // auto focus on modal 
        $(modal).on("show.bs.modal", function () {
            setTimeout(() => {
                $(modal).focus()
            }, 200);
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
        const isVisible = $(modal).css("display") == "block";
        if (show && !isVisible) {
            let options = {
                backdrop: "static",
                keyboard: true
            };
            $(modal).modal(options);
        } else if (!show && isVisible) {
            $(modal).modal("hide");
        }
    }

    cancel() {
        let modal = ReactDOM.findDOMNode(this);
        $(modal).modal(modal, "hide");
        this.props.onCancel();
    }

    render() {
        const { show, children, title, onAction, actionButtonTitle = "OK", actionButtonClass = "btn-primary", closeButtonTitle = "Cancel", showButtons = true, size = "large" } = this.props;
        const sizeClass = size == "large" ? "modal-lg" : size == "small" ? "modal-sm" : "";
        return (
            <div class="modal" tabIndex="-1" role="dialog">
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
                        {!showButtons ||
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" onClick={this.cancel.bind(this)}>
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
            // <div class="modal fade" data-backdrop="static" tabIndex="-1" role="dialog">
            //     {!show ||
            //     <div class={`modal-dialog ${sizeClass}`} role="document">
            //         <div class="modal-content">
            //             <div class="modal-header">
            //                 <button type="button" class="close" onClick={this.cancel.bind(this)} aria-label="Close">
            //                     <span aria-hidden="true">&times;</span>
            //                 </button>
            //                 <h4 class="modal-title"><b>{title}</b></h4>
            //             </div>
            //             <div class="modal-body">
            //                 {children}
            //             </div>
            // {!showButtons ||
            // <div class="modal-footer">
            //     <button type="button" class="btn btn-default" onClick={this.cancel.bind(this)}>
            //         {closeButtonTitle}
            //     </button>
            //     <button type="button" class={"btn " + actionButtonClass} onClick={onAction}>
            //         {actionButtonTitle}
            //     </button>
            // </div>
            // }
            //         </div>
            //     </div>
            //     }
            // </div>
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
