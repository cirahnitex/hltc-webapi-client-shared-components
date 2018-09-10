import * as React from 'react';
export interface Props {
    buttonComponent?: React.ReactElement<any>;
    onClick: () => any;
    disabled?: boolean;
    spinnerSize?: number;
    dense?: boolean;
    color?: string;
    raised?: boolean;
    variant?: string;
}
interface State {
    loading: boolean;
    showLoadingAnimation: boolean;
}
declare class DebounceButton extends React.Component<Props, State> {
    state: State;
    startAnimationTimeout: any;
    constructor(props: Props);
    handleButtonClick(): Promise<void>;
    render(): JSX.Element;
}
export default DebounceButton;
