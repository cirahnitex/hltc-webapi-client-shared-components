import * as React from "react";
import * as ReactDom from "react-dom";
import Zoom from "@material-ui/core/Zoom/Zoom";
import Button, {ButtonProps} from "@material-ui/core/Button/Button";

interface State {
    fabEl: ButtonProps | null;
    existingFabEl: ButtonProps | null;
}

function shallowEqual(x:ButtonProps|null, y:ButtonProps|null) {
    if(x===y) return true;
    if(!x || !y) return false;
    const keys = Object.keys(x);
    if(keys.length !== Object.keys(y).length) return false;
    for(const key of keys) {
        if(x[key] !== y[key]) return false;
    }
    return true;
}

class FabWrap extends React.PureComponent<{}, State> {
    constructor(props:{}) {
        super(props);
        this.state = {
            fabEl: null,
            existingFabEl: null
        };
        FabWrap.instance = this;
    }
    static instance:FabWrap|null = null;
    handleZoomExit = () => {
        const {fabEl} = this.state;
        this.setState({existingFabEl:fabEl});
    };
    render() {
        const {fabEl, existingFabEl} = this.state;
        if(!existingFabEl) {
            return <div />
        }
        return <Zoom in={shallowEqual(fabEl, existingFabEl)} onExited={this.handleZoomExit}>
            <Button variant={"fab"} {...existingFabEl} />
        </Zoom>
    }
}

function setGlobalFab(fabEl: ButtonProps | null) {
    if(FabWrap.instance) {
        if(FabWrap.instance.state.existingFabEl) {
            if(!shallowEqual(fabEl, FabWrap.instance.state.existingFabEl)) {
                FabWrap.instance.setState({fabEl});
            }
        }
        else {
            FabWrap.instance.setState({fabEl, existingFabEl:fabEl});
        }
    }
}

const root = document.createElement('div');
root.style.position = "fixed";
root.style.right = '16px';
root.style.bottom = '16px';
root.style.zIndex = '1200'; // because material-ui appbar zIndex=1100, FAB need to be higher than that
document.body.appendChild(root);
ReactDom.render(<FabWrap />, root);

type Props = ButtonProps;

export default class GlobalFab extends React.PureComponent<Props, {}> {
    componentWillUnmount() {
        setGlobalFab(null);
    }
    render() {
        setTimeout(()=>setGlobalFab(this.props),0);
        return <div />
    }
}