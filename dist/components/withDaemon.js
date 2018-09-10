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
export function withDaemon(Comp, daemonTask, interval) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.refreshDaemon = 0;
            return _this;
        }
        class_1.prototype.componentWillMount = function () {
            daemonTask();
            if (!this.refreshDaemon)
                this.refreshDaemon = window.setInterval(daemonTask, interval);
        };
        class_1.prototype.componentWillUnmount = function () {
            clearInterval(this.refreshDaemon);
            this.refreshDaemon = 0;
        };
        class_1.prototype.render = function () {
            return React.createElement(Comp, __assign({}, this.props));
        };
        return class_1;
    }(React.PureComponent));
}
//# sourceMappingURL=withDaemon.js.map