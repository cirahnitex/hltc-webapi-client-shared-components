import * as React from "react";
import {style} from "typestyle";

const rootCss = style({
    flexGrow: 1,
    display: 'flex',
    flexDirection: "column",
    padding: "72px 32px 16px 32px",
    $nest: {
        "@media (min-width: 600px)": {
            padding: "80px 40px 16px 40px",
        }
    }
});
interface Props {
    children: React.ReactFragment;
}
export default function AppBarMain({children}:Props) {
    return <div className={rootCss}>{children}</div>
}