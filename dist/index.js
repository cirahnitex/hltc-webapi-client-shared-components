import * as React from "react";
import * as ReactDom from "react-dom";
import LeftNavFramework from "./components/LeftNavFramework/LeftNavFramework";
import Portal from "@material-ui/core/Portal/Portal";
var Page0 = function (_a) {
    var addonWrap = _a.addonWrap;
    return React.createElement("div", null,
        React.createElement(Portal, { container: addonWrap },
            React.createElement("div", null, "addon of page 0")),
        "content of page 0");
};
var items = [
    {
        caption: "page#0",
        content: function (addonWrap) { return React.createElement(Page0, { addonWrap: addonWrap }); }
    }
];
var App = function () { return React.createElement(LeftNavFramework, { title: "default title", items: items }); };
var root = document.querySelector("#root");
ReactDom.render(React.createElement(App, null), root);
//# sourceMappingURL=index.js.map