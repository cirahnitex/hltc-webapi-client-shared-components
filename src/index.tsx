import * as React from "react"
import * as ReactDom from "react-dom"
import AutoComplete from "./components/Autocomplete";
import Typography from "@material-ui/core/Typography/Typography";
import LeftNavFramework from "./components/LeftNavFramework/LeftNavFramework";
import Portal from "@material-ui/core/Portal/Portal";
import IconAppBar from "./components/commonAppBars/IconAppBar";
import BackIcon from "@material-ui/icons/ArrowBack";
import AppBarMain from "./components/commonAppBars/AppBarMain";

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

const App = ()=><div>
    <IconAppBar title={"default title"} icon={<BackIcon/>} onIconClick={()=>{}}/>
    <AppBarMain>this is content</AppBarMain>
</div>;

const root = document.querySelector("#root");
ReactDom.render(<App />, root);