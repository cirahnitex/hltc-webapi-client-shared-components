import * as React from "react";
interface Props {
    value: number;
    onRequestValueChange: (value: number) => any;
}
interface State {
    editingValue: string;
}
export default class IntegerEditor extends React.PureComponent<Props, State> {
    constructor(props: Props);
    handleEditingValueChange: (e: any) => void;
    handleSubmit: () => any;
    render(): JSX.Element;
}
export {};
