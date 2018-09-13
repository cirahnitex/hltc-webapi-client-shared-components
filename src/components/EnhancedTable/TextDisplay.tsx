import * as React from "react";

interface Props {
    value: any;
}
export default function TextDisplay({value}:Props) {
    return <span>{value.toString()}</span>
}