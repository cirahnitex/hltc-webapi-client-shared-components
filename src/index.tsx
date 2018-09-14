import * as React from "react"
import * as ReactDom from "react-dom"
import createEnhancedTable from "./components/EnhancedTable/EnhancedTable";
import IntegerEditor from "./components/EnhancedTable/IntegerEditor";
import Button from "@material-ui/core/Button/Button";
import AddIcon from "@material-ui/icons/Add";
import * as GlobalFab from "./components/setGlobalFab";


const fabs = [
    <Button variant={"fab"} color={"primary"}><AddIcon/></Button>,
    <Button variant={"fab"} color={"secondary"}><AddIcon/></Button>
];

let index = 0;

function showNextFab() {
    index++;
    index = index % fabs.length;
    GlobalFab.setGlobalFab(fabs[index])
}

const button = document.createElement('button');
button.onclick = showNextFab;
button.innerHTML = "hihi";

document.body.appendChild(button);