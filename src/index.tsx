import * as React from "react"
import * as ReactDom from "react-dom"
import createEnhancedTable from "./components/EnhancedTable";

interface Item {
    a: number;
    b: number;
}

const EnhancedTable = createEnhancedTable<Item>((item:Item)=>item.a,
    {field: "a", label: "Item_ID"},
    {field: "b", label: "value", numeric: true, editable: true}
    );

const items:Item[] = [
    {a: 1, b:2},
    {a: 2, b:3}
];

function App() {
    return <EnhancedTable title={"enhanced table"} items={items} onItemEdit={(id, field, value)=>console.log(id, field, value)}/>
}

ReactDom.render(<App />, document.querySelector('#root'));