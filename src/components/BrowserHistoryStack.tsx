import * as React from "react";

interface Props {
    children?: React.ReactNode;
    onRequestBack: ()=>any;
}

interface State {

}

const stateToPushBuffer: number[] = [];
function executeStatePushFromBuffer() {
    let id:number|undefined;
    while((id = stateToPushBuffer.pop()) !== undefined) {
        history.replaceState(id, undefined, `#${id}`);
        history.pushState(id+1, undefined, `#${id+1}`);
    }
}
function queueState(state:number) {
    if(stateToPushBuffer.length==0) {
        setTimeout(executeStatePushFromBuffer,0);
    }
    stateToPushBuffer.push(state);
}


let uniqueNumber = 0;
export default class BrowserHistoryStack extends React.PureComponent<Props, State> {
    id: number;
    backHandled: boolean = false;
    constructor(props:Props) {
        super(props);
        this.id = uniqueNumber++;
    }
    handlePopState = (event:PopStateEvent)=>{
        if(event.state === this.id) {
            this.backHandled = true;
            this.props.onRequestBack();
        }
    };
    componentDidMount() {
        queueState(this.id);
        window.addEventListener('popstate', this.handlePopState);
    }
    componentWillUnmount() {
        window.removeEventListener('popstate', this.handlePopState);
        if(!this.backHandled) {history.back()}
    }
    render() {
        return this.props.children == null?null:this.props.children;
    }
}