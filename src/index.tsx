import * as React from "react"
import * as ReactDom from "react-dom"
import createEnhancedTable from "./components/EnhancedTable/EnhancedTable";
import IntegerEditor from "./components/EnhancedTable/IntegerEditor";
import Button from "@material-ui/core/Button/Button";
import AddIcon from "@material-ui/icons/Add";
import GlobalFab from "./components/GlobalFab";


const fabs = [
    <Button variant={"fab"} color={"primary"}><AddIcon/></Button>,
    <Button variant={"fab"} color={"secondary"}><AddIcon/></Button>
];

interface State {
    index: number
}
class App extends React.PureComponent<{}, State> {
    constructor(props:{}) {
        super(props);
        this.state = {index:0}
    }
    handleFabChange = ()=> {
        const index = (this.state.index+1)%fabs.length;
        this.setState({index});
    };
    render() {
        return <div>
            <GlobalFab>
                {fabs[this.state.index]}
            </GlobalFab>
            <Button variant={"raised"} onClick={this.handleFabChange}>change fab</Button>
        </div>
    }
}

ReactDom.render(<App />, document.getElementById('root'));