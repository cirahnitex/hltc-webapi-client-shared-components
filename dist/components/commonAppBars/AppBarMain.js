import * as React from "react";
import { style } from "typestyle";
var rootCss = style({
    flexGrow: 1,
    padding: "72px 32px 16px 32px",
    $nest: {
        "@media (min-width: 600px)": {
            padding: "80px 40px 16px 40px",
        }
    }
});
export default function AppBarMain(_a) {
    var children = _a.children;
    return React.createElement("div", { className: rootCss }, children);
}
//# sourceMappingURL=AppBarMain.js.map