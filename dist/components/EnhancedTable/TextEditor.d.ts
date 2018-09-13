import * as React from "react";
interface Props {
    value: string;
    onRequestValueChange: (value: string) => any;
}
interface State {
    editingValue: string;
}
export default class TextEditor extends React.PureComponent<Props, State> {
    constructor(props: Props);
    handleEditingValueChange: (e: any) => void;
    handleSubmit: () => any;
    render(): JSX.Element;
}
export {};
