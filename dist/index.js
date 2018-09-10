import * as React from "react";
import * as ReactDom from "react-dom";
import AutoComplete from "./components/Autocomplete";
import Typography from "@material-ui/core/Typography/Typography";
var App = function () { return React.createElement("div", null,
    React.createElement(Typography, { variant: "body1" }, "AutoComplete"),
    React.createElement(AutoComplete, { suggestions: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], label: "choose day of week" })); };
var root = document.querySelector("#root");
ReactDom.render(React.createElement(App, null), root);
//# sourceMappingURL=index.js.map