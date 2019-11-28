import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {CircularProgress} from "@material-ui/core";
import Button, {ButtonProps} from "@material-ui/core/Button";
const useStyle = makeStyles({
    spinner:{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform:'translate(-50%,-50%)'
    }
});

export interface Props extends ButtonProps {
    buttonComponent?: React.ReactElement<any>,
    spinnerSize?: number,
    loading: boolean
}

const SHOW_SPINNER_DELAY = 250;

export default function ControlledDebounceButton({disabled, onClick, spinnerSize, buttonComponent, children, color, variant, loading, ...others}: Props) {
    const styles = useStyle();
    const [showLoadingAnimation, setShowLoadingAnimation] = React.useState(false);

    if(buttonComponent && children) {
        console.warn("DebounceButton: children doesn't work with external buttonComponent. Consider putting children into buttonComponent instead.")
    }

    React.useEffect(()=>{
        if(!loading) {
            setShowLoadingAnimation(false);
            return;
        }
        const timer = setTimeout(()=>{
            setShowLoadingAnimation(true)
        }, SHOW_SPINNER_DELAY);
        return ()=>{
            clearTimeout(timer);
        }
    }, [loading]);

    const propsOnButton = {
        disabled: showLoadingAnimation || disabled,
        onClick,
        color: color as any,
        variant: variant,
        ...others
    } as any;
    const button = buttonComponent ? React.cloneElement(buttonComponent,propsOnButton)
        : React.createElement(Button,propsOnButton,children);
    return <div style={{position:"relative",display:'inline-block'}}>
        {button}
        {showLoadingAnimation && <div className={styles.spinner}><CircularProgress size={spinnerSize || 24} /></div>}
    </div>
}