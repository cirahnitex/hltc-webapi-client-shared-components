import * as React from 'react';

import Table from '@material-ui/core/Table';

import * as classNames from 'classnames';

import TableHead from "@material-ui/core/TableHead/TableHead";
import TableCell from "@material-ui/core/TableCell/TableCell";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import TableSortLabel from "@material-ui/core/TableSortLabel/TableSortLabel";
import {Theme} from "@material-ui/core";
import {lighten} from "@material-ui/core/styles/colorManipulator";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Typography from "@material-ui/core/Typography/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper/Paper";
import TableBody from "@material-ui/core/TableBody/TableBody";
import TablePagination from "@material-ui/core/TablePagination/TablePagination";
import Popover, {PopoverOrigin} from "@material-ui/core/Popover/Popover";
import TextDisplay from "./TextDisplay";

const Tooltip = require("@material-ui/core/umd/material-ui.development").Tooltip;

const TableRow = require("@material-ui/core/umd/material-ui.development").TableRow;


type FieldConfig<ItemType, Field extends keyof ItemType & string> = {
    field: Field,
    numeric?: boolean,
    disablePadding?: boolean,
    label?: string,
    disableSorting?: boolean,
    compareFunction?: ((a:ItemType, b:ItemType)=>number),
    displayComponent?: React.ComponentType<{value: ItemType[Field]}>,
    editComponent?: React.ComponentType<{value: ItemType[Field], onRequestValueChange:(value: ItemType[Field])=>any}>
};


function createEnhancedTableHeadComponent<ItemType>(columnData:FieldConfig<ItemType, any>[]) {
    type Key = keyof ItemType;
    interface Props {
        numSelected: number | null,
        onRequestSort: (columnKey: Key)=>void,
        onSelectAllClick: (event:any, checked:boolean)=>void,
        order: 'asc' | 'desc',
        orderBy: Key | null,
        rowCount: number
    }
    return class extends React.Component<Props, {}> {
        createSortHandler = (property:Key) => (event:any) => {
            this.props.onRequestSort(property);
        };
        render() {
            const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

            return (
                <TableHead>
                    <TableRow>
                        {numSelected!=null && <TableCell padding="checkbox">
                            <Checkbox
                                indeterminate={numSelected > 0 && numSelected < rowCount}
                                checked={numSelected === rowCount}
                                onChange={onSelectAllClick}
                            />
                        </TableCell>}
                        {columnData.map(column => {
                            return (
                                <TableCell
                                    key={column.field}
                                    numeric={column.numeric}
                                    padding={column.disablePadding ? 'none' : 'default'}
                                    sortDirection={orderBy === column.field ? order : false}
                                >
                                    {column.disableSorting && column.label}
                                    {!column.disableSorting && <Tooltip
                                        title="Sort"
                                        placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                                        enterDelay={300}
                                    >
                                        <TableSortLabel
                                            active={orderBy === column.field}
                                            direction={order}
                                            onClick={this.createSortHandler(column.field)}
                                        >
                                            {column.label || column.field}
                                        </TableSortLabel>
                                    </Tooltip>}
                                </TableCell>
                            );
                        }, this)}
                    </TableRow>
                </TableHead>
            );
        }
    }
}

function createEnhancedToolbar<ItemType>() {

    const toolbarStyles = (theme:Theme) => ({
        root: {
            paddingRight: theme.spacing.unit,
        },
        highlight:
            theme.palette.type === 'light'
                ? {
                    color: theme.palette.secondary.main,
                    backgroundColor: lighten(theme.palette.secondary.light, 0.85),
                }
                : {
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.secondary.dark,
                },
        spacer: {
            flex: '1 1 100%',
        },
        actions: {
            color: theme.palette.text.secondary,
        },
        title: {
            flex: '0 0 auto',
        },
    });

    interface Props {
        title: string,
        classes: Record<keyof ReturnType<typeof toolbarStyles>, string>,
        numSelected: number | null,
        actions?:React.ReactFragment
    }

    let EnhancedTableToolbar = (props:Props) => {
        const { numSelected, classes, actions } = props;
        return (
            <Toolbar
                className={classNames(classes.root, {
                    [classes.highlight]: numSelected && numSelected > 0,
                })}
            >
                <div className={classes.title}>
                    {numSelected && numSelected > 0 ? (
                        <Typography color="inherit" variant="subheading">
                            {numSelected} selected
                        </Typography>
                    ) : (
                        <Typography variant="title">{props.title}</Typography>
                    )}
                </div>
                <div className={classes.spacer} />
                {actions && <div className={classes.actions}>{actions}
                </div>}
            </Toolbar>
        );
    };

    return withStyles(toolbarStyles)(EnhancedTableToolbar);
}

