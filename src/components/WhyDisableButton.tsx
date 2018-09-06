import * as React from 'react';
import DebounceButton, {Props as DebounceBtnProps} from "./DebounceButton";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";

interface Props extends DebounceBtnProps {
    disableReason: string|null;
    tooltipPlacement?: 'bottom-end'
        | 'bottom-start'
        | 'bottom'
        | 'left-end'
        | 'left-start'
        | 'left'
        | 'right-end'
        | 'right-start'
        | 'right'
        | 'top-end'
        | 'top-start'
        | 'top';
}

const WhyDisableButton = (props:Props) => {
    const {disableReason, tooltipPlacement, ...others} = props;
    return (
        <Tooltip placement={tooltipPlacement} title={disableReason} enterDelay={disableReason ? 0 : 99999}>
            <div><DebounceButton {...others} disabled={!!disableReason} /></div>
        </Tooltip>
    );
};

export default WhyDisableButton;