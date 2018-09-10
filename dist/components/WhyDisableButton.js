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
import DebounceButton from "./DebounceButton";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
var WhyDisableButton = function (props) {
    var disableReason = props.disableReason, tooltipPlacement = props.tooltipPlacement, others = __rest(props, ["disableReason", "tooltipPlacement"]);
    return (React.createElement(Tooltip, { placement: tooltipPlacement, title: disableReason, enterDelay: disableReason ? 0 : 99999 },
        React.createElement("div", null,
            React.createElement(DebounceButton, __assign({}, others, { disabled: !!disableReason })))));
};
export default WhyDisableButton;
//# sourceMappingURL=WhyDisableButton.js.map