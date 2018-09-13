import * as React from "react"
import * as ReactDom from "react-dom"
import createEnhancedTable from "./components/EnhancedTable/EnhancedTable";
import IntegerEditor from "./components/EnhancedTable/IntegerEditor";

interface Item {
    a: number;
    b: number;
}

const EnhancedTable = createEnhancedTable((item:Item)=>item.a,
    {field: "a", label: "Item_ID"},
    {field: "b", label: "value", numeric: true, editComponent: IntegerEditor}
    );

const items:Item[] = [
    {a: 1, b:2},
    {a: 2, b:3}
];

function App() {
    return <EnhancedTable title={"enhanced table"} items={items} onItemEdit={(id, field, value)=>console.log(id, field, value)}/>
}

ReactDom.render(<App />, document.querySelector('#root'));