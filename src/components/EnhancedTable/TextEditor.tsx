import * as React from "react";
import Input from "@material-ui/core/Input/Input";
import Button from "@material-ui/core/Button/Button";
import {style} from "typestyle";

const rootCss = style({
    display: "flex",
    flexDirection: "column",
});

const btnWrap = style({
    margin: '8px -16px 0px -16px',
    display: "flex",
    justifyContent: "flex-end"
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
            <Input value={editingValue} onChange={this.handleEditingValueChange}/>
            <div className={btnWrap}>
                <Button color={"primary"} disabled={value === editingValue} onClick={this.handleSubmit}>SAVE</Button>
            </div>
        </div>
    }
}