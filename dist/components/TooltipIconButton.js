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
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import IconButton from "@material-ui/core/IconButton/IconButton";
var TooltipIconButton = /** @class */ (function (_super) {
    __extends(TooltipIconButton, _super);
    function TooltipIconButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TooltipIconButton.prototype.render = function () {
        var _a = this.props, title = _a.title, children = _a.children, placement = _a.placement, open = _a.open, others = __rest(_a, ["title", "children", "placement", "open"]);
        return React.createElement("div", null,
            React.createElement(Tooltip, { title: title.replace(/ /g, '\xA0'), placement: placement, open: open },
                React.createElement("div", { style: { display: "inline-block" } },
                    React.createElement(IconButton, __assign({}, others), children))));
    };
    return TooltipIconButton;
}(React.Component));
export default TooltipIconButton;
//# sourceMappingURL=TooltipIconButton.js.map