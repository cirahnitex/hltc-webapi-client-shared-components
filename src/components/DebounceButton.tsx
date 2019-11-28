import * as React from 'react';
import ControlledDebounceButton from "./ControlledDebounceButton";
import {ButtonProps} from "@material-ui/core/Button";

export interface Props extends ButtonProps {
    buttonComponent?: React.ReactElement<any>,
    onClick: ()=>any,
    spinnerSize?: number
}

export default function DebounceButton({onClick, ...otherProps}:Props) {
    const [loading, setLoading] = React.useState(false);
    async function handleButtonClick() {
        if(loading) return;
        setLoading(true);
        await onClick();
        setLoading(false);
    }
    return <ControlledDebounceButton onClick={handleButtonClick} loading={loading} {...otherProps} />
}