interface EnhancedTableProps<ItemType, IDType> {
    title: string,
    items: ItemType[],
    selection?: IDType[],
    onRequestSelectionChange?: (selection:IDType[])=>any,
    actions?: React.ReactFragment,
    onItemEdit?: (id:IDType, field:string, value:string)=>any,
}

export default function createEnhancedTableComponent<ItemType,
    F0 extends keyof ItemType & string
    >(getID:(item:ItemType)=>number,
 column0:FieldConfig<ItemType, F0>
):React.ComponentType<EnhancedTableProps<ItemType, number>>;

export default function createEnhancedTableComponent<ItemType,
    F0 extends keyof ItemType & string,
    F1 extends keyof ItemType & string
    >(getID:(item:ItemType)=>number,
    column0:FieldConfig<ItemType, F0>,
    column1:FieldConfig<ItemType, F1>
):React.ComponentType<EnhancedTableProps<ItemType, number>>;

export default function createEnhancedTableComponent<ItemType,
    F0 extends keyof ItemType & string,
    F1 extends keyof ItemType & string,
    F2 extends keyof ItemType & string
    >(getID:(item:ItemType)=>number,
      column0:FieldConfig<ItemType, F0>,
      column1:FieldConfig<ItemType, F1>,
      column2:FieldConfig<ItemType, F2>
):React.ComponentType<EnhancedTableProps<ItemType, number>>;

export default function createEnhancedTableComponent<ItemType,
    F0 extends keyof ItemType & string,
    F1 extends keyof ItemType & string,
    F2 extends keyof ItemType & string,
    F3 extends keyof ItemType & string
    >(getID:(item:ItemType)=>number,
      column0:FieldConfig<ItemType, F0>,
      column1:FieldConfig<ItemType, F1>,
      column2:FieldConfig<ItemType, F2>,
      column3:FieldConfig<ItemType, F3>
):React.ComponentType<EnhancedTableProps<ItemType, number>>;

export default function createEnhancedTableComponent<ItemType,
    F0 extends keyof ItemType & string,
    F1 extends keyof ItemType & string,
    F2 extends keyof ItemType & string,
    F3 extends keyof ItemType & string,
    F4 extends keyof ItemType & string
    >(getID:(item:ItemType)=>number,
      column0:FieldConfig<ItemType, F0>,
      column1:FieldConfig<ItemType, F1>,
      column2:FieldConfig<ItemType, F2>,
      column3:FieldConfig<ItemType, F3>,
      column4:FieldConfig<ItemType, F4>
):React.ComponentType<EnhancedTableProps<ItemType, number>>;

export default function createEnhancedTableComponent<ItemType,
    F0 extends keyof ItemType & string,
    F1 extends keyof ItemType & string,
    F2 extends keyof ItemType & string,
    F3 extends keyof ItemType & string,
    F4 extends keyof ItemType & string,
    F5 extends keyof ItemType & string
    >(getID:(item:ItemType)=>number,
      column0:FieldConfig<ItemType, F0>,
      column1:FieldConfig<ItemType, F1>,
      column2:FieldConfig<ItemType, F2>,
      column3:FieldConfig<ItemType, F3>,
      column4:FieldConfig<ItemType, F4>,
      column5:FieldConfig<ItemType, F5>
):React.ComponentType<EnhancedTableProps<ItemType, number>>;

export default function createEnhancedTableComponent<ItemType,
    F0 extends keyof ItemType & string,
    F1 extends keyof ItemType & string,
    F2 extends keyof ItemType & string,
    F3 extends keyof ItemType & string,
    F4 extends keyof ItemType & string,
    F5 extends keyof ItemType & string,
    F6 extends keyof ItemType & string
    >(getID:(item:ItemType)=>number,
      column0:FieldConfig<ItemType, F0>,
      column1:FieldConfig<ItemType, F1>,
      column2:FieldConfig<ItemType, F2>,
      column3:FieldConfig<ItemType, F3>,
      column4:FieldConfig<ItemType, F4>,
      column5:FieldConfig<ItemType, F5>,
      column6:FieldConfig<ItemType, F6>
):React.ComponentType<EnhancedTableProps<ItemType, number>>;

