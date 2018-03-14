import React from "react";
import Transition from 'react-transition-group/Transition';

class Fade extends React.Component {

    constructor() {
        super();
        this.state = {
            fade: false
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ fade: true });
        }, 0);
    }

    render() {
        const { duration, children } = this.props;

        const defaultStyle = {
            transition: `opacity ${duration}ms ease-in-out`,
            opacity: 0,
        }

        const transitionStyles = {
            entering: { opacity: 0 },
            entered: { opacity: 1 },
        };
        return (
            <Transition in={this.state.fade} timeout={duration}>
                {(state) => (
                    <div style={{
                        ...defaultStyle,
                        ...transitionStyles[state]
                    }}>
                        {children}
                    </div>
                )}
            </Transition>
        )
    }
};

export default Fade;