import * as React from 'react';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton, {IconButtonProps} from "@material-ui/core/IconButton";

interface Props extends IconButtonProps {
    title: string;
    children: React.ReactFragment;
    placement?: | 'bottom-end'
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
    open?: boolean;
}

class TooltipIconButton extends React.Component<Props,{}> {
    render() {
        const {title, children, placement, open, ...others} = this.props;
        return <div>
            <Tooltip title={title.replace(/ /g,'\xA0')}
                     placement={placement}
                     open={open}
            >
                <div style={{display:"inline-block"}}><IconButton {...others}>{children}</IconButton></div>
            </Tooltip>
        </div>
    }
}

export default TooltipIconButton;