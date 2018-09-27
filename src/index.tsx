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
import {style} from "typestyle";
import GlobalFab from "./components/GlobalFab";
import BooleanDisplayAndEdit from "./components/EnhancedTable/BooleanDisplayAndEdit";
import IconSearchAppBar from "./components/commonAppBars/IconSearchAppBar";
import TextField from "@material-ui/core/TextField/TextField";
import {createInputSlideUpWithIosVK} from "./components/InputSlideUpWithIosVK";
import BrowserHistoryAnchor from "./components/BrowserHistoryAnchor";

interface Item {
    a: string,
    b: string,
    c:boolean
}

const items:Item[] = [
    {a: "aha",b:'1',c:true},
    {a: "bla",b:'2',c:false},
    {a: "bla",b:'3',c:true},

];

function findItemById(items:Item[], id:string) {
    for(let i=0; i<items.length; i++) {
        const item = items[i];
        if(item.b === id) return i;
    }
    return null;
}

interface EditorProps {
    value:string;
    onRequestValueChange: (value:string)=>any;
    onRequestClose: ()=>any;
    item: Item;
}

const rootCss = style({
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
});

const FullscreenEditor = ({value, onRequestClose, onRequestValueChange, item}:EditorProps) => (<div className={rootCss}>
    <IconAppBar title={"haha"} icon={<BackIcon/>} onIconClick={onRequestClose}/>
    <AppBarMain>
        {JSON.stringify(item)}
    </AppBarMain>
    {GlobalFab.nil()}
</div>);

const EnhancedTable = createEnhancedTable((item:Item)=>item.b,
    {field: "a", editComponent:FullscreenEditor, editMode:"fullscreen"},
    {field: "b", editComponent: TextEditor},
    {field: 'c', displayComponent: BooleanDisplayAndEdit}
);

const onItemEdit = {
    "a":(id:string, value:string) => {console.log(id, value)},
    "c":(id:string, value:boolean) => {console.log(value)}
};

const AwesomeTextField = createInputSlideUpWithIosVK(TextField);

interface Props{

}
interface State {
    mountChildren: boolean;
    mount2children: boolean;
}

class App extends React.PureComponent<Props, State> {
    constructor(props:Props) {
        super(props);
        this.state = {
            mountChildren: false,
            mount2children: false
        }
    }
    handleRootAnchor = ()=>this.setState({mountChildren:false, mount2children: false});
    handleChildrenAnchor = ()=>this.setState({mount2children: false});
    handleMountChildren = ()=>this.setState({mountChildren: true, mount2children: true});
    render() {
        return <div >

            <IconSearchAppBar icon={<BackIcon />} title={"my app"} onIconClick={()=>{}}/>
            <AppBarMain>
                <EnhancedTable title={"list of stuffs"} items={items} negativeMargin onItemEdit={onItemEdit} selection={[]} selectionActions={<BackIcon/>}/>
                {this.state.mountChildren && <BrowserHistoryAnchor onReturnedToAnchor={this.handleChildrenAnchor}>
                    children
                    {this.state.mount2children && <BrowserHistoryAnchor>
                        inner children
                    </BrowserHistoryAnchor>}
                </BrowserHistoryAnchor>}

                <button onClick={this.handleMountChildren}>mount children</button>
                <button onClick={this.handleRootAnchor}>unmount children</button>
            </AppBarMain>
            <BrowserHistoryAnchor onReturnedToAnchor={this.handleRootAnchor} />
        </div>
    }
}

ReactDom.render(<App />, document.getElementById('root'));