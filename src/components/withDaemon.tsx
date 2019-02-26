import * as React from 'react';

type ComponentConstructor<TProps> = React.ComponentClass<TProps> | React.StatelessComponent<TProps>;

const delay = (ms:number)=>new Promise((resolve)=>setTimeout(resolve, ms));

/**
 * wrap a component which while being attached to DOM, keep executing a daemon task with an interval
 * @param Comp the component to wrap
 * @param daemonTask the task to repeatedly be executed
 * @param interval the time interval between execution (ms)
 */
export function withDaemon<Props>(Comp:ComponentConstructor<Props>, daemonTask:()=>Promise<void>|void, interval:number) {
    return class extends React.PureComponent<Props,{}> {
        shouldStop = false;
        componentWillMount() {
            (async()=>{
                while(true) {
                    await daemonTask();
                    if(this.shouldStop) break;
                    await delay(interval);
                    if(this.shouldStop) break;
                }
            })();
        }
        componentWillUnmount() {
            this.shouldStop = true;
        }
        render() {
            return <Comp {...this.props}/>
        }
    }
}