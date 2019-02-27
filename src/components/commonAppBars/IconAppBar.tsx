import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import BasicAppBar from './BasicAppBar';
import {AppBarProps} from "@material-ui/core/AppBar";


interface Props extends AppBarProps {
    icon: React.ReactElement<any>;
    onIconClick?: ()=>any;
    title: string;
    children?: React.ReactFragment;
}

function IconAppBar(props:Props) {
    const { title, icon, onIconClick, children, ...others } = props;
    const leftWidget = <IconButton color="inherit" onClick={onIconClick}>
        {icon}
    </IconButton>;
    return <BasicAppBar title={title} leftWidget={leftWidget} {...others}>
        {children}
    </BasicAppBar>;
}

export default IconAppBar;