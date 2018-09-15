import * as React from "react";
import Input from "@material-ui/core/Input/Input";
import Button from "@material-ui/core/Button/Button";
import {style} from "typestyle";

const rootCss = style({
    display: "flex",
    flexDirection: "column",
    alignItems: 'flex-end'
});

const btnWrap = style({
    margin: '8px -16px 0px -16px',
    display: "flex",
    justifyContent: "flex-end"
});


interface Props {
    value: number;
    onRequestValueChange: (value:number)=>any;
    onRequestClose: ()=>any;
}
interface State {
    editingValue: string;
}

export default class IntegerEditor extends React.PureComponent<Props, State> {
    constructor(props:Props) {
        super(props);
        this.state = {
            editingValue: props.value.toString()
        }
    }
    handleEditingValueChange = (e:any)=>{
        const newValue = e.target.value;
        if(newValue.match(/^-?[0-9]*$/)) {
            this.setState({editingValue:e.target.value})
        }
        else {
            this.setState({editingValue:this.state.editingValue})
        }
    };
    handleSubmit = ()=>this.props.onRequestValueChange(parseInt(this.state.editingValue));
    render() {
        const {value} = this.props;
        const {editingValue} = this.state;
        return <div className={rootCss}>
            <Input value={editingValue} onChange={this.handleEditingValueChange}/>
            <div className={btnWrap}>
                <Button color={"primary"} disabled={value === parseInt(editingValue)} onClick={this.handleSubmit}>SAVE</Button>
            </div>
        </div>
    }
}