import React from 'react';
import ControlledDebounceButton from "./components/ControlledDebounceButton";


const EmailInput = () => {
    const [loading, setLoading] = React.useState(false);
    return <div>
        <ControlledDebounceButton loading={loading}>debounce button</ControlledDebounceButton>
        <button onClick={()=>setLoading(x=>!x)}>toggle loading</button>
    </div>
};

export default EmailInput;