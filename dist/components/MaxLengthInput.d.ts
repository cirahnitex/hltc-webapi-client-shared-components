import * as React from 'react';
interface Props {
    label?: string;
    maxLength: number;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    style?: React.CSSProperties;
    fullWidth?: boolean;
}
interface State {
    value: string;
}
declare class MaxLengthInput extends React.Component<Props, State> {
    constructor(props: Props);
    handleChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void;
    static getLength(val: Array<any> | string | null): number;
    render(): JSX.Element;
}
export default MaxLengthInput;
