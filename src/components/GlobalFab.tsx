import * as React from "react";
import * as ReactDom from "react-dom";
import Zoom from "@material-ui/core/Zoom/Zoom";


interface State {
    fabEl: React.ReactNode;
    existingFabEl: React.ReactNode;
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
        return <Zoom in={existingFabEl === fabEl} onExited={this.handleZoomExit}>
            {existingFabEl}
        </Zoom>
    }
}

function setGlobalFab(fabEl: React.ReactNode) {
    if(FabWrap.instance) {
        if(FabWrap.instance.state.existingFabEl) {
            FabWrap.instance.setState({fabEl});
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
root.style.zIndex = '1000';
document.body.appendChild(root);
ReactDom.render(<FabWrap />, root);

interface Props {
    children: React.ReactElement<any>;
}

export default class GlobalFab extends React.PureComponent<Props, {}> {
    componentWillUnmount() {
        setGlobalFab(null);
    }
    render() {
        setGlobalFab(this.props.children);
        return <div />
    }
}