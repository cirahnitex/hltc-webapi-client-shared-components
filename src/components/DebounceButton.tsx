import * as React from 'react';
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Button from "@material-ui/core/Button/Button";

const delayRandomly = ()=>new Promise(resolve=>setTimeout(resolve,500+Math.random()*1000));

export interface Props {
    buttonComponent?: React.ReactElement<any>,
    onClick: ()=>any,
    disabled?: boolean,
    spinnerSize?: number,
    dense?: boolean,
    color?: string,
    variant?: string,
    children?: React.ReactFragment,
}
interface State {
    loading: boolean,
    showLoadingAnimation: boolean,
}
class DebounceButton extends React.Component<Props, State> {
    _isMounted = false;
    state: State;
    startAnimationTimeout: any;
    constructor(props:Props) {
        super(props);
        this.startAnimationTimeout = 0;
        this.state = {
            loading: false,
            showLoadingAnimation: false,
        }
    }
    componentDidMount() {
        this._isMounted = true;
    }
    componentWillMount(): void {
        this._isMounted = false;
    }

    async handleButtonClick() {
        if(this.state.loading) return;
        this.setState({loading:true});

        this.startAnimationTimeout = setTimeout(()=>{
            if(!this._isMounted) return;
            this.setState({
                showLoadingAnimation: true,
            })
        }, 300);

        const onClick = this.props.onClick || delayRandomly;
        const p = onClick();
        await p;
        clearTimeout(this.startAnimationTimeout);
        this.startAnimationTimeout = 0;
        if(!this._isMounted) return;
        this.setState({loading:false,showLoadingAnimation:false});
    }
    render() {
        const spinnerStyle = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform:'translate(-50%,-50%)'
        } as React.CSSProperties;
        const {disabled, onClick, spinnerSize, buttonComponent, children, color, variant, ...others} = this.props;

        if(buttonComponent && children) {
            console.warn("DebounceButton: children doesn't work with external buttonComponent. Consider putting children into buttonComponent instead.")
        }

        const propsOnButton = {
            disabled: this.state.showLoadingAnimation || disabled,
            onClick:()=>this.handleButtonClick(),
            color: color as any,
            variant: variant,
            ...others
        } as any;
        const button = buttonComponent ? React.cloneElement(buttonComponent,propsOnButton)
            : React.createElement(Button,propsOnButton,children);
        return <div style={{position:"relative",display:'inline-block'}}>
            {button}
            {this.state.showLoadingAnimation && <div style={spinnerStyle}><CircularProgress size={spinnerSize || 24} /></div>}
        </div>
    }
}

export default DebounceButton;