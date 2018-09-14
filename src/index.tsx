import * as React from "react"
import * as ReactDom from "react-dom"
import createEnhancedTable from "./components/EnhancedTable/EnhancedTable";
import IntegerEditor from "./components/EnhancedTable/IntegerEditor";
import TextEditor from "./components/EnhancedTable/TextEditor";
import BasicAppBar from "./components/commonAppBars/BasicAppBar";
import IconAppBar from "./components/commonAppBars/IconAppBar";
import BackIcon from "@material-ui/icons/ArrowBack";
import AppBarMain from "./components/commonAppBars/AppBarMain";
import Paper from "@material-ui/core/Paper/Paper";

interface Item {
    a: string,
    b: number
}

const items:Item[] = [
    {a: "aha",b:1},
    {a: "bla",b:2},
    {a: "bla",b:3},
    {a: "bla",b:4},
    {a: "bla",b:5},
    {a: "bla",b:6},
    {a: "aha",b:7},
    {a: "bla",b:8},
    {a: "bla",b:9},
    {a: "bla",b:10},
    {a: "bla",b:11},
    {a: "bla",b:12},

];

function findItemById(items:Item[], id:number) {
    for(let i=0; i<items.length; i++) {
        const item = items[i];
        if(item.b === id) return i;
    }
    return null;
}

const EnhancedTable = createEnhancedTable((item:Item)=>item.b,
    {field: "a", editComponent:TextEditor},
    {field: "b", editComponent:IntegerEditor}
);

const onItemEdit = {
    "a":(id:Number, value:string) => {console.log(id, value)}
};

ReactDom.render(<div>
    <IconAppBar icon={<BackIcon />} title={"my app"}/>
    <AppBarMain>
        <EnhancedTable title={"list of stuffs"} items={items} negativeMargin onItemEdit={onItemEdit}/>
    </AppBarMain>

</div>, document.getElementById('root'));