export default function createEnhancedTableComponent<ItemType,
    F0 extends keyof ItemType & string,
    F1 extends keyof ItemType & string,
    F2 extends keyof ItemType & string,
    F3 extends keyof ItemType & string,
    F4 extends keyof ItemType & string,
    F5 extends keyof ItemType & string,
    F6 extends keyof ItemType & string,
    F7 extends keyof ItemType & string
    >(getID:(item:ItemType)=>number,
      column0:FieldConfig<ItemType, F0>,
      column1:FieldConfig<ItemType, F1>,
      column2:FieldConfig<ItemType, F2>,
      column3:FieldConfig<ItemType, F3>,
      column4:FieldConfig<ItemType, F4>,
      column5:FieldConfig<ItemType, F5>,
      column6:FieldConfig<ItemType, F6>,
      column7:FieldConfig<ItemType, F7>
):React.ComponentType<EnhancedTableProps<ItemType, number>>;

export default function createEnhancedTableComponent<ItemType,
    F0 extends keyof ItemType & string
    >(getID:(item:ItemType)=>string,
      column0:FieldConfig<ItemType, F0>
):React.ComponentType<EnhancedTableProps<ItemType, string>>;

export default function createEnhancedTableComponent<ItemType,
    F0 extends keyof ItemType & string,
    F1 extends keyof ItemType & string
    >(getID:(item:ItemType)=>string,
      column0:FieldConfig<ItemType, F0>,
      column1:FieldConfig<ItemType, F1>
):React.ComponentType<EnhancedTableProps<ItemType, string>>;

export default function createEnhancedTableComponent<ItemType,
    F0 extends keyof ItemType & string,
    F1 extends keyof ItemType & string,
    F2 extends keyof ItemType & string
    >(getID:(item:ItemType)=>string,
      column0:FieldConfig<ItemType, F0>,
      column1:FieldConfig<ItemType, F1>,
      column2:FieldConfig<ItemType, F2>
):React.ComponentType<EnhancedTableProps<ItemType, string>>;

export default function createEnhancedTableComponent<ItemType,
    F0 extends keyof ItemType & string,
    F1 extends keyof ItemType & string,
    F2 extends keyof ItemType & string,
    F3 extends keyof ItemType & string
    >(getID:(item:ItemType)=>string,
      column0:FieldConfig<ItemType, F0>,
      column1:FieldConfig<ItemType, F1>,
      column2:FieldConfig<ItemType, F2>,
      column3:FieldConfig<ItemType, F3>
):React.ComponentType<EnhancedTableProps<ItemType, string>>;

export default function createEnhancedTableComponent<ItemType,
    F0 extends keyof ItemType & string,
    F1 extends keyof ItemType & string,
    F2 extends keyof ItemType & string,
    F3 extends keyof ItemType & string,
    F4 extends keyof ItemType & string
    >(getID:(item:ItemType)=>string,
      column0:FieldConfig<ItemType, F0>,
      column1:FieldConfig<ItemType, F1>,
      column2:FieldConfig<ItemType, F2>,
      column3:FieldConfig<ItemType, F3>,
      column4:FieldConfig<ItemType, F4>
):React.ComponentType<EnhancedTableProps<ItemType, string>>;

export default function createEnhancedTableComponent<ItemType,
    F0 extends keyof ItemType & string,
    F1 extends keyof ItemType & string,
    F2 extends keyof ItemType & string,
    F3 extends keyof ItemType & string,
    F4 extends keyof ItemType & string,
    F5 extends keyof ItemType & string
    >(getID:(item:ItemType)=>string,
      column0:FieldConfig<ItemType, F0>,
      column1:FieldConfig<ItemType, F1>,
      column2:FieldConfig<ItemType, F2>,
      column3:FieldConfig<ItemType, F3>,
      column4:FieldConfig<ItemType, F4>,
      column5:FieldConfig<ItemType, F5>
):React.ComponentType<EnhancedTableProps<ItemType, string>>;

export default function createEnhancedTableComponent<ItemType,
    F0 extends keyof ItemType & string,
    F1 extends keyof ItemType & string,
    F2 extends keyof ItemType & string,
    F3 extends keyof ItemType & string,
    F4 extends keyof ItemType & string,
    F5 extends keyof ItemType & string,
    F6 extends keyof ItemType & string
    >(getID:(item:ItemType)=>string,
      column0:FieldConfig<ItemType, F0>,
      column1:FieldConfig<ItemType, F1>,
      column2:FieldConfig<ItemType, F2>,
      column3:FieldConfig<ItemType, F3>,
      column4:FieldConfig<ItemType, F4>,
      column5:FieldConfig<ItemType, F5>,
      column6:FieldConfig<ItemType, F6>
):React.ComponentType<EnhancedTableProps<ItemType, string>>;

