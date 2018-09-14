import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import BasicAppBar from './BasicAppBar';


interface Props {
    icon: React.ReactElement<any>;
    onIconClick?: ()=>any;
    title: string;
    children?: React.ReactFragment;
}

function IconAppBar(props:Props) {
    const { title, icon, onIconClick, children } = props;
    const leftWidget = <IconButton color="inherit" onClick={onIconClick}>
        {icon}
    </IconButton>;
    return <BasicAppBar title={title} leftWidget={leftWidget}>
        {children}
    </BasicAppBar>;
}

export default IconAppBar;