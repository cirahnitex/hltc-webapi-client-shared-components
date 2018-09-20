import * as React from 'react';
import Switch from "@material-ui/core/Switch/Switch";
import {style} from "typestyle";

interface Props {
    value: boolean;
    onRequestValueChange: (value:boolean)=>any;
}
const rootCss = style({
    margin: '0 -16px'
});
export default function BooleanDisplayAndEdit({value, onRequestValueChange}:Props) {
    return <div className={rootCss}>
        <Switch checked={value} onChange={(e:any)=>onRequestValueChange(e.target.checked)} color={"primary"}/>
    </div>
}