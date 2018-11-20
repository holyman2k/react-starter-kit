import React from "react";
import Transition from "react-transition-group/Transition";

const defautDuration = 1000;
const renderDelay = 200;

export class Fade extends React.Component {
    constructor(props) {
        super();
        const duration = props.duration || defautDuration;
        this.state = {
            fade: props.fade,
            duration: duration,
            delay: props.delay || 0
        };
    }

    getDelay() {
        return this.state.delay;
    }
    getDuration() {
        return this.state.duration;
    }

    componentDidMount() {
        const { fade, delay } = this.state;
        const duration = this.props.duration || defautDuration;
        const fadeToken = setTimeout(() => {
            this.setState({ fade: !fade });
        }, renderDelay + delay);
        this.setState({ fadeToken });
    }

    componentWillUnmount() {
        clearTimeout(this.state.fadeToken);
    }

    render() {
        const { children } = this.props;
        const { fade, duration, delay } = this.state;

        const defaultStyle = {
            transition: `opacity ${duration}ms ease-in-out`,
            opacity: 0
        };

        const transitionStyles = {
            entering: { opacity: 1 },
            entered: { opacity: 1 },
            existed: { opacity: 0 }
        };

        return (
            <Transition in={fade} timeout={duration}>
                {state => {
                    return (
                        <div
                            style={{
                                ...defaultStyle,
                                ...transitionStyles[state]
                            }}
                        >
                            {children}
                        </div>
                    );
                }}
            </Transition>
        );
    }
}

export class FadeIn extends Fade {
    constructor(props) {
        super({ ...props, fade: false });
    }
}
export class FadeOut extends Fade {
    constructor(props) {
        super({ ...props, fade: true });
    }
}

export class FadeInOut extends Fade {
    constructor(props) {
        const duration = (props.duration || defautDuration) / 2;
        super({ ...props, fade: false, duration: duration });
    }

    componentDidMount() {
        super.componentDidMount();
        const delay = this.getDelay();
        const duration = this.getDuration();
        const fadeInOutToken = setTimeout(() => {
            this.setState({ fade: false });
        }, delay + renderDelay + duration);

        this.setState({ fadeInOutToken });
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        clearTimeout(this.state.fadeInOutToken);
    }
}
