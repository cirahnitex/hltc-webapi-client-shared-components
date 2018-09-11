import * as React from 'react';
declare type AddonToReactElement = (addonWrap: HTMLDivElement) => React.ReactElement<any>;
export interface NavItem {
    caption: string | React.ReactFragment;
    content: NavItem[] | React.ReactElement<any> | AddonToReactElement;
}
export interface Props {
    title: string;
    subTitle?: string;
    items: NavItem[];
}
interface State {
    path: number[];
    mobileOpen: boolean;
    appBarAddonWrapEl: HTMLDivElement | null;
}
export default class LeftNavFramework extends React.PureComponent<Props, State> {
    constructor(props: Props);
    handlePathChange: (path: number[]) => void;
    getPathItem(path: number[], navItems: NavItem[]): NavItem | null;
    handleDrawerToggle: () => void;
    handleAppBarAddonEl: (node: HTMLDivElement | null) => void | null;
    renderMain(content: React.ReactElement<any> | AddonToReactElement): React.ReactElement<any> | null;
    render(): JSX.Element;
}
export {};
