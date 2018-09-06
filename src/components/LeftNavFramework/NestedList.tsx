import * as React from 'react';
import pink from "@material-ui/core/colors/pink";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Collapse from "@material-ui/core/Collapse/Collapse";
import List from "@material-ui/core/List/List";

export type ListEntry = {
    caption: string | React.ReactFragment,
    nextLevel: ListEntry[] | null;
};

export interface Props {
    items: ListEntry[];
    path: number[];
    onRequestPathChange: (path:number[])=>void;
    indentLevel?: number;
}

interface State {
    isExpanded: boolean[];
}


const INDENT_WIDTH = 16;

export default class NestedList extends React.PureComponent<Props, State> {
    handleChildrenPathChange: ((path:number[])=>void)[];
    handleChildrenClick: ((e:any)=>void)[];

    constructor(props: Props) {
        super(props);
        this.state ={
            isExpanded: props.items.map((x,i)=>i===props.path[0])
        };
        this.setEventHandler(props);
    }
    setEventHandler(props:Props) {
        this.handleChildrenPathChange = props.items.map((x, index)=>(subPath: number[])=>{
            props.onRequestPathChange([index,...subPath]);
        });
        this.handleChildrenClick = props.items.map((x,index)=> {
            if (x.nextLevel == null) return (e:any) => {props.onRequestPathChange([index])};
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
        const isInPath = this.props.path.length && this.props.path[0]===index;
        let highlightStyle = {};
        if(isInPath) {
            highlightStyle = {color:pink[500],fontWeight:"500"}
        }

        let indentStyle:any = {marginLeft: indentLevel*INDENT_WIDTH};
        let listItemStyle = {};
        if(item.nextLevel == null && isInPath) {
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
        if(item.nextLevel == null) return caption;
        const collapse = <Collapse in={this.state.isExpanded[index]} timeout={"auto"} unmountOnExit key={1}>
            <NestedList items={item.nextLevel} path={isInPath?this.props.path.slice(1):[]} onRequestPathChange={this.handleChildrenPathChange[index]} indentLevel={indentLevel+1}/>
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