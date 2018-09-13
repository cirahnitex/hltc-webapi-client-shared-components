import * as React from "react";
import * as ReactDom from "react-dom";
import createEnhancedTable from "./components/EnhancedTable/EnhancedTable";
import IntegerEditor from "./components/EnhancedTable/IntegerEditor";
var EnhancedTable = createEnhancedTable(function (item) { return item.a; }, { field: "a", label: "Item_ID" }, { field: "b", label: "value", numeric: true, editComponent: IntegerEditor });
var items = [
    { a: 1, b: 2 },
    { a: 2, b: 3 }
];
function App() {
    return React.createElement(EnhancedTable, { title: "enhanced table", items: items, onItemEdit: function (id, field, value) { return console.log(id, field, value); } });
}
ReactDom.render(React.createElement(App, null), document.querySelector('#root'));
//# sourceMappingURL=index.js.map