import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {style} from "typestyle";

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
        <AppBar>
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