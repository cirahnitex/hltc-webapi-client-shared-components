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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Button from "@material-ui/core/Button/Button";
var delayRandomly = function () { return new Promise(function (resolve) { return setTimeout(resolve, 500 + Math.random() * 1000); }); };
var DebounceButton = /** @class */ (function (_super) {
    __extends(DebounceButton, _super);
    function DebounceButton(props) {
        var _this = _super.call(this, props) || this;
        _this.startAnimationTimeout = 0;
        _this.state = {
            loading: false,
            showLoadingAnimation: false,
        };
        return _this;
    }
    DebounceButton.prototype.handleButtonClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var onClick, p;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.state.loading)
                            return [2 /*return*/];
                        this.setState({ loading: true });
                        this.startAnimationTimeout = setTimeout(function () {
                            _this.setState({
                                showLoadingAnimation: true,
                            });
                        }, 300);
                        onClick = this.props.onClick || delayRandomly;
                        p = onClick();
                        return [4 /*yield*/, p];
                    case 1:
                        _a.sent();
                        clearInterval(this.startAnimationTimeout);
                        this.startAnimationTimeout = 0;
                        this.setState({ loading: false, showLoadingAnimation: false });
                        return [2 /*return*/];
                }
            });
        });
    };
    DebounceButton.prototype.render = function () {
        var _this = this;
        var spinnerStyle = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)'
        };
        var _a = this.props, disabled = _a.disabled, onClick = _a.onClick, spinnerSize = _a.spinnerSize, buttonComponent = _a.buttonComponent, children = _a.children, color = _a.color, raised = _a.raised, variant = _a.variant, others = __rest(_a, ["disabled", "onClick", "spinnerSize", "buttonComponent", "children", "color", "raised", "variant"]);
        if (buttonComponent && children) {
            console.warn("DebounceButton: children doesn't work with external buttonComponent. Consider putting children into buttonComponent instead.");
        }
        var propsOnButton = __assign({ disabled: this.state.showLoadingAnimation || disabled, onClick: function () { return _this.handleButtonClick(); }, color: color, variant: raised ? "raised" : variant }, others);
        var button = buttonComponent ? React.cloneElement(buttonComponent, propsOnButton)
            : React.createElement(Button, propsOnButton, children);
        return React.createElement("div", { style: { position: "relative", display: 'inline-block' } },
            button,
            this.state.showLoadingAnimation && React.createElement("div", { style: spinnerStyle },
                React.createElement(CircularProgress, { size: spinnerSize || 24 })));
    };
    return DebounceButton;
}(React.Component));
export default DebounceButton;
//# sourceMappingURL=DebounceButton.js.map