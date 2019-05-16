import * as React from "react";
import Input from "@material-ui/core/Input/Input";
import Button from "@material-ui/core/Button/Button";
import {style} from "typestyle";

const rootCss = style({
    padding: 8,
    display: "flex",
    flexDirection: "column",
});

interface Props {
    value: string;
    onRequestValueChange: (value:string)=>any;
    onRequestClose: ()=>any;
}
interface State {
    editingValue: string;
}

export default class TextEditor extends React.PureComponent<Props, State> {
    constructor(props:Props) {
        super(props);
        this.state = {
            editingValue: props.value
        }
    }
    handleEditingValueChange = (e:any)=>{this.setState({editingValue:e.target.value})};
    handleSubmit = ()=>this.props.onRequestValueChange(this.state.editingValue);
    render() {
        const {value} = this.props;
        const {editingValue} = this.state;
        return <div className={rootCss}>
            <textarea value={editingValue} onChange={this.handleEditingValueChange}/>
            <div style={{height:8}} />
            <Button color={"primary"} disabled={value === editingValue} onClick={this.handleSubmit} variant={"contained"} size={"small"}>SAVE</Button>
        </div>
    }
}