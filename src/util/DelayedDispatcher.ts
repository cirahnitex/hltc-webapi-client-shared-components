import {Dispatcher} from "flux";

export default class DelayedDispatcher extends Dispatcher<any> {
    dispatch(x:any) {
        setTimeout(()=>super.dispatch(x),0);
    }
}
