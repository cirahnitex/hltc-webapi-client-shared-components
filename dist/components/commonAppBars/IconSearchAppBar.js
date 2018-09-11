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
import Input from '@material-ui/core/Input';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import IconAppBar from "./IconAppBar";
var styles = function (theme) {
    var _a, _b;
    return ({
        grow: {
            flexGrow: 1,
        },
        search: (_a = {
                position: 'relative',
                borderRadius: theme.shape.borderRadius,
                backgroundColor: fade(theme.palette.common.white, 0.15),
                '&:hover': {
                    backgroundColor: fade(theme.palette.common.white, 0.25),
                },
                marginLeft: 0,
                width: '100%'
            },
            _a[theme.breakpoints.up('sm')] = {
                marginLeft: theme.spacing.unit,
                width: 'auto',
            },
            _a),
        searchIcon: {
            width: theme.spacing.unit * 7,
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
            width: '100%',
        },
        inputInput: (_b = {
                paddingTop: theme.spacing.unit,
                paddingRight: theme.spacing.unit,
                paddingBottom: theme.spacing.unit,
                paddingLeft: theme.spacing.unit * 7,
                transition: theme.transitions.create('width'),
                width: '100%'
            },
            _b[theme.breakpoints.up('sm')] = {
                width: 120,
                '&:focus': {
                    width: 200,
                },
            },
            _b),
    });
};
function IconSearchAppBar(props) {
    var searchValue = props.searchValue, onSearchValueChange = props.onSearchValueChange, classes = props.classes, others = __rest(props, ["searchValue", "onSearchValueChange", "classes"]);
    return React.createElement(IconAppBar, __assign({}, others),
        React.createElement("div", { className: classes.grow }),
        React.createElement("div", { className: classes.search },
            React.createElement("div", { className: classes.searchIcon },
                React.createElement(SearchIcon, null)),
            React.createElement(Input, { placeholder: "Search\u2026", disableUnderline: true, classes: {
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }, value: searchValue, onChange: onSearchValueChange ? function (e) { return onSearchValueChange(e.target.value); } : undefined })));
}
export default withStyles(styles)(IconSearchAppBar);
//# sourceMappingURL=IconSearchAppBar.js.map