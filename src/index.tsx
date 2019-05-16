import * as React from "react"
import * as ReactDom from "react-dom"
import {createStyles, Theme, WithStyles} from "@material-ui/core";
import withStyles, {ClassNameMap} from "@material-ui/core/styles/withStyles";
import Api from "./util/Api";
import EmailInput from "./components/EmailInput";
interface Props {}

interface State {}

class App extends React.PureComponent<Props,State> {
    constructor(props:Props) {
        super(props);
        this.state = {
            drawerOpen: false,
            mainContent: ""
        };
    }

    render() {
        return <EmailInput />
    }
}


ReactDom.render(<App />, document.getElementById('root'));
