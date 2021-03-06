import * as React from "react";
import * as ReactDom from "react-dom";
import Zoom from "@material-ui/core/Zoom";
import Fab, {FabProps} from "@material-ui/core/Fab";

interface State {
    fab: FabProps | null;
    existingFab: FabProps | null;
}

function shallowEqual(x:FabProps|null, y:FabProps|null) {
    if(x===y) return true;
    if(!x || !y) return false;
    const keys = Object.keys(x);
    if(keys.length !== Object.keys(y).length) return false;
    for(const key of keys) {
        if(x[key] !== y[key]) return false;
    }
    return true;
}

function top(fabStack:(FabProps|null)[]):FabProps | null {
    if(fabStack.length<=0) return null;
    return fabStack[fabStack.length-1];
}


class FabWrap extends React.PureComponent<{}, State> {
    constructor(props:{}) {
        super(props);
        this.state = {
            fab: null,
            existingFab: null
        };
        FabWrap.instance = this;
    }
    static instance:FabWrap|null = null;
    handleZoomExit = () => {
        const {fab} = this.state;
        this.setState({
            existingFab:fab
        });
    };
    setFab(fab:FabProps|null) {
        if(this.state.existingFab) {
            if(!shallowEqual(fab, this.state.existingFab)) {
               this.setState({fab});
            }
        }
        else {
            if(fab) {
                this.setState({fab, existingFab:fab});
            }
        }
    }
    render() {
        const {fab, existingFab} = this.state;
        if(!existingFab) {
            return <div />
        }
        return <Zoom in={shallowEqual(fab, existingFab)} onExited={this.handleZoomExit}>
            <Fab {...existingFab} />
        </Zoom>
    }
}

let fabStack: (FabProps|null)[] = [];

function setGlobalFab(fab: FabProps | null) {
    if(!FabWrap.instance) return;
    FabWrap.instance.setFab(fab);
    fabStack.push(fab);
}

function removeGlobalFab(fab: FabProps | null) {
    if(!FabWrap.instance) return;
    if(shallowEqual(top(fabStack), fab)) {
        fabStack.pop();
        FabWrap.instance.setFab(top(fabStack));
    }
    else {
        // use reversedIndex because we want to remove the last match
        const reversedIndex = fabStack.reverse().findIndex(x=>shallowEqual(x, fab));
        if(reversedIndex>=0) {
            fabStack.splice(fabStack.length - 1 - reversedIndex, 1);
        }
    }
}

const root = document.createElement('div');
root.style.position = "fixed";
root.style.right = '16px';
root.style.bottom = '16px';
root.style.zIndex = '1400'; // because material-ui model zIndex=1300, FAB need to be higher than that
document.body.appendChild(root);
ReactDom.render(<FabWrap />, root);

type Props = FabProps;

class NilFab extends React.PureComponent<{},{}> {
    componentWillUnmount() {
        removeGlobalFab(null);
    }
    componentDidMount() {
        setGlobalFab(null);
    }
    render() {
        return <div />
    }
}

export default class GlobalFab extends React.PureComponent<Props, {}> {
    componentWillUnmount() {
        removeGlobalFab(this.props);
    }
    componentDidMount() {
        setGlobalFab(this.props);
    }
    componentDidUpdate() {
        setGlobalFab(this.props);
    }
    render() {
        return <div />
    }
    static nil() {return <NilFab/>}
}