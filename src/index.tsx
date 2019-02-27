import * as React from "react"
import * as ReactDom from "react-dom"
import LeftNavFramework, {MainSlot, AppBarSlot, DrawerSlot} from "./components/LeftNavFramework/LeftNavFramework";
import Typography from "@material-ui/core/Typography/Typography";
import IconSearchAppBar from "./components/commonAppBars/IconSearchAppBar";
import PersonIcon from "@material-ui/icons/Person";
import {createStyles, Theme, WithStyles} from "@material-ui/core";
import withStyles, {ClassNameMap} from "@material-ui/core/styles/withStyles";
import DrawerTitle from "./components/LeftNavFramework/DrawerTitle";
import NestedList from "./components/LeftNavFramework/NestedList";
import OpenDrawerButton from "./components/LeftNavFramework/OpenDrawerButton";
import BasicAppBar from "./components/commonAppBars/BasicAppBar";
import SearchAppBarAddon from "./components/commonAppBars/SearchAppBarAddon";

type State = {
    drawerOpen: boolean;
    mainContent: React.ReactFragment;
}

const styles = (theme:Theme) => createStyles({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
});
type Props = {
}

class App extends React.PureComponent<Props & WithStyles<typeof styles>,State> {
    constructor(props:Props & WithStyles<typeof styles>) {
        super(props);
        this.state = {
            drawerOpen: false,
            mainContent: ""
        };
    }
    handleDrawerToggle = ()=>{
        this.setState({drawerOpen: !this.state.drawerOpen});
    };
    render() {
        return <LeftNavFramework drawerOpen={this.state.drawerOpen} onRequestDrawerToggle={this.handleDrawerToggle}>
            <AppBarSlot>
                <BasicAppBar leftWidget={<OpenDrawerButton onClick={this.handleDrawerToggle}/>} title={"my title"} position={"absolute"}>
                    <div style={{flexGrow:1}} />
                    <SearchAppBarAddon />
                </BasicAppBar>
            </AppBarSlot>
            <DrawerSlot>
                <DrawerTitle text={"Drawer Title"} secondaryText={"my awesome project"}/>
                <NestedList items={[
                    {
                        caption: "page 1",
                        onClick: ()=>this.setState({mainContent: "page 1 selected"})
                    },
                    {
                        caption: "page 2",
                        onClick: ()=>this.setState({mainContent: "page 2 selected"})
                    }
                ]}/>
            </DrawerSlot>
            <MainSlot>
                {this.state.mainContent}
            </MainSlot>
        </LeftNavFramework>
    }
}

const StyledApp = withStyles(styles)(App);

ReactDom.render(<StyledApp />, document.getElementById('root'));