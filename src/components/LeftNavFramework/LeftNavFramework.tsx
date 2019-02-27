import * as React from 'react';
import Hidden from "@material-ui/core/Hidden/Hidden";
import Drawer from "@material-ui/core/Drawer/Drawer";
import {Theme} from "@material-ui/core/styles";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles, {WithStyles} from "@material-ui/core/styles/withStyles";

type SlotProps = {children:React.ReactFragment}

export const AppBarSlot = (props:SlotProps) => {
    const child = React.Children.only(props.children);
    if(child.props.position == null || child.props.position === 'fixed') {
        console.warn("LeftNavFramework: Your AppBar should not have position=fixed. Otherwise the all bar will cover the drawer.");
    }
    return <>{child}</>;
};

export const DrawerSlot = (props:SlotProps) => {
    return <>{props.children}</>;
};

export const MainSlot = (props:SlotProps) => {
    return <>{props.children}</>;
};


interface State {
    path: number[]
    appBarAddonWrapEl: HTMLDivElement|null;
}

const drawerWidth = 240;
const styles = (theme:Theme) => createStyles({
    root: {flexGrow: 1,
        position: 'relative',
        display: 'flex',
        width: '100%',
        flexDirection: 'column'
    },
    appBar: {
        position: 'absolute',
        width: '100%',
        [theme.breakpoints.up('md')]: {
            left: drawerWidth,
            width: `calc(100% - ${drawerWidth}px) !important`,
        }
    },
    drawerPaper: {
        width: drawerWidth,
        minHeight: '100vh',
        [theme.breakpoints.up('md')]: {
            position: 'relative !important' as any,
        },
    },
    content: {
        flexGrow: 1,
        padding: "72px 24px 16px 24px",
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('sm')]: {
            padding: "80px 32px 16px 32px",
        },
        [theme.breakpoints.up('md')]: {
            marginLeft: `${drawerWidth}px`,
        },
    }
});

export interface Props extends WithStyles<typeof styles> {
    drawerOpen: boolean,
    onRequestDrawerToggle: ()=>void,
    children: React.ReactFragment
}

class LeftNavFramework extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        const children = React.Children.toArray(this.props.children);
        const classes = this.props.classes;
        return <div className={classes.root}>
            <Hidden mdUp>
                <Drawer
                    variant="temporary"
                    anchor={'left'}
                    open={this.props.drawerOpen}
                    onClose={this.props.onRequestDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {children.filter(x=>typeof(x)==='object' && x.type===DrawerSlot)}
                </Drawer>
            </Hidden>
            <Hidden smDown implementation="css">
                <Drawer
                    variant="permanent"
                    open
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    style={{position:"fixed"}}
                >
                    {children.filter(x=>typeof(x)==='object' && x.type===DrawerSlot)}
                </Drawer>
            </Hidden>
            <div className={classes.appBar}>
                {children.filter(x=>(typeof(x) === 'object' && x.type === AppBarSlot))}
            </div>
            <main className={classes.content}>
                {children.filter(x=>typeof(x)==='object' && x.type===MainSlot)}
            </main>
        </div>
    }
}

export default withStyles(styles)(LeftNavFramework);