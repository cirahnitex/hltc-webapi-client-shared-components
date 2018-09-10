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
import Typography from '@material-ui/core/Typography';
var colorInherit = { color: 'inherit' };
var Display4 = function (props) { return (React.createElement(Typography, __assign({ style: colorInherit }, props, { variant: "display4" }))); };
var Display3 = function (props) { return (React.createElement(Typography, __assign({ style: colorInherit }, props, { variant: "display3" }))); };
var Display2 = function (props) { return (React.createElement(Typography, __assign({ style: colorInherit }, props, { variant: "display2" }))); };
var Display1 = function (props) { return (React.createElement(Typography, __assign({ style: colorInherit }, props, { variant: "display1" }))); };
var Headline = function (props) { return (React.createElement(Typography, __assign({ style: colorInherit }, props, { variant: "headline" }))); };
var Title = function (props) { return (React.createElement(Typography, __assign({ style: colorInherit }, props, { variant: "title" }))); };
var Subheading = function (props) { return (React.createElement(Typography, __assign({ style: colorInherit }, props, { variant: "subheading" }))); };
var Body2 = function (props) { return (React.createElement(Typography, __assign({ style: colorInherit }, props, { variant: "body2" }))); };
var Body1 = function (props) { return (React.createElement(Typography, __assign({ style: colorInherit }, props, { variant: "body1" }))); };
var Caption = function (props) { return (React.createElement(Typography, __assign({}, props, { variant: "caption" }))); };
export { Display4, Display3, Display2, Display1, Headline, Title, Subheading, Body1, Body2, Caption };
//# sourceMappingURL=typographies.js.map