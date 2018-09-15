import * as React from 'react';
import Portal from "@material-ui/core/Portal/Portal";
import Slide from "@material-ui/core/Slide/Slide";
import {style} from "typestyle";
import Modal from "@material-ui/core/Modal/Modal";

interface Props {
    in: boolean;
    children: React.ReactNode;
}
const containerCss = style({position:"absolute",left:0,top:0,width:'100%',height:'100%'});

export default function FullscreenSlideIn(props:Props) {
    return <Modal open={props.in} hideBackdrop disableBackdropClick disableEscapeKeyDown>
        <Slide direction={"left"} in={props.in} mountOnEnter unmountOnExit>
            <div className={containerCss}>
                {props.children}
            </div>
        </Slide>
    </Modal>
}