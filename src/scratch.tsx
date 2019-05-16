import React from 'react';
import MaskedInput from 'react-text-mask';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import emailMask from 'text-mask-addons/dist/emailMask';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        formControl: {
            margin: theme.spacing(1),
        },
    }),
);

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
            placeholderChar={'\u2000'}
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
    const classes = useStyles();
    return <div className={classes.container}>
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="formatted-text-mask-input">{props.label || "Email"}</InputLabel>
            <Input
                value={props.value}
                inputComponent={TextMaskCustom}
                onChange={props.onChange}
                id="formatted-text-mask-input"
            />
        </FormControl>
    </div>
};

export default EmailInput;