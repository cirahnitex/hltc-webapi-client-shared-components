import * as React from "react"
import * as ReactDom from "react-dom"
import AutoComplete from "./components/Autocomplete";
import Typography from "@material-ui/core/Typography/Typography";
import LeftNavFramework from "./components/LeftNavFramework/LeftNavFramework";
import Portal from "@material-ui/core/Portal/Portal";


const Page0 = ({addonWrap}:{addonWrap:HTMLDivElement})=>{
    return <div>
        <Portal container={addonWrap}>
            <div>addon of page 0</div>
        </Portal>
        content of page 0
    </div>
};

const items = [
    {
        caption: "page#0",
        content: (addonWrap:HTMLDivElement)=><Page0 addonWrap={addonWrap} />
    }
]

const App = ()=><LeftNavFramework title={"default title"} items={items}/>;

const root = document.querySelector("#root");
ReactDom.render(<App />, root);