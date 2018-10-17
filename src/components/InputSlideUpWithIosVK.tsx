import * as React from 'react';

let timer = 0;
function handleFocus() {
    timer = window.setTimeout(function() {
        document.body.scrollTop = 270;
    }, 200);
}
function handleBlur() {
    if(timer) {
        window.clearTimeout(timer);
        timer = 0;
    }
}

interface FocusProps {
    onFocus?: (event:any)=>any;
    onBlur?: (event:any)=>any;
}

const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

export function createInputSlideUpWithIosVK<T extends FocusProps>(Component: React.ComponentType<T>) {
    // IOS VK problem does not occur when in native app's WebView, so we use normal input when in WebView
    // hltc WebView wrapper injects a NativeInject global variable
    if(iOS && (window as any).NativeInject == null) {
        return (props:T)=>{
            const onFocus = (e:any)=>{
                handleFocus();
                if(props.onFocus != null) props.onFocus(e);
            };
            const onBlur = (e:any)=>{
                handleBlur();
                if(props.onBlur != null) props.onBlur(e);
            };
            return <Component {...props} onFocus={onFocus} onBlur={onBlur}/>
        }
    }
    else {
        return Component;
    }
}