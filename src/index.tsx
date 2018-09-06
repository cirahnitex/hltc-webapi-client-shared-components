import * as React from "react"
import * as ReactDom from "react-dom"
import AutoComplete from "./components/Autocomplete";
import Typography from "@material-ui/core/Typography/Typography";

const App = ()=><div>
    <Typography variant={"body1"}>AutoComplete</Typography>
    <AutoComplete suggestions={["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]} label={"choose day of week"}/>
</div>;

const root = document.querySelector("#root");
ReactDom.render(<App />, root);