import * as React from "react";

class TracedHistory {
    stateStack: number[] = [];
    constructor() {
        window.addEventListener('popstate',this.handlePopState)
    }
    handlePopState = (e:PopStateEvent)=>{
        this._popInternallyUntilRemain(e.state);
    };
    pushState(state:number) {
        this.stateStack.push(state);
        history.pushState(state,undefined,`#${state}`);
    }
    back(distance:number=1) {
        for(let i=0;i<distance;i++) {
            this.stateStack.pop();
            history.back();
        }
    }
    _popInternallyUntilRemain(state:number) {
        const index = this.stateStack.indexOf(state);
        if(index<0) return;
        if(index === this.stateStack.length - 1) return;
        this.stateStack.splice(index+1);
    }
    backUntilRemove(state:number) {
        const index = this.stateStack.indexOf(state);
        if(index<0) return;
        this.back(this.stateStack.length - index);
    }
    contains(state:number) {
        return this.stateStack.indexOf(state)>=0;
    }
}
const tracedHistory = new TracedHistory();


let stateToPushBuffer: number[] = [];
function executeStatePushFromBuffer() {
    let id:number|undefined;
    while((id = stateToPushBuffer.pop()) !== undefined) {
        tracedHistory.pushState(id);
    }
}
function queueStateToPush(state:number) {
    if(stateToPushBuffer.length==0) {
        setTimeout(executeStatePushFromBuffer,0);
    }
    stateToPushBuffer.push(state);
}


let uniqueNumber = 0;

interface Props {
    children?: React.ReactNode;
    onReturnedToAnchor?: ()=>any;
}
export default class BrowserHistoryAnchor extends React.PureComponent<Props, {}> {
    id: number;
    constructor(props:Props) {
        super(props);
        this.id = uniqueNumber++;
    }
    handlePopState = (event:PopStateEvent)=>{
        if(event.state === this.id) {
            setTimeout(()=>{
                if(history.state === this.id && this.props.onReturnedToAnchor) this.props.onReturnedToAnchor();
            },10);
        }
    };
    componentDidMount() {
        queueStateToPush(this.id);
        window.addEventListener('popstate', this.handlePopState);
    }
    componentWillUnmount() {
        window.removeEventListener('popstate', this.handlePopState);
        tracedHistory.backUntilRemove(this.id);
    }
    render() {
        return this.props.children==null?null:this.props.children;
    }
}