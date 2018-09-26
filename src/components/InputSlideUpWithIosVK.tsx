import * as React from 'react';

export const IOS_VK_OPEN_CSS_CLASS_ON_BODY = 'ios-virtual-keyboard-opened';

let timer = 0;
function handleFocus() {
    timer = window.setTimeout(function() {
        document.body.classList.add(IOS_VK_OPEN_CSS_CLASS_ON_BODY);
        document.body.scrollTop = 270;
    }, 200);
}
function handleBlur() {
    document.body.classList.remove(IOS_VK_OPEN_CSS_CLASS_ON_BODY);
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
    if(iOS) {
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