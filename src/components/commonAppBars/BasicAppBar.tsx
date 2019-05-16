import * as React from 'react';
import AppBar, {AppBarProps} from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {style} from "typestyle";

const titleCss = style({
    padding: '0 8px'
});

interface Props extends AppBarProps {
    leftWidget?: React.ReactFragment;
    title: string;
    children?: React.ReactFragment;
}

function BasicAppBar(props:Props) {
    const { title, leftWidget,  children, ...others } = props;
    return (
        <AppBar {...others}>
            <Toolbar>
                {leftWidget}
                <Typography className={titleCss} variant="h6" color="inherit" noWrap>
                    {title}
                </Typography>
                {children}
            </Toolbar>
        </AppBar>
    );
}

export default BasicAppBar;