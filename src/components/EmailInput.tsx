import * as React from 'react';
import TextMask from 'react-text-mask';
import emailMask from 'text-mask-addons/dist/emailMask';
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";

function EmailMask({inputRef, ...others}:any) {
    return <TextMask {...others} mask={emailMask} showMask/>
}

interface Props {
    label?: string;
    value?: string;
    onChange?: (e:React.ChangeEvent<HTMLInputElement>)=>void;
}

const EmailInput = (props:Props) => (
    <FormControl>
        <InputLabel>{props.label || "Email"}</InputLabel>
        <Input
            value={props.value}
            inputComponent={EmailMask}
            onChange={props.onChange}
        />
    </FormControl>
);
function validateEmail(email:string) {
    return email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
}

export default EmailInput;
export {validateEmail};
