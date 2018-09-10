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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import * as React from 'react';
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
var MaxLengthInput = /** @class */ (function (_super) {
    __extends(MaxLengthInput, _super);
    function MaxLengthInput(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            value: "",
        };
        return _this;
    }
    MaxLengthInput.prototype.handleChange = function (e) {
        if (MaxLengthInput.getLength(e.target.value) > this.props.maxLength) {
            e.target.value = e.target.value.substr(0, this.props.maxLength);
        }
        if (this.props.onChange) {
            this.props.onChange(e);
        }
        this.setState({ value: e.target.value });
    };
    MaxLengthInput.getLength = function (val) {
        return val ? val.length : 0;
    };
    MaxLengthInput.prototype.render = function () {
        var _this = this;
        var _a = this.props, label = _a.label, maxLength = _a.maxLength, value = _a.value, onChange = _a.onChange, others = __rest(_a, ["label", "maxLength", "value", "onChange"]);
        if (typeof (value) === 'undefined') {
            value = this.state.value;
        }
        return React.createElement(FormControl, __assign({}, others),
            label && React.createElement(InputLabel, null, label),
            React.createElement(Input, { value: value, onChange: function (e) { return _this.handleChange(e); } }),
            React.createElement(FormHelperText, null,
                MaxLengthInput.getLength(value),
                "/",
                maxLength));
    };
    return MaxLengthInput;
}(React.Component));
export default MaxLengthInput;
//# sourceMappingURL=MaxLengthInput.js.map