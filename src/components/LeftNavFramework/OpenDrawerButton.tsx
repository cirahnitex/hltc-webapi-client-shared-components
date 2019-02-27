import * as React from 'react';
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton/IconButton";
import {style} from "typestyle";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles, {WithStyles} from "@material-ui/core/styles/withStyles";
import {Theme} from "@material-ui/core/styles/createMuiTheme";



const styles = (theme:Theme) => createStyles({
    navIconHide: {
        [theme.breakpoints.up('md')]: {
            display: 'none !important' as any,
        },
    },
});

type Props = {
    onClick: ()=>any;
} & WithStyles<typeof styles>;

const OpenDrawerButton = (props:Props) => {
    return <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={props.onClick}
        className={props.classes.navIconHide}
    >
        <MenuIcon />
    </IconButton>
};
export default withStyles(styles)(OpenDrawerButton);