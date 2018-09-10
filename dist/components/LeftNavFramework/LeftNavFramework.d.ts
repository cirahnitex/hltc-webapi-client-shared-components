import * as React from 'react';
export interface NavItem {
    caption: string | React.ReactFragment;
    content: NavItem[] | React.ReactChild;
}
export interface Props {
    title: string;
    subTitle?: string;
    items: NavItem[];
    appBarAddons?: React.ReactChild[];
}
interface State {
    path: number[];
    mobileOpen: boolean;
}
export default class LeftNavFramework extends React.PureComponent<Props, State> {
    constructor(props: Props);
    handlePathChange: (path: number[]) => void;
    getPathItem(path: number[], navItems: NavItem[]): NavItem | null;
    handleDrawerToggle: () => void;
    renderAppbarAddons(): JSX.Element[] | null;
    render(): JSX.Element;
}
export {};
