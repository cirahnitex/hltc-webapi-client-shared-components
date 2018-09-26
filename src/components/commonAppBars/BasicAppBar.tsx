import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Theme, withStyles} from '@material-ui/core/styles';
import {CSSProperties} from "@material-ui/core/styles/withStyles";

const styles = (theme:Theme) => ({
    root: {
        width: '100%'
    } as CSSProperties,
    title: {
        padding: '0 8px',
    } as CSSProperties
});

interface Props {
    classes: Record<keyof ReturnType<typeof styles>, string>;
    leftWidget?: React.ReactFragment;
    title: string;
    children?: React.ReactFragment;
}

function BasicAppBar(props:Props) {
    const { title, leftWidget,  classes, children } = props;
    return (
        <div className={classes.root}>
            <AppBar>
                <Toolbar>
                    {leftWidget}
                    <Typography className={classes.title} variant="title" color="inherit" noWrap>
                        {title}
                    </Typography>
                    {children}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withStyles(styles)(BasicAppBar);