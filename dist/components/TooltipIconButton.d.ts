import * as React from 'react';
import { IconButtonProps } from "@material-ui/core/IconButton/IconButton";
interface Props extends IconButtonProps {
    title: string;
    children: React.ReactFragment;
    placement?: 'bottom-end' | 'bottom-start' | 'bottom' | 'left-end' | 'left-start' | 'left' | 'right-end' | 'right-start' | 'right' | 'top-end' | 'top-start' | 'top';
    open?: boolean;
}
declare class TooltipIconButton extends React.Component<Props, {}> {
    render(): JSX.Element;
}
export default TooltipIconButton;
