import * as React from 'react';
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";

interface Props {
    label?: string;
    maxLength: number;
    value?: string;
    onChange?: (e:React.ChangeEvent<HTMLTextAreaElement|HTMLInputElement>)=>void;
    style?: React.CSSProperties;
    fullWidth?: boolean;
}
interface State {
    value: string;
}
class MaxLengthInput extends React.Component<Props, State> {
    constructor(props:Props) {
        super(props);
        this.state = {
            value: "",
        }
    }
    handleChange(e:React.ChangeEvent<HTMLTextAreaElement|HTMLInputElement>) {
        if(MaxLengthInput.getLength(e.target.value) > this.props.maxLength) {
            e.target.value = e.target.value.substr(0, this.props.maxLength);
        }
        if(this.props.onChange) {
            this.props.onChange(e);
        }
        this.setState({value:e.target.value})
    }
    static getLength(val:Array<any>|string|null) {
        return val?val.length:0;
    }
    render() {
        let {label, maxLength, value, onChange, ...others} = this.props;
        if(typeof(value)==='undefined') {
            value = this.state.value;
        }
        return <FormControl {...others}>
            {label && <InputLabel>{label}</InputLabel>}
            <Input value={value} onChange={e=>this.handleChange(e)}/>
            <FormHelperText>{MaxLengthInput.getLength(value)}/{maxLength}</FormHelperText>
        </FormControl>
    }
}

export default MaxLengthInput;