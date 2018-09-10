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
import * as React from 'react';
import * as ReactDom from 'react-dom';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent/SnackbarContent";
import IconButton from "@material-ui/core/IconButton/IconButton";
import { style } from "typestyle";
var Styles = {
    errorToast: style({
        backgroundColor: "#E53935 !important"
    })
};
var ErrorToast = /** @class */ (function (_super) {
    __extends(ErrorToast, _super);
    function ErrorToast(props) {
        var _this = _super.call(this, props) || this;
        _this.openLaterTimer = undefined;
        _this.handleClose = function (event, reason) {
            if (reason === 'clickaway') {
                return;
            }
            _this.setState({ open: false });
        };
        _this.state = {
            open: false,
            msg: "",
        };
        return _this;
    }
    ErrorToast.prototype.open = function (msg) {
        var _this = this;
        if (this.state.open) {
            this.setState({ open: false });
            clearTimeout(this.openLaterTimer);
            this.openLaterTimer = window.setTimeout(function () {
                _this.setState({ open: true, msg: msg });
                _this.openLaterTimer = undefined;
            }, 250);
        }
        else if (this.openLaterTimer != undefined) {
            this.setState({ msg: msg });
        }
        else {
            this.setState({
                open: true,
                msg: msg,
            });
        }
    };
    ErrorToast.prototype.componentWillMount = function () {
        errorToast = this;
    };
    ErrorToast.prototype.render = function () {
        return React.createElement(Snackbar, { anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
            }, open: this.state.open, autoHideDuration: 5000, onClose: this.handleClose },
            React.createElement(SnackbarContent, { message: React.createElement("span", { id: "message-id" }, this.state.msg), classes: { root: Styles.errorToast }, action: React.createElement(IconButton, { key: "close", "aria-label": "Close", color: "inherit", onClick: this.handleClose },
                    React.createElement(CloseIcon, null)) }));
    };
    return ErrorToast;
}(React.Component));
var errorToast = null;
window.addEventListener('load', function () {
    var toastWrap = document.createElement('div');
    document.body.appendChild(toastWrap);
    ReactDom.render(React.createElement(ErrorToast, null), toastWrap);
});
export function toastError(msg) {
    if (msg instanceof Error) {
        console.error(msg);
        msg = msg.message || msg.toString();
    }
    if (errorToast) {
        errorToast.open(msg);
    }
}
//# sourceMappingURL=toastError.js.map