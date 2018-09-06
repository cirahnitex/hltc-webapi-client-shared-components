import * as React from 'react';
import Downshift, {ControllerStateAndHelpers} from 'downshift';
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import TextField from "@material-ui/core/TextField/TextField";
import Paper from "@material-ui/core/Paper/Paper";


function renderSuggestion(suggestion: string, index: number, itemProps: any, highlightedIndex: number|null, selectedValue: string) {
    const isHighlighted = highlightedIndex === index;
    const isSelected = selectedValue === suggestion;

    return (
        <MenuItem
            {...itemProps}
            key={suggestion}
            selected={isHighlighted}
            component="div"
            style={{
                fontWeight: isSelected ? 500 : 400,
            }}
        >
            {suggestion}
        </MenuItem>
    );
}

function getSuggestions(suggestions: string[], inputValue: string|null) {
    if(!inputValue) return suggestions;

    let count = 0;

    return suggestions.filter(suggestion => {
        const keep =
            (!inputValue || suggestion.toLowerCase().includes(inputValue.toLowerCase())) &&
            count < 5;

        if (keep) {
            count += 1;
        }

        return keep;
    });
}

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

class AutoComplete extends React.Component<Props, State> {
    state: State = {inputFocused: false, open:false};
    handleInputFocus = () => this.setState({open: true});
    handleDownshiftOuterClick = () => {
        this.setState({open:false});
    };
    handleInputValueChange = (val:string, helper:ControllerStateAndHelpers<string>) => {
        if(this.props.allowArbitraryInput && (val === helper.selectedItem || val.length<=0)) {
            if((helper as any as {type:string}).type === '__autocomplete_mouseup__') {
                return;
            }
        }
        if(this.props.onChange)this.props.onChange(val);
    };
    handleItemSelect = () => {
        this.setState({open:false});
    };
    render() {
        const {suggestions, label, value, disabled} = this.props;

        return (
            <Downshift inputValue={value} onInputValueChange={this.handleInputValueChange} onOuterClick={this.handleDownshiftOuterClick}  isOpen={!disabled && this.state.open} onSelect={this.handleItemSelect}>
                {({getInputProps, getItemProps, isOpen, inputValue, selectedItem, highlightedIndex}) => <div>
                    <TextField fullWidth label={label} InputProps={getInputProps()} disabled={disabled}
                               onFocus={this.handleInputFocus}/>
                    {isOpen &&
                    <Paper square style={{position: "absolute", zIndex: 2}}>
                        {getSuggestions(suggestions, inputValue).map((suggestion, index) =>
                            renderSuggestion(suggestion, index, getItemProps({item: suggestion}), highlightedIndex, selectedItem)
                        )}
                    </Paper>}
                </div>}
            </Downshift>
        );
    }
}

export default AutoComplete;