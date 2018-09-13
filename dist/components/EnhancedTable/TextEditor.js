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
import * as React from "react";
import Input from "@material-ui/core/Input/Input";
import Button from "@material-ui/core/Button/Button";
import { style } from "typestyle";
var rootCss = style({
    display: "flex",
    flexDirection: "column",
});
var btnWrap = style({
    margin: '8px -16px 0px -16px',
    display: "flex",
    justifyContent: "flex-end"
});
var TextEditor = /** @class */ (function (_super) {
    __extends(TextEditor, _super);
    function TextEditor(props) {
        var _this = _super.call(this, props) || this;
        _this.handleEditingValueChange = function (e) { _this.setState({ editingValue: e.target.value }); };
        _this.handleSubmit = function () { return _this.props.onRequestValueChange(_this.state.editingValue); };
        _this.state = {
            editingValue: props.value
        };
        return _this;
    }
    TextEditor.prototype.render = function () {
        var value = this.props.value;
        var editingValue = this.state.editingValue;
        return React.createElement("div", { className: rootCss },
            React.createElement(Input, { value: editingValue, onChange: this.handleEditingValueChange }),
            React.createElement("div", { className: btnWrap },
                React.createElement(Button, { color: "primary", disabled: value === editingValue, onClick: this.handleSubmit }, "SAVE")));
    };
    return TextEditor;
}(React.PureComponent));
export default TextEditor;
//# sourceMappingURL=TextEditor.js.map