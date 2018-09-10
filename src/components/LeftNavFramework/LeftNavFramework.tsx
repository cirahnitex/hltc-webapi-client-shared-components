import * as React from 'react';
import NestedList, {ListEntry} from './NestedList';
import {style} from "typestyle";
import {Caption, Title} from "../typographies";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography/Typography";
import {grey} from "@material-ui/core/colors";
import Divider from "@material-ui/core/Divider/Divider";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Hidden from "@material-ui/core/Hidden/Hidden";
import Drawer from "@material-ui/core/Drawer/Drawer";

export interface NavItem {
    caption: string | React.ReactFragment,
    content: NavItem[] | React.ReactChild,
}

export interface Props {
    title: string,
    subTitle?: string,
    items: NavItem[],
    appBarAddons?: React.ReactChild[],
}

interface State {
    path: number[]
    mobileOpen: boolean
}

function convertToListEntry(navItem:NavItem):ListEntry {
    if(navItem.content instanceof Array) {
        const content = navItem.content as NavItem[];
        return {
            caption: navItem.caption,
            nextLevel: content.map((x:NavItem):ListEntry=>convertToListEntry(x))
        }
    }
    else {
        return {
            caption: navItem.caption,
            nextLevel: null
        }
    }
}

const drawerWidth = 240;
const breakpointCss = "@media (min-width: 960px)";
const classes = {
    root: style({flexGrow: 1,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',}),
    appBar: style({
        position: 'absolute',
        marginLeft: drawerWidth,
        $nest: {
            [breakpointCss]: {
                width: `calc(100% - ${drawerWidth}px) !important`,
            }
        }
    }),
    appBarSpaceFiller: style({
        flexGrow: 1
    }),
    navIconHide: style({
        $nest: {
            [breakpointCss]: {
                display: 'none !important' as any,
            },
        }
    }),
    drawerPaper: style({
        width: drawerWidth,
        $nest: {
            [breakpointCss]: {
                position: 'relative !important' as any,
            },
        }
    }),
    drawerTitleWrap:style({
        height: 64,
        padding: "0 16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    }),
    title: style({
        paddingLeft: 16,
    }),
    content: style({
        flexGrow: 1,
        padding: "80px 40px 16px 40px",
        $nest: {
            [breakpointCss]: {
                marginLeft: `${drawerWidth}px`,
            },
        }
    })
};

export default class LeftNavFramework extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);

        // find the first nav item as default
        if(props.items.length<=0) throw new Error("nav item cannot be empty");
        let path = [0];
        let item = props.items[0];
        while(item.content instanceof Array) {
            item = item.content[0];
            path = [...path, 0];
        }

        this.state = {
            path,
            mobileOpen: false
        }
    }
    handlePathChange = (path:number[]) => this.setState({path});
    getPathItem(path: number[], navItems:NavItem[]):NavItem|null {
        let navItem: NavItem = {
            caption: this.props.title,
            content: navItems
        };
        for(const index of path) {
            if(navItem.content instanceof Array) {
                if(navItem.content.length<=index) return null;
                navItem = navItem.content[index];
            }
            else {
                return navItem;
            }
        }
        return navItem;
    }
    handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };

    renderAppbarAddons() {
        if(this.props.appBarAddons == null) return null;
        return this.props.appBarAddons.map((Addon, i)=><div key={i}>{Addon}</div>)
    }
    render() {
        const drawer = <div>
            <div className={classes.drawerTitleWrap}>
                <Typography variant={"title"} style={{color:grey[700]}}>{this.props.title}</Typography>
                {this.props.subTitle != null && <Caption>{this.props.subTitle}</Caption>}
            </div>
            <Divider />
            <NestedList items={this.props.items.map(x=>convertToListEntry(x))}
                        path={this.state.path} onRequestPathChange={this.handlePathChange}/>
        </div>;

        const navItem = this.getPathItem(this.state.path, this.props.items);
        return <div className={classes.root}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={this.handleDrawerToggle}
                        className={classes.navIconHide}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Title className={classes.title}>{navItem?navItem.caption:""}</Title>
                    <div className={classes.appBarSpaceFiller} />
                    {this.renderAppbarAddons()}
                </Toolbar>
            </AppBar>
            <Hidden mdUp>
                <Drawer
                    variant="temporary"
                    anchor={'left'}
                    open={this.state.mobileOpen}
                    onClose={this.handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {drawer}
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
                    {drawer}
                </Drawer>
            </Hidden>
            <main className={classes.content}>
                {navItem?navItem.content:""}
            </main>
        </div>
    }
}