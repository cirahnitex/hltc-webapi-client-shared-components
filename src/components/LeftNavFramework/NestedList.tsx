import * as React from 'react';
import pink from "@material-ui/core/colors/pink";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse/"
import List from "@material-ui/core/List";

export type ListEntry = {
    caption: string | React.ReactFragment,
    /**
     * this will be called when
     * 1) the item is clicked
     * 2) the item is automatically selected as the default item
     *
     * this will NOT be called because of the "path" property changes
     */
    onClick?: ()=>any,
    children?: ListEntry[]
};

export interface Props {
    items: ListEntry[];
    path?: number[];
    onRequestPathChange?: (path:number[])=>void;
    indentLevel?: number;
}

interface State {
    isExpanded: boolean[];
    pathFallback: number[]
}

const getDefaultPath = (items?:ListEntry[]):number[]=>{
    if(items==null || items.length<=0) {
        return [];
    }
    return [0, ...getDefaultPath(items[0].children)];
};

const getDefaultItem = (item:ListEntry):ListEntry=>{
    if(item.children == null) return item;
    return getDefaultItem(item[0]);
};

const INDENT_WIDTH = 16;

export default class NestedList extends React.PureComponent<Props, State> {
    handleChildrenPathChange: ((path:number[])=>void)[];
    handleChildrenClick: ((e:any)=>void)[];

    constructor(props: Props) {
        super(props);
        this.state ={
            isExpanded: props.items.map((x,i)=>!!props.path && i===props.path[0]),

            // select the default item (the very first item recursively)
            pathFallback: getDefaultPath(props.items)
        };

        // if the default item is select, also call its "onClick" method
        if(props.path == null && props.items.length>0) {
            const defaultItem = getDefaultItem(props.items[0]);
            if(defaultItem.onClick) defaultItem.onClick();
        }
        this.setEventHandler(props);
    }
    handlePathChange = (path: number[])=>{
        if(this.props.onRequestPathChange) this.props.onRequestPathChange(path);
        else this.setState({pathFallback:path})
    };
    getPath(){return this.props.path || this.state.pathFallback}
    setEventHandler(props:Props) {
        this.handleChildrenPathChange = props.items.map((x, index)=>(subPath: number[])=>{
            this.handlePathChange([index,...subPath]);
        });
        this.handleChildrenClick = props.items.map((x,index)=> {
            if (x.children == null) {
                return (e: any) => {
                    this.handlePathChange([index]);
                    if(x.onClick) x.onClick();
                };
            }
            return ((e:any) => {
                const isExpanded = [...this.state.isExpanded];
                isExpanded[index] = !isExpanded[index];
                this.setState({isExpanded});
            })
        });
    }
    componentWillReceiveProps(props:Props) {
        if(props.items !== this.props.items) this.setEventHandler(props);
    }
    renderListEntry(index:number):React.ReactFragment {
        const item = this.props.items[index];
        const indentLevel = this.props.indentLevel || 0;
        const isInPath = this.getPath().length && this.getPath()[0]===index;
        let highlightStyle = {};
        if(isInPath) {
            highlightStyle = {color:pink[500],fontWeight:"500"}
        }

        let indentStyle:any = {marginLeft: indentLevel*INDENT_WIDTH};
        let listItemStyle = {};
        if(item.children == null && isInPath) {
            indentStyle = {
                marginLeft: indentStyle.marginLeft - 4,
            };
            listItemStyle = {
                borderLeft: `4px solid ${pink[500]}`,
            }
        }


        const caption = <ListItem dense button key={0} onClick={this.handleChildrenClick[index]} style={listItemStyle}>
            <div style={indentStyle}>
                {typeof(item.caption)==="string"?<ListItemText primary={<div style={highlightStyle}>{item.caption}</div>}/>:item.caption}
            </div>
        </ListItem>;
        if(item.children == null) {
            return caption;
        }
        const collapse = <Collapse in={this.state.isExpanded[index]} timeout={"auto"} unmountOnExit key={1}>
            <NestedList items={item.children} path={isInPath?this.getPath().slice(1):[]} onRequestPathChange={this.handleChildrenPathChange[index]} indentLevel={indentLevel+1}/>
        </Collapse>;
        return [caption, collapse];
    }
    render() {
        return <List component={"div"} disablePadding={!!this.props.indentLevel}>
            {this.props.items.map(
                (item, index)=>(<div key={index}>{this.renderListEntry(index)}</div>)
            )}
        </List>
    }
}