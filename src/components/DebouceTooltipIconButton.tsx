import * as React from 'react';
import DebounceButton from "./DebounceButton";
import TooltipIconButton from "./TooltipIconButton";

interface Props {
    onClick: ()=>Promise<any>;
    children: React.ReactFragment;
    title: string;
    placement?: 'bottom-end'
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
    color?: string;
}

class DebouceTooltipIconButton extends React.Component<Props, {}> {
    render() {
        const {children, title, placement, ...others} = this.props;
        return <DebounceButton
            spinnerSize={40}
            buttonComponent={<TooltipIconButton title={title} placement={placement}>{children}</TooltipIconButton>}
            {...others}
        />
    }
}

export default DebouceTooltipIconButton;