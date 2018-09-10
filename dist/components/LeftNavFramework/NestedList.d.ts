import * as React from 'react';
export declare type ListEntry = {
    caption: string | React.ReactFragment;
    nextLevel: ListEntry[] | null;
};
export interface Props {
    items: ListEntry[];
    path: number[];
    onRequestPathChange: (path: number[]) => void;
    indentLevel?: number;
}
interface State {
    isExpanded: boolean[];
}
export default class NestedList extends React.PureComponent<Props, State> {
    handleChildrenPathChange: ((path: number[]) => void)[];
    handleChildrenClick: ((e: any) => void)[];
    constructor(props: Props);
    setEventHandler(props: Props): void;
    componentWillReceiveProps(props: Props): void;
    renderListEntry(index: number): React.ReactFragment;
    render(): JSX.Element;
}
export {};
