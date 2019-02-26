import * as React from "react"
import * as ReactDom from "react-dom"
import LeftNavFramework, {NavItem} from "./components/LeftNavFramework/LeftNavFramework";
import Typography from "@material-ui/core/Typography/Typography";
import IconSearchAppBar from "./components/commonAppBars/IconSearchAppBar";
import PersonIcon from "@material-ui/icons/Person";

class App extends React.PureComponent<{},{}> {
    constructor(props:{}) {
        super(props);
        this.state = {};
    }

    render() {
        const navItems:NavItem[] = [{
            caption: "inbox",
            content: <Typography>my inbox</Typography>
        }];

        return <IconSearchAppBar icon={<PersonIcon />} onIconClick={()=>console.log('icon click')} title={"my search"}/>
    }
}

ReactDom.render(<App />, document.getElementById('root'));