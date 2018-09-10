import * as React from 'react';
import { style } from 'typestyle';
var wrap = style({
    backgroundColor: "hsl(0,0%,5%)",
    color: "white",
    padding: '8px 16px'
});
var LookLikeConsole = function (props) { return React.createElement("div", { className: wrap },
    React.createElement("code", null, props.children)); };
export default LookLikeConsole;
//# sourceMappingURL=LookLikeConsole.js.map