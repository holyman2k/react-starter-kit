import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

class Modal extends React.Component {
	componentDidMount() {
		const { onCancel } = this.props;
		const modal = ReactDOM.findDOMNode(this);
		$(modal).on("hidden.bs.modal", function(e) {
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

	componentDidUpdate(prevProps) {
		const modal = ReactDOM.findDOMNode(this);
		if (!prevProps.show && this.props.show) {
			$(modal).modal("show");
		} else if (prevProps.show && !this.props.show) {
			$(modal).modal("hide");
		}
	}

	cancel() {
		const modal = ReactDOM.findDOMNode(this);
		$(modal).modal(modal, "hide");
	}

	render() {
		// update modal height on render
		const modal = ReactDOM.findDOMNode(this);
		$(modal).modal("handleUpdate");
		const { children, title, size = "large" } = this.props;
		const sizeClass = size == "large" ? "modal-lg" : size == "small" ? "modal-sm" : "";
		const Body = Array.isArray(children) ? children.filter(_ => _.type.name == "Body").pop() : children;
		const Footer = Array.isArray(children) ? children.filter(_ => _.type.name == "Footer").pop() : null;

		return (
			<div class="modal fade" tabIndex="-1" role="dialog" data-backdrop="static" data-keyboard="false" data-focus="true">
				<div class={`modal-dialog ${sizeClass}`} role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title">{title}</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">{Body}</div>
						{Footer && <div class="modal-footer">{Footer}</div>}
					</div>
				</div>
			</div>
		);
	}
}

Modal.propTypes = {
	show: PropTypes.bool.isRequired,
	title: PropTypes.string.isRequired,
	children: (propValue, propName, componentName) => {
		if (Array.isArray(propValue)) {
			if (propValue.filter(_ => _.type.name != "Body" && _.type.name != "Footer").length > 0) {
				return new Error(`Invalid prop children supplied to ${componentName}. Children can only contain type Model.Body or Model.Footer`);
			}
		} else if (propValue == null) {
			return new Error(`Invalid prop children supplied to ${componentName}. Children need to contain type Model.Body or Model.Footer`);
		}
	},
	onCancel: PropTypes.func.isRequired,
	size: PropTypes.string // "large", "small", "normal"
};

export default Modal;

export const Body = ({ children }) => {
	return children;
};

export const Footer = ({ children }) => {
	return children;
};

export const Confirm = ({ show, children, title, onCancel, onAction }) => {
	const style = { width: 70 };
	return (
		<Modal show={show} title={title} onCancel={onCancel}>
			<Body>{children}</Body>
			<Footer>
				<button style={style} type="button" class="btn btn-secondary" data-dismiss="modal">
					Cancel
				</button>
				<button style={style} type="button" class="btn btn-primary" onClick={onAction}>
					OK
				</button>
			</Footer>
		</Modal>
	);
};

export const Alert = ({ show, children, title, onClose }) => {
	const style = { width: 70 };
	return (
		<Modal show={show} title={title} onCancel={onClose}>
			<Body>{children}</Body>
			<Footer>
				<button style={style} type="button" class="btn btn-primary" data-dismiss="modal">
					OK
				</button>
			</Footer>
		</Modal>
	);
};