export default function createEnhancedTableComponent<ItemType,
    F0 extends keyof ItemType & string,
    F1 extends keyof ItemType & string,
    F2 extends keyof ItemType & string,
    F3 extends keyof ItemType & string,
    F4 extends keyof ItemType & string,
    F5 extends keyof ItemType & string,
    F6 extends keyof ItemType & string,
    F7 extends keyof ItemType & string
    >(getID:(item:ItemType)=>string,
      column0:FieldConfig<ItemType, F0>,
      column1:FieldConfig<ItemType, F1>,
      column2:FieldConfig<ItemType, F2>,
      column3:FieldConfig<ItemType, F3>,
      column4:FieldConfig<ItemType, F4>,
      column5:FieldConfig<ItemType, F5>,
      column6:FieldConfig<ItemType, F6>,
      column7:FieldConfig<ItemType, F7>
):React.ComponentType<EnhancedTableProps<ItemType, string>>;

export default function createEnhancedTableComponent<ItemType, IDType extends number|string>(getID:(item:ItemType)=>IDType, ...columns:FieldConfig<ItemType, any>[]):React.ComponentType<EnhancedTableProps<ItemType, IDType>> {
    type Key = keyof ItemType;
    const EnhancedTableToolbar = createEnhancedToolbar<ItemType>();
    const EnhancedTableHead = createEnhancedTableHeadComponent<ItemType>(columns);
    const styles = (theme:Theme) => ({
        root: {
            width: '100%',
            marginTop: theme.spacing.unit * 3,
        },
        tableWrapper: {
            overflowX: 'auto' as any,
        },
        emptyCaption: {
            paddingLeft: 24,
        },
        editingWrap: {
            padding: "16px 24px",
            backgroundColor: theme.palette.background.default
        },
        editingInput: {
            width: 240,
        }
    });
    type Props = EnhancedTableProps<ItemType, IDType> & {
        classes: Record<keyof ReturnType<typeof styles>, string>
    }
    interface State {
        order: 'asc' | 'desc';
        orderBy: Key | null,
        page: number,
        rowsPerPage: number,
        editingAnchorEl: HTMLElement|null;
        editingId: IDType|null,
        editingColumn: number|null,
        editingOriValue: any|null,
    }
    const EnhancedTable = class extends React.PureComponent<Props, State> {
        constructor(props:Props) {
            super(props);
            this.state = {
                order: 'asc',
                orderBy: null,
                page: 0,
                rowsPerPage: 5,
                editingAnchorEl: null,
                editingId:null,
                editingColumn:null,
                editingOriValue: null,
            }
        }
        getSortedData() {
            const {order, orderBy} = this.state;
            if(orderBy == null) return this.props.items;

            // find less comparator
            let compareFunction = (a:ItemType, b:ItemType):number=>a[orderBy]<b[orderBy]?-1:1;
            for(const column of columns) {
                if(column.field === orderBy) {
                    if(typeof(column.compareFunction) === 'function') {
                        compareFunction = column.compareFunction;
                    }
                    break;
                }
            }

            return order === 'desc'
                ? [...this.props.items].sort((a,b)=>-compareFunction(a,b))
                : [...this.props.items].sort(compareFunction);
        }
        handleRequestSort = (property: Key) => {
            const orderBy = property;
            let order : 'asc'|'desc' = 'desc';

            if (this.state.orderBy === property && this.state.order === 'desc') {
                order = 'asc';
            }

            this.setState({ order, orderBy });
        };
        handleSelectAllClick = (event:any, checked:boolean) => {
            let selection:(IDType)[] = [];
            if (checked) {
                selection = this.props.items.map(x=>getID(x));
            }
            if(this.props.onRequestSelectionChange) this.props.onRequestSelectionChange(selection);
        };
        handleRowCheckChange = (id:IDType) => {
            const { selection } = this.props;
            if(selection == null) return;
            const selectedIndex = selection.indexOf(id);
            let newSelected:(IDType)[] = [];

            if (selectedIndex === -1) {
                newSelected = newSelected.concat(selection, id);
            } else if (selectedIndex === 0) {
                newSelected = newSelected.concat(selection.slice(1));
            } else if (selectedIndex === selection.length - 1) {
                newSelected = newSelected.concat(selection.slice(0, -1));
            } else if (selectedIndex > 0) {
                newSelected = newSelected.concat(
                    selection.slice(0, selectedIndex),
                    selection.slice(selectedIndex + 1),
                );
            }

            if(this.props.onRequestSelectionChange) this.props.onRequestSelectionChange(newSelected);
        };
        handleChangePage = (event:any, page:number) => {
            this.setState({ page });
        };
        handleChangeRowsPerPage = (e:React.ChangeEvent<HTMLInputElement>)=>{
            this.setState({rowsPerPage:parseInt(e.target.value)})
        };
        handleCellClick = (el:HTMLElement, id:IDType, column:number, value:any)=>{
            this.setState({editingAnchorEl:el, editingId:id, editingColumn:column, editingOriValue:value})
        };
        handleCloseEditing = ()=>{
            this.setState({editingAnchorEl:null});
        };
        handleSubmitEditing = (newValue: any)=>{
            const {editingId, editingColumn} = this.state;
            this.props.onItemEdit && this.props.onItemEdit(editingId!, columns[editingColumn!].field, newValue!);
            this.handleCloseEditing();
        };
        isSelected = (id:(IDType)) => this.props.selection && this.props.selection.indexOf(id) !== -1;
        getEditingPopoverOrigin():PopoverOrigin {
            const {editingColumn} = this.state;
            if(editingColumn) {
                if(columns[editingColumn].numeric) return {horizontal: "right", vertical: "top"};
            }
            return {horizontal: "left", vertical: "top"}
        }
        renderEditingPopover() {
            const {classes} = this.props;
            const {editingAnchorEl, editingColumn, editingOriValue} = this.state;
            const EditComponent = editingColumn && columns[editingColumn].editComponent || null;
            return <Popover anchorEl={editingAnchorEl} open={!!editingAnchorEl} onClose={this.handleCloseEditing} anchorOrigin={this.getEditingPopoverOrigin()}>
                <div className={classes.editingWrap}>
                    {EditComponent && <EditComponent value={editingOriValue} onRequestValueChange={this.handleSubmitEditing}/>}
                </div>
            </Popover>
        }
        renderCellDisplay(item:ItemType, columnIndex: number) {
            const column =  columns[columnIndex];
            const Display = column.displayComponent || TextDisplay;
            return <Display value={item[column.field]} />
        }
        render() {
            const {classes, title, selection, actions} = this.props;
            const {order, orderBy, page, rowsPerPage} = this.state;
            const data = this.getSortedData();
            const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
            const showPagination = data.length > rowsPerPage;
            const numSelected = selection == null?null:selection.length;
            return (
                <Paper className={classes.root}>
                    <EnhancedTableToolbar numSelected={numSelected} title={title} actions={actions}/>
                    {data.length>0 && <div className={classes.tableWrapper}>
                        <Table>
                            <EnhancedTableHead
                                numSelected={numSelected}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={this.handleSelectAllClick}
                                onRequestSort={this.handleRequestSort}
                                rowCount={data.length}
                            />
                            <TableBody>
                                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((n) => {
                                    const isSelected = this.isSelected(getID(n));
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={getID(n)}
                                            selected={isSelected}
                                        >
                                            {numSelected != null && <TableCell padding="checkbox">
                                                <Checkbox checked={isSelected} onChange={e=>this.handleRowCheckChange(getID(n))}/>
                                            </TableCell>}
                                            {columns.map((column, columnIndex)=><TableCell
                                                key={column.field}
                                                padding={column.disablePadding?"none":undefined}
                                                numeric={column.numeric}
                                                onClick={column.editComponent?(e)=>this.handleCellClick(e.currentTarget,getID(n), columnIndex, n[column.field]):undefined}
                                                style={column.editComponent?{cursor:"pointer"}:undefined}
                                            >{this.renderCellDisplay(n, columnIndex)}</TableCell>)}
                                        </TableRow>
                                    );
                                })}
                                {emptyRows > 0 && showPagination && (
                                    <TableRow style={{height: 49 * emptyRows}}>
                                        <TableCell colSpan={6}/>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>}
                    {data.length == 0 && <Typography variant={"caption"} className={classes.emptyCaption}>(empty)</Typography>}
                    {showPagination && <TablePagination
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        backIconButtonProps={{
                            'aria-label': 'Previous Page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Next Page',
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />}
                    {!showPagination && <div style={{height:8}} />}
                    {this.renderEditingPopover()}
                </Paper>
            );
        }
    };
    return withStyles(styles)(EnhancedTable);
}