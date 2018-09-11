import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
var styles = function (theme) { return ({
    root: {
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    title: {
        padding: '0 16px',
    }
}); };
function BackSearchAppBar(props) {
    var title = props.title, icon = props.icon, onIconClick = props.onIconClick, classes = props.classes, children = props.children;
    return (React.createElement("div", { className: classes.root },
        React.createElement(AppBar, { style: { zIndex: 0 } },
            React.createElement(Toolbar, null,
                React.createElement(IconButton, { color: "inherit", onClick: onIconClick }, icon),
                React.createElement(Typography, { className: classes.title, variant: "title", color: "inherit", noWrap: true }, title),
                children))));
}
export default withStyles(styles)(BackSearchAppBar);
//# sourceMappingURL=IconAppBar.js.map