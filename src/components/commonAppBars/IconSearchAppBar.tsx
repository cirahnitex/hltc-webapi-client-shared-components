import * as React from 'react';
import IconAppBar from "./IconAppBar";
import SearAppBarAddon from "./SearchAppBarAddon";
import {style} from "typestyle";
import {AppBarProps} from "@material-ui/core/AppBar";

interface Props extends AppBarProps{
    icon: React.ReactElement<any>;
    onIconClick: ()=>any;
    title: string;
    searchValue?: string;
    onSearchValueChange?: (x:string)=>any;
}

const Styles = {
    grow: style({flexGrow:1})
};

function IconSearchAppBar(props:Props) {
    const { searchValue, onSearchValueChange, ...others } = props;
    return <IconAppBar {...others}>
        <div className={Styles.grow} />
        <SearAppBarAddon searchValue={searchValue} onSearchValueChange={onSearchValueChange}/>
    </IconAppBar>;
}

export default IconSearchAppBar;