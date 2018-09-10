import * as React from 'react';
interface Props {
    onClick: () => Promise<any>;
    children: React.ReactFragment;
    title: string;
    placement?: 'bottom-end' | 'bottom-start' | 'bottom' | 'left-end' | 'left-start' | 'left' | 'right-end' | 'right-start' | 'right' | 'top-end' | 'top-start' | 'top';
    color?: string;
}
declare class DebouceTooltipIconButton extends React.Component<Props, {}> {
    render(): JSX.Element;
}
export default DebouceTooltipIconButton;
