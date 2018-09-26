import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {style} from "typestyle";
import {IOS_VK_OPEN_CSS_CLASS_ON_BODY} from "../InputSlideUpWithIosVK";


const rootCss = style({
    $nest: {
        [`.${IOS_VK_OPEN_CSS_CLASS_ON_BODY} &`]:{
            top: '270px !important'
        }
    }
});

const titleCss = style({
    padding: '0 8px'
});

interface Props {
    leftWidget?: React.ReactFragment;
    title: string;
    children?: React.ReactFragment;
}

function BasicAppBar(props:Props) {
    const { title, leftWidget,  children } = props;
    return (
        <AppBar className={rootCss}>
            <Toolbar>
                {leftWidget}
                <Typography className={titleCss} variant="title" color="inherit" noWrap>
                    {title}
                </Typography>
                {children}
            </Toolbar>
        </AppBar>
    );
}

export default BasicAppBar;