import * as React from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import {grey} from "@material-ui/core/colors";
import {Caption} from "../typographies";
import Divider from "@material-ui/core/Divider/Divider";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles, { WithStyles} from "@material-ui/core/styles/withStyles";


const styles = createStyles({
    drawerTitleWrap: {
        height: 64,
        padding: "0 16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    perform: {

    }
});

type Props = {
    text: string;
    secondaryText?: string;
}

const DrawerTitle = ({text, secondaryText, classes}:Props & WithStyles<typeof styles>)=> <div>
    <div className={classes.drawerTitleWrap}>
        <Typography variant={"title"} style={{color:grey[700]}}>{text}</Typography>
        {secondaryText != null && <Caption>{secondaryText}</Caption>}
    </div>
    <Divider />
</div>;

export default withStyles(styles)(DrawerTitle);