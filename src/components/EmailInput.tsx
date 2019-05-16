import React from 'react';
import MaskedInput from "react-text-mask";
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import emailMask from 'text-mask-addons/dist/emailMask';

interface TextMaskCustomProps {
    inputRef: (ref: HTMLInputElement | null) => void;
}

function TextMaskCustom(props: TextMaskCustomProps) {
    const {inputRef, ...other} = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref: any) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={emailMask}
            showMask
        />
    );
}

interface Props {
    label?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmailInput = (props: Props) => {
    return <FormControl>
        <InputLabel htmlFor="formatted-text-mask-input">{props.label || "Email"}</InputLabel>
        <Input
            value={props.value}
            inputComponent={TextMaskCustom}
            onChange={props.onChange}
            id="formatted-text-mask-input"
        />
    </FormControl>
};

function validateEmail(email: string) {
    return email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
}

export default EmailInput;
export {validateEmail};
