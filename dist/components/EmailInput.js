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
import TextMask from 'react-text-mask';
import emailMask from 'text-mask-addons/dist/emailMask';
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";
var EmailMask = /** @class */ (function (_super) {
    __extends(EmailMask, _super);
    function EmailMask() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmailMask.prototype.render = function () {
        return React.createElement(TextMask, __assign({}, this.props, { mask: emailMask, showMask: true }));
    };
    return EmailMask;
}(React.Component));
var EmailInput = function (props) { return (React.createElement(FormControl, null,
    React.createElement(InputLabel, null, props.label || "Email"),
    React.createElement(Input, { value: props.value, inputComponent: EmailMask, onChange: props.onChange }))); };
function validateEmail(email) {
    return email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
}
export default EmailInput;
export { validateEmail };
//# sourceMappingURL=EmailInput.js.map