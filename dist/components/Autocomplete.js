var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from 'react';
import Downshift from 'downshift';
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import TextField from "@material-ui/core/TextField/TextField";
import Paper from "@material-ui/core/Paper/Paper";
function renderSuggestion(suggestion, index, itemProps, highlightedIndex, selectedValue) {
    var isHighlighted = highlightedIndex === index;
    var isSelected = selectedValue === suggestion;
    return (React.createElement(MenuItem, __assign({}, itemProps, { key: suggestion, selected: isHighlighted, component: "div", style: {
            fontWeight: isSelected ? 500 : 400,
        } }), suggestion));
}
function getSuggestions(suggestions, inputValue) {
    if (!inputValue)
        return suggestions;
    var count = 0;
    return suggestions.filter(function (suggestion) {
        var keep = (!inputValue || suggestion.toLowerCase().includes(inputValue.toLowerCase())) &&
            count < 5;
        if (keep) {
            count += 1;
        }
        return keep;
    });
}
var AutoComplete = /** @class */ (function (_super) {
    __extends(AutoComplete, _super);
    function AutoComplete() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { inputFocused: false, open: false };
        _this.handleInputFocus = function () { return _this.setState({ open: true }); };
        _this.handleDownshiftOuterClick = function () {
            _this.setState({ open: false });
        };
        _this.handleInputValueChange = function (val, helper) {
            if (_this.props.allowArbitraryInput && (val === helper.selectedItem || val.length <= 0)) {
                if (helper.type === '__autocomplete_mouseup__') {
                    return;
                }
            }
            if (_this.props.onChange)
                _this.props.onChange(val);
        };
        _this.handleItemSelect = function () {
            _this.setState({ open: false });
        };
        return _this;
    }
    AutoComplete.prototype.render = function () {
        var _this = this;
        var _a = this.props, suggestions = _a.suggestions, label = _a.label, value = _a.value, disabled = _a.disabled;
        return (React.createElement(Downshift, { inputValue: value, onInputValueChange: this.handleInputValueChange, onOuterClick: this.handleDownshiftOuterClick, isOpen: !disabled && this.state.open, onSelect: this.handleItemSelect }, function (_a) {
            var getInputProps = _a.getInputProps, getItemProps = _a.getItemProps, isOpen = _a.isOpen, inputValue = _a.inputValue, selectedItem = _a.selectedItem, highlightedIndex = _a.highlightedIndex;
            return React.createElement("div", null,
                React.createElement(TextField, { fullWidth: true, label: label, InputProps: getInputProps(), disabled: disabled, onFocus: _this.handleInputFocus }),
                isOpen &&
                    React.createElement(Paper, { square: true, style: { position: "absolute", zIndex: 2 } }, getSuggestions(suggestions, inputValue).map(function (suggestion, index) {
                        return renderSuggestion(suggestion, index, getItemProps({ item: suggestion }), highlightedIndex, selectedItem);
                    })));
        }));
    };
    return AutoComplete;
}(React.Component));
export default AutoComplete;
//# sourceMappingURL=Autocomplete.js.map