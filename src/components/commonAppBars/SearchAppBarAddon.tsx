import * as React from 'react';
import Input from '@material-ui/core/Input';
import { fade } from '@material-ui/core/styles/colorManipulator';
import {Theme, WithStyles, withStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import createStyles from "@material-ui/core/styles/createStyles";

const styles = (theme:Theme) => createStyles({
    grow: {
        flexGrow: 1,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
    },
    searchIcon: {
        width: theme.spacing(5),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(5),
        transition: theme.transitions.create('width'),
        fontSize: '16px',
        width: 60,
        '&:focus': {
            width: 120,
        },
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
});

interface Props extends WithStyles<typeof styles> {
    searchValue?: string;
    onSearchValueChange?: (x:string)=>any;
}

function SearchAppBarAddon(props:Props) {
    const { searchValue, onSearchValueChange,  classes, ...others } = props;
    return <div className={classes.search}>
        <div className={classes.searchIcon}>
            <SearchIcon />
        </div>
        <Input
            placeholder="search"
            disableUnderline
            classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
            }}
            value={searchValue}
            onChange={onSearchValueChange?e=>onSearchValueChange(e.target.value):undefined}
        />
    </div>;
}

export default withStyles(styles)(SearchAppBarAddon);