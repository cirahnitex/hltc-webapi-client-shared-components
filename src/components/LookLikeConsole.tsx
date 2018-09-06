import * as React from 'react';
import {style} from 'typestyle';

interface Props {
    children: React.ReactFragment
}

const wrap = style({
    backgroundColor: "hsl(0,0%,5%)",
    color: "white",
    padding: '8px 16px'
});

const LookLikeConsole = (props:Props) =><div className={wrap}><code>
    {props.children}
</code></div>;

export default LookLikeConsole;