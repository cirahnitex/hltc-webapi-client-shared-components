import * as React from 'react';
import * as ReactDom from 'react-dom';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent/SnackbarContent";
import IconButton from "@material-ui/core/IconButton/IconButton";
import {style} from "typestyle";

const Styles = {
    errorToast: style({
        backgroundColor: "#E53935 !important"
    })
};


interface State {
    open: boolean;
    msg: string;
}

class ErrorToast extends React.Component<{},State> {
    openLaterTimer:number|undefined = undefined;
    constructor(props:{}) {
        super(props);
        this.state = {
            open: false,
            msg: "",
        }
    }
    handleClose = (event:React.MouseEvent<HTMLElement>, reason?:string) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ open: false });
    };
    open(msg:string) {
        if(this.state.open) {
            this.setState({open:false});
            clearTimeout(this.openLaterTimer);
            this.openLaterTimer = window.setTimeout(()=>{
                this.setState({open:true, msg:msg});
                this.openLaterTimer = undefined;
            },250);
        }
        else if(this.openLaterTimer != undefined) {
            this.setState({msg:msg})
        }
        else {
            this.setState({
                open:true,
                msg:msg,
            })
        }
    }
    componentWillMount() {
        errorToast = this;
    }
    render() {
        return <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={this.state.open}
            autoHideDuration={5000}
            onClose={this.handleClose}
        >
            <SnackbarContent
                message={<span id="message-id">{this.state.msg}</span>}
                classes={{root:Styles.errorToast}}
                action={
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={this.handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                }
            >
            </SnackbarContent>
        </Snackbar>
    }
}
let errorToast:null|ErrorToast = null;

window.addEventListener('load', function() {
    const toastWrap = document.createElement('div');
    document.body.appendChild(toastWrap);
    ReactDom.render( <ErrorToast/>,toastWrap);
});


export function toastError(msg:string|Error) {
    if(msg instanceof Error) {
        console.error(msg);
        msg = msg.message || msg.toString();
    }
    if(errorToast) {
        errorToast.open(msg);
    }
}