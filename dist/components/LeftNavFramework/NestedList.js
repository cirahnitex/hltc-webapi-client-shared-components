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
import pink from "@material-ui/core/colors/pink";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Collapse from "@material-ui/core/Collapse/Collapse";
import List from "@material-ui/core/List/List";
var INDENT_WIDTH = 16;
var NestedList = /** @class */ (function (_super) {
    __extends(NestedList, _super);
    function NestedList(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isExpanded: props.items.map(function (x, i) { return i === props.path[0]; })
        };
        _this.setEventHandler(props);
        return _this;
    }
    NestedList.prototype.setEventHandler = function (props) {
        var _this = this;
        this.handleChildrenPathChange = props.items.map(function (x, index) { return function (subPath) {
            props.onRequestPathChange([index].concat(subPath));
        }; });
        this.handleChildrenClick = props.items.map(function (x, index) {
            if (x.nextLevel == null)
                return function (e) { props.onRequestPathChange([index]); };
            return (function (e) {
                var isExpanded = _this.state.isExpanded.slice();
                isExpanded[index] = !isExpanded[index];
                _this.setState({ isExpanded: isExpanded });
            });
        });
    };
    NestedList.prototype.componentWillReceiveProps = function (props) {
        if (props.items !== this.props.items)
            this.setEventHandler(props);
    };
    NestedList.prototype.renderListEntry = function (index) {
        var item = this.props.items[index];
        var indentLevel = this.props.indentLevel || 0;
        var isInPath = this.props.path.length && this.props.path[0] === index;
        var highlightStyle = {};
        if (isInPath) {
            highlightStyle = { color: pink[500], fontWeight: "500" };
        }
        var indentStyle = { marginLeft: indentLevel * INDENT_WIDTH };
        var listItemStyle = {};
        if (item.nextLevel == null && isInPath) {
            indentStyle = {
                marginLeft: indentStyle.marginLeft - 4,
            };
            listItemStyle = {
                borderLeft: "4px solid " + pink[500],
            };
        }
        var caption = React.createElement(ListItem, { dense: true, button: true, key: 0, onClick: this.handleChildrenClick[index], style: listItemStyle },
            React.createElement("div", { style: indentStyle }, typeof (item.caption) === "string" ? React.createElement(ListItemText, { primary: React.createElement("div", { style: highlightStyle }, item.caption) }) : item.caption));
        if (item.nextLevel == null)
            return caption;
        var collapse = React.createElement(Collapse, { in: this.state.isExpanded[index], timeout: "auto", unmountOnExit: true, key: 1 },
            React.createElement(NestedList, { items: item.nextLevel, path: isInPath ? this.props.path.slice(1) : [], onRequestPathChange: this.handleChildrenPathChange[index], indentLevel: indentLevel + 1 }));
        return [caption, collapse];
    };
    NestedList.prototype.render = function () {
        var _this = this;
        return React.createElement(List, { component: "div", disablePadding: !!this.props.indentLevel }, this.props.items.map(function (item, index) { return (React.createElement("div", { key: index }, _this.renderListEntry(index))); }));
    };
    return NestedList;
}(React.PureComponent));
export default NestedList;
//# sourceMappingURL=NestedList.js.map