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
import {style} from "typestyle";
import FullscreenSlideIn from "../FullscreenSlideIn";
import TableRow from "@material-ui/core/TableRow/TableRow";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";

export interface DisplayComponentProps<ItemType, Field extends keyof ItemType & string> {
    value: ItemType[Field],
    onRequestValueChange?:(value: ItemType[Field])=>any
}

export interface EditComponentProps<ItemType, Field extends keyof ItemType & string> {
    value?: ItemType[Field],
    onRequestValueChange?:(value: ItemType[Field])=>any,
    onRequestClose?:()=>any,
    item?:ItemType
}

type FieldConfig<ItemType, Field extends keyof ItemType & string> = {
    field: Field,
    numeric?: boolean,
    disablePadding?: boolean,
    label?: string,
    tooltip?: string,
    disableSorting?: boolean,
    compareFunction?: ((a:ItemType, b:ItemType)=>number),
    displayComponent?: React.ComponentType<DisplayComponentProps<ItemType, Field>>,
    editComponent?: React.ComponentType<EditComponentProps<ItemType, Field>>;
    editMode?: 'popover'|'fullscreen'
};

function createEnhancedTableHeadComponent<ItemType>(columnData:FieldConfig<ItemType, any>[]) {
    type Key = keyof ItemType;
    interface Props {
        numSelected: number | null,
        onRequestSort: (columnKey: Key)=>void,
        onSelectAllClick: (event:any, checked:boolean)=>void,
        order: 'asc' | 'desc',
        orderBy: Key | null,
        rowCount: number,
        className?: string
    }
    return class extends React.Component<Props, {}> {
        createSortHandler = (property:Key) => (event:any) => {
            this.props.onRequestSort(property);
        };
        renderWithinTooltip(column:FieldConfig<ItemType, any>) {
            const {order, orderBy } = this.props;
            if(column.disableSorting) return column.label || column.field;
            return <TableSortLabel
                active={orderBy === column.field}
                direction={order}
                onClick={this.createSortHandler(column.field)}
            >
                {column.label || column.field}
            </TableSortLabel>
        }
        render() {
            const {className, onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

            return (
                <TableHead className={className}>
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
                                    {column.tooltip!=null ?
                                        <Tooltip title={column.tooltip}
                                                 placement={column.numeric ? 'bottom-end' : 'bottom-start'}>
                                            {this.renderWithinTooltip(column)}
                                        </Tooltip> : this.renderWithinTooltip(column)}
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
            padding: '0 24px',
            minHeight: 56,
            display: "flex",
            position: "relative" as any,
            alignItems: "center" as any
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
            <div
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
            </div>
        );
    };

    return withStyles(toolbarStyles)(EnhancedTableToolbar);
}

interface EnhancedTableProps<ItemType, IDType> extends React.HTMLAttributes<HTMLElement> {
    title: string,
    items: ItemType[],
    selection?: IDType[],
    onRequestSelectionChange?: (selection:IDType[])=>any,
    selectionActions?: React.ReactFragment,
    onItemEdit?: {[Field in keyof ItemType & string]?:(id:IDType, value:ItemType[Field])=>any},
    negativeMargin?: boolean,
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
            display: 'flex',
            flexDirection: 'column' as any,
        },
        negativeMargin: {
            margin: '0 -24px',
            width: 'calc(100% + 48px)',
        },
        tableWrapper: {
            overflowX: 'auto' as any,
            flexShrink: 1,
        },
        emptyCaption: {
            paddingLeft: 24,
        },
        editingWrap: {
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
        editingAnchorEl: HTMLElement|null;
        editingId: IDType|null,
        editingColumn: number|null,
        editingItem: ItemType|null,
        editingOriValue: any|null,
    }
    const EnhancedTable = class extends React.PureComponent<Props, State> {
        constructor(props:Props) {
            super(props);
            this.state = {
                order: 'asc',
                orderBy: null,
                editingAnchorEl: null,
                editingId:null,
                editingColumn:null,
                editingOriValue: null,
                editingItem: null,
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
        handleItemEdit = (el:HTMLElement, id:IDType, column:number, value:any, item:ItemType)=>{
            this.setState({editingAnchorEl:el, editingId:id, editingColumn:column, editingOriValue:value, editingItem:item})
        };
        handleCloseEditing = ()=>{
            this.setState({editingAnchorEl:null});
        };
        submitEditing(editingId:IDType, editingColumn:number, newValue:any) {
            const editingField = columns[editingColumn].field;
            this.props.onItemEdit && this.props.onItemEdit[editingField] && this.props.onItemEdit[editingField](editingId, newValue!);
        }
        handleSubmitEditingFromEditingComponent = (newValue: any)=>{
            const {editingId, editingColumn} = this.state;
            if(editingId != null && editingColumn != null) {
                this.submitEditing(editingId, editingColumn, newValue);
            }
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
            const {editingAnchorEl, editingColumn, editingOriValue, editingId, editingItem} = this.state;
            const EditComponent = editingColumn != null && columns[editingColumn].editComponent || null;
            return <Popover anchorEl={editingAnchorEl} open={!!editingAnchorEl} onClose={this.handleCloseEditing} anchorOrigin={this.getEditingPopoverOrigin()}>
                <div className={classes.editingWrap}>
                    {EditComponent && <EditComponent value={editingOriValue} onRequestValueChange={this.handleSubmitEditingFromEditingComponent} onRequestClose={this.handleCloseEditing} item={editingItem!}/>}
                </div>
            </Popover>
        }
        renderEditingFullscreen() {
            const {editingAnchorEl, editingColumn, editingOriValue,  editingItem} = this.state;
            const EditComponent = editingColumn != null && columns[editingColumn].editComponent || null;
            return <FullscreenSlideIn in={!!editingAnchorEl}>
                {EditComponent && <EditComponent value={editingOriValue} onRequestValueChange={this.handleSubmitEditingFromEditingComponent} onRequestClose={this.handleCloseEditing} item={editingItem!}/>}
            </FullscreenSlideIn>
        }
        renderEditing() {
            const {editingColumn} = this.state;
            if(editingColumn != null && columns[editingColumn]) {
                return columns[editingColumn].editMode === "fullscreen"?this.renderEditingFullscreen():this.renderEditingPopover()
            }
            return null;
        }
        renderCellDisplay(item:ItemType, columnIndex: number) {
            const column =  columns[columnIndex];
            const Display:NonNullable<typeof column.displayComponent> = column.displayComponent || TextDisplay;
            return <Display value={item[column.field]} onRequestValueChange={(v)=>this.submitEditing(getID(item), columnIndex,v)} />
        }
        render() {
            const { title, classes, items, selection, onRequestSelectionChange, selectionActions, onItemEdit, negativeMargin, className, ...others} = this.props;
            const {order, orderBy} = this.state;
            const data = this.getSortedData();
            const numSelected = selection == null?null:selection.length;
            const rootClassName = negativeMargin?[classes.root, classes.negativeMargin].join(" "):classes.root;
            return (
                <div className={className?`${rootClassName} ${className}`:rootClassName} {...others}>
                    <EnhancedTableToolbar numSelected={numSelected} title={title} actions={numSelected && selectionActions || undefined}/>
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
                                {data.map((n) => {
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
                                            {numSelected != null && <TableCell padding="checkbox" style={{width:48}}>
                                                <Checkbox checked={isSelected} onChange={e=>this.handleRowCheckChange(getID(n))}/>
                                            </TableCell>}
                                            {columns.map((column, columnIndex)=><TableCell
                                                key={column.field}
                                                padding={column.disablePadding?"none":undefined}
                                                numeric={column.numeric}
                                                onClick={column.editComponent?(e)=>this.handleItemEdit(e.currentTarget,getID(n), columnIndex, n[column.field], n):undefined}
                                                style={column.editComponent?{cursor:"pointer"}:undefined}
                                            >{this.renderCellDisplay(n, columnIndex)}</TableCell>)}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>}
                    {data.length == 0 && <Typography variant={"caption"} className={classes.emptyCaption}>(empty)</Typography>}
                    {this.renderEditing()}
                </div>
            );
        }
    };
    return withStyles(styles)(EnhancedTable);
}