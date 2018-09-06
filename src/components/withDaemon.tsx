import * as React from 'react';

type ComponentConstructor<TProps> = React.ComponentClass<TProps> | React.StatelessComponent<TProps>;

export function withDaemon<Props>(Comp:ComponentConstructor<Props>, daemonTask:()=>void, interval:number) {
    return class extends React.PureComponent<Props,{}> {
        refreshDaemon = 0;
        componentWillMount() {
            daemonTask();
            if(!this.refreshDaemon) this.refreshDaemon = window.setInterval(daemonTask, interval);
        }
        componentWillUnmount() {
            clearInterval(this.refreshDaemon);
            this.refreshDaemon = 0;
        }
        render() {
            return <Comp {...this.props}/>
        }
    }
}