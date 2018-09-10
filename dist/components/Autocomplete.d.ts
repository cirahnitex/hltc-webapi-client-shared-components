import * as React from 'react';
import { ControllerStateAndHelpers } from 'downshift';
interface Props {
    suggestions: string[];
    label: string;
    value?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
    allowArbitraryInput?: boolean;
}
interface State {
    inputFocused: boolean;
    open: boolean;
}
declare class AutoComplete extends React.Component<Props, State> {
    state: State;
    handleInputFocus: () => void;
    handleDownshiftOuterClick: () => void;
    handleInputValueChange: (val: string, helper: ControllerStateAndHelpers<string>) => void;
    handleItemSelect: () => void;
    render(): JSX.Element;
}
export default AutoComplete;
