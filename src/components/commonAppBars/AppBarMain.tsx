import * as React from "react";
import {style} from "typestyle";

const rootCss = style({
    flexGrow: 1,
    display: 'flex',
    flexDirection: "column",
    padding: "72px 24px 16px 24px",
    $nest: {
        "@media (min-width: 600px)": {
            padding: "80px 32px 16px 32px",
        }
    }
});
const rootCssNoPadding = style({
    flexGrow: 1,
    display: 'flex',
    flexDirection: "column",
    padding: "56px 0 0 0",
    $nest: {
        "@media (min-width: 600px)": {
            padding: "64px 0 0 0",
        }
    }
});
interface Props {
    disablePadding?: boolean;
    children: React.ReactFragment;
}
export default function AppBarMain({disablePadding, children}:Props) {
    return <div className={disablePadding?rootCssNoPadding:rootCss}>{children}</div>
}