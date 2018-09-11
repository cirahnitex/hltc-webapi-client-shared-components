import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {Theme, withStyles} from '@material-ui/core/styles';
import {CSSProperties} from "@material-ui/core/styles/withStyles";

const styles = (theme:Theme) => ({
    root: {
        width: '100%',
    } as CSSProperties,
    grow: {
        flexGrow: 1,
    } as CSSProperties,
    title: {
        padding: '0 16px',
    } as CSSProperties
});

interface Props {
    classes: Record<keyof ReturnType<typeof styles>, string>;
    icon: React.ReactElement<any>;
    onIconClick: ()=>any;
    title: string;
    children?: React.ReactFragment;
}

function BackSearchAppBar(props:Props) {
    const { title, icon, onIconClick,  classes, children } = props;
    return (
        <div className={classes.root}>
            <AppBar style={{zIndex:0}}>
                <Toolbar>
                    <IconButton color="inherit" onClick={onIconClick}>
                        {icon}
                    </IconButton>
                    <Typography className={classes.title} variant="title" color="inherit" noWrap>
                        {title}
                    </Typography>
                    {children}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withStyles(styles)(BackSearchAppBar);