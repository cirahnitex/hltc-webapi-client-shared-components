import * as React from 'react';
import * as ReactDom from 'react-dom';
import Snackbar from "@material-ui/core/Snackbar";

interface Props {}
interface State {
    open: boolean;
    msg: string;
}

class Toast extends React.Component<Props, State> {
    openLaterTimer:number = 0;
    constructor(props:Props) {
        super(props);
        this.state = {
            open: false,
            msg: "",
        }
    }
    handleClose = () => {
        this.setState({ open: false });
    };
    open(msg:string) {
        if(this.state.open) {
            this.setState({open:false});
            clearTimeout(this.openLaterTimer);
            this.openLaterTimer = window.setTimeout(()=>{
                this.setState({open:true, msg:msg});
                this.openLaterTimer = 0;
            },250);
        }
        else if(!this.openLaterTimer) {
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
        toastElem = this;
    }
    render() {
        return <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={this.state.open}
            autoHideDuration={3000}
            onClose={this.handleClose}
            message={<span>{this.state.msg}</span>}
        >
        </Snackbar>
    }
}

let toastElem:Toast|null = null;

window.addEventListener('load', function() {
    const toastWrap = document.createElement('div');
    document.body.appendChild(toastWrap);
    ReactDom.render( <Toast/>,toastWrap);
});

export function toast(msg:string|Error) {
    if(msg instanceof Error) {
        console.error(msg);
        msg = msg.message;
    }
    if(toastElem) {
        toastElem.open(msg);
    }
}