import * as React from "react";
import * as ReactDom from "react-dom";
import Zoom from "@material-ui/core/Zoom/Zoom";

interface Props {

}

interface State {
    fabEl: React.ReactElement<any> | null;
    existingFabEl: React.ReactElement<any> | null;
}

class FabWrap extends React.PureComponent<Props, State> {
    constructor(props:Props) {
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

export function setGlobalFab(fabEl: React.ReactElement<any> | null) {
    if(FabWrap.instance) {
        if(FabWrap.instance.state.existingFabEl) {
            FabWrap.instance.setState({fabEl});
        }
        else {
            FabWrap.instance.setState({fabEl, existingFabEl:fabEl});
        }
    }
}

window.addEventListener('load', function() {
    const root = document.createElement('div');
    root.style.position = "fixed";
    root.style.right = '16px';
    root.style.bottom = '16px';
    root.style.zIndex = '1000';
    document.body.appendChild(root);
    ReactDom.render(<FabWrap />, root);
});

