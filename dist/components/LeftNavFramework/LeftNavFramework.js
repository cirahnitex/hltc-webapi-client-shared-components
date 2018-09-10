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
var _a, _b, _c, _d;
import * as React from 'react';
import NestedList from './NestedList';
import { style } from "typestyle";
import { Caption, Title } from "../typographies";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography/Typography";
import { grey } from "@material-ui/core/colors";
import Divider from "@material-ui/core/Divider/Divider";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Hidden from "@material-ui/core/Hidden/Hidden";
import Drawer from "@material-ui/core/Drawer/Drawer";
function convertToListEntry(navItem) {
    if (navItem.content instanceof Array) {
        var content = navItem.content;
        return {
            caption: navItem.caption,
            nextLevel: content.map(function (x) { return convertToListEntry(x); })
        };
    }
    else {
        return {
            caption: navItem.caption,
            nextLevel: null
        };
    }
}
var drawerWidth = 240;
var breakpointCss = "@media (min-width: 960px)";
var classes = {
    root: style({ flexGrow: 1,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%', }),
    appBar: style({
        position: 'absolute',
        marginLeft: drawerWidth,
        $nest: (_a = {},
            _a[breakpointCss] = {
                width: "calc(100% - " + drawerWidth + "px) !important",
            },
            _a)
    }),
    appBarSpaceFiller: style({
        flexGrow: 1
    }),
    navIconHide: style({
        $nest: (_b = {},
            _b[breakpointCss] = {
                display: 'none !important',
            },
            _b)
    }),
    drawerPaper: style({
        width: drawerWidth,
        $nest: (_c = {},
            _c[breakpointCss] = {
                position: 'relative !important',
            },
            _c)
    }),
    drawerTitleWrap: style({
        height: 64,
        padding: "0 16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    }),
    title: style({
        paddingLeft: 16,
    }),
    content: style({
        flexGrow: 1,
        padding: "80px 40px 16px 40px",
        $nest: (_d = {},
            _d[breakpointCss] = {
                marginLeft: drawerWidth + "px",
            },
            _d)
    })
};
var LeftNavFramework = /** @class */ (function (_super) {
    __extends(LeftNavFramework, _super);
    function LeftNavFramework(props) {
        var _this = _super.call(this, props) || this;
        _this.handlePathChange = function (path) { return _this.setState({ path: path }); };
        _this.handleDrawerToggle = function () {
            _this.setState({ mobileOpen: !_this.state.mobileOpen });
        };
        // find the first nav item as default
        if (props.items.length <= 0)
            throw new Error("nav item cannot be empty");
        var path = [0];
        var item = props.items[0];
        while (item.content instanceof Array) {
            item = item.content[0];
            path = path.concat([0]);
        }
        _this.state = {
            path: path,
            mobileOpen: false
        };
        return _this;
    }
    LeftNavFramework.prototype.getPathItem = function (path, navItems) {
        var navItem = {
            caption: this.props.title,
            content: navItems
        };
        for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
            var index = path_1[_i];
            if (navItem.content instanceof Array) {
                if (navItem.content.length <= index)
                    return null;
                navItem = navItem.content[index];
            }
            else {
                return navItem;
            }
        }
        return navItem;
    };
    LeftNavFramework.prototype.renderAppbarAddons = function () {
        if (this.props.appBarAddons == null)
            return null;
        return this.props.appBarAddons.map(function (Addon, i) { return React.createElement("div", { key: i }, Addon); });
    };
    LeftNavFramework.prototype.render = function () {
        var drawer = React.createElement("div", null,
            React.createElement("div", { className: classes.drawerTitleWrap },
                React.createElement(Typography, { variant: "title", style: { color: grey[700] } }, this.props.title),
                this.props.subTitle != null && React.createElement(Caption, null, this.props.subTitle)),
            React.createElement(Divider, null),
            React.createElement(NestedList, { items: this.props.items.map(function (x) { return convertToListEntry(x); }), path: this.state.path, onRequestPathChange: this.handlePathChange }));
        var navItem = this.getPathItem(this.state.path, this.props.items);
        return React.createElement("div", { className: classes.root },
            React.createElement(AppBar, { className: classes.appBar },
                React.createElement(Toolbar, null,
                    React.createElement(IconButton, { color: "inherit", "aria-label": "open drawer", onClick: this.handleDrawerToggle, className: classes.navIconHide },
                        React.createElement(MenuIcon, null)),
                    React.createElement(Title, { className: classes.title }, navItem ? navItem.caption : ""),
                    React.createElement("div", { className: classes.appBarSpaceFiller }),
                    this.renderAppbarAddons())),
            React.createElement(Hidden, { mdUp: true },
                React.createElement(Drawer, { variant: "temporary", anchor: 'left', open: this.state.mobileOpen, onClose: this.handleDrawerToggle, classes: {
                        paper: classes.drawerPaper,
                    }, ModalProps: {
                        keepMounted: true,
                    } }, drawer)),
            React.createElement(Hidden, { smDown: true, implementation: "css" },
                React.createElement(Drawer, { variant: "permanent", open: true, classes: {
                        paper: classes.drawerPaper,
                    }, style: { position: "fixed" } }, drawer)),
            React.createElement("main", { className: classes.content }, navItem ? navItem.content : ""));
    };
    return LeftNavFramework;
}(React.PureComponent));
export default LeftNavFramework;
//# sourceMappingURL=LeftNavFramework.js.map