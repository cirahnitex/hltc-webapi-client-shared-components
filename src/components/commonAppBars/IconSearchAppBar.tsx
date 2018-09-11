import * as React from 'react';
import Input from '@material-ui/core/Input';
import { fade } from '@material-ui/core/styles/colorManipulator';
import {Theme, withStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import {CSSProperties} from "@material-ui/core/styles/withStyles";
import IconAppBar from "./IconAppBar";

const styles = (theme:Theme) => ({
    grow: {
        flexGrow: 1,
    } as CSSProperties,
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit,
            width: 'auto',
        },
    } as CSSProperties,
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    } as CSSProperties,
    inputRoot: {
        color: 'inherit',
        width: '100%',
    } as CSSProperties,
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    } as CSSProperties,
});

interface Props {
    classes: Record<string, string>;
    icon: React.ReactElement<any>;
    onIconClick: ()=>any;
    title: string;
    searchValue: string;
    onSearchValueChange: (x:string)=>any;
}

function IconSearchAppBar(props:Props) {
    const { searchValue, onSearchValueChange,  classes, ...others } = props;
    return <IconAppBar {...others}>
        <div className={classes.grow} />
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <Input
                placeholder="Search…"
                disableUnderline
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                value={searchValue}
                onChange={e=>onSearchValueChange(e.target.value)}
            />
        </div>
    </IconAppBar>;
}

export default withStyles(styles)(IconSearchAppBar);