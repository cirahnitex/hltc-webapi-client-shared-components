var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import Table from '@material-ui/core/Table';
import * as classNames from 'classnames';
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableCell from "@material-ui/core/TableCell/TableCell";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import TableSortLabel from "@material-ui/core/TableSortLabel/TableSortLabel";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Typography from "@material-ui/core/Typography/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper/Paper";
import TableBody from "@material-ui/core/TableBody/TableBody";
import TablePagination from "@material-ui/core/TablePagination/TablePagination";
import Popover from "@material-ui/core/Popover/Popover";
import TextDisplay from "./TextDisplay";
var Tooltip = require("@material-ui/core/umd/material-ui.development").Tooltip;
var TableRow = require("@material-ui/core/umd/material-ui.development").TableRow;
function createEnhancedTableHeadComponent(columnData) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.createSortHandler = function (property) { return function (event) {
                _this.props.onRequestSort(property);
            }; };
            return _this;
        }
        class_1.prototype.render = function () {
            var _this = this;
            var _a = this.props, onSelectAllClick = _a.onSelectAllClick, order = _a.order, orderBy = _a.orderBy, numSelected = _a.numSelected, rowCount = _a.rowCount;
            return (React.createElement(TableHead, null,
                React.createElement(TableRow, null,
                    numSelected != null && React.createElement(TableCell, { padding: "checkbox" },
                        React.createElement(Checkbox, { indeterminate: numSelected > 0 && numSelected < rowCount, checked: numSelected === rowCount, onChange: onSelectAllClick })),
                    columnData.map(function (column) {
                        return (React.createElement(TableCell, { key: column.field, numeric: column.numeric, padding: column.disablePadding ? 'none' : 'default', sortDirection: orderBy === column.field ? order : false },
                            column.disableSorting && column.label,
                            !column.disableSorting && React.createElement(Tooltip, { title: "Sort", placement: column.numeric ? 'bottom-end' : 'bottom-start', enterDelay: 300 },
                                React.createElement(TableSortLabel, { active: orderBy === column.field, direction: order, onClick: _this.createSortHandler(column.field) }, column.label || column.field))));
                    }, this))));
        };
        return class_1;
    }(React.Component));
}
function createEnhancedToolbar() {
    var toolbarStyles = function (theme) { return ({
        root: {
            paddingRight: theme.spacing.unit,
        },
        highlight: theme.palette.type === 'light'
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
    }); };
    var EnhancedTableToolbar = function (props) {
        var _a;
        var numSelected = props.numSelected, classes = props.classes, actions = props.actions;
        return (React.createElement(Toolbar, { className: classNames(classes.root, (_a = {},
                _a[classes.highlight] = numSelected && numSelected > 0,
                _a)) },
            React.createElement("div", { className: classes.title }, numSelected && numSelected > 0 ? (React.createElement(Typography, { color: "inherit", variant: "subheading" },
                numSelected,
                " selected")) : (React.createElement(Typography, { variant: "title" }, props.title))),
            React.createElement("div", { className: classes.spacer }),
            actions && React.createElement("div", { className: classes.actions }, actions)));
    };
    return withStyles(toolbarStyles)(EnhancedTableToolbar);
}
export default function createEnhancedTableComponent(getID) {
    var columns = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        columns[_i - 1] = arguments[_i];
    }
    var EnhancedTableToolbar = createEnhancedToolbar();
    var EnhancedTableHead = createEnhancedTableHeadComponent(columns);
    var styles = function (theme) { return ({
        root: {
            width: '100%',
            marginTop: theme.spacing.unit * 3,
        },
        tableWrapper: {
            overflowX: 'auto',
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
    }); };
    var EnhancedTable = /** @class */ (function (_super) {
        __extends(class_2, _super);
        function class_2(props) {
            var _this = _super.call(this, props) || this;
            _this.handleRequestSort = function (property) {
                var orderBy = property;
                var order = 'desc';
                if (_this.state.orderBy === property && _this.state.order === 'desc') {
                    order = 'asc';
                }
                _this.setState({ order: order, orderBy: orderBy });
            };
            _this.handleSelectAllClick = function (event, checked) {
                var selection = [];
                if (checked) {
                    selection = _this.props.items.map(function (x) { return getID(x); });
                }
                if (_this.props.onRequestSelectionChange)
                    _this.props.onRequestSelectionChange(selection);
            };
            _this.handleRowCheckChange = function (id) {
                var selection = _this.props.selection;
                if (selection == null)
                    return;
                var selectedIndex = selection.indexOf(id);
                var newSelected = [];
                if (selectedIndex === -1) {
                    newSelected = newSelected.concat(selection, id);
                }
                else if (selectedIndex === 0) {
                    newSelected = newSelected.concat(selection.slice(1));
                }
                else if (selectedIndex === selection.length - 1) {
                    newSelected = newSelected.concat(selection.slice(0, -1));
                }
                else if (selectedIndex > 0) {
                    newSelected = newSelected.concat(selection.slice(0, selectedIndex), selection.slice(selectedIndex + 1));
                }
                if (_this.props.onRequestSelectionChange)
                    _this.props.onRequestSelectionChange(newSelected);
            };
            _this.handleChangePage = function (event, page) {
                _this.setState({ page: page });
            };
            _this.handleChangeRowsPerPage = function (e) {
                _this.setState({ rowsPerPage: parseInt(e.target.value) });
            };
            _this.handleCellClick = function (el, id, column, value) {
                _this.setState({ editingAnchorEl: el, editingId: id, editingColumn: column, editingOriValue: value });
            };
            _this.handleCloseEditing = function () {
                _this.setState({ editingAnchorEl: null });
            };
            _this.handleSubmitEditing = function (newValue) {
                var _a = _this.state, editingId = _a.editingId, editingColumn = _a.editingColumn;
                _this.props.onItemEdit && _this.props.onItemEdit(editingId, columns[editingColumn].field, newValue);
                _this.handleCloseEditing();
            };
            _this.isSelected = function (id) { return _this.props.selection && _this.props.selection.indexOf(id) !== -1; };
            _this.state = {
                order: 'asc',
                orderBy: null,
                page: 0,
                rowsPerPage: 5,
                editingAnchorEl: null,
                editingId: null,
                editingColumn: null,
                editingOriValue: null,
            };
            return _this;
        }
        class_2.prototype.getSortedData = function () {
            var _a = this.state, order = _a.order, orderBy = _a.orderBy;
            if (orderBy == null)
                return this.props.items;
            // find less comparator
            var compareFunction = function (a, b) { return a[orderBy] < b[orderBy] ? -1 : 1; };
            for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
                var column = columns_1[_i];
                if (column.field === orderBy) {
                    if (typeof (column.compareFunction) === 'function') {
                        compareFunction = column.compareFunction;
                    }
                    break;
                }
            }
            return order === 'desc'
                ? this.props.items.slice().sort(function (a, b) { return -compareFunction(a, b); })
                : this.props.items.slice().sort(compareFunction);
        };
        class_2.prototype.getEditingPopoverOrigin = function () {
            var editingColumn = this.state.editingColumn;
            if (editingColumn) {
                if (columns[editingColumn].numeric)
                    return { horizontal: "right", vertical: "top" };
            }
            return { horizontal: "left", vertical: "top" };
        };
        class_2.prototype.renderEditingPopover = function () {
            var classes = this.props.classes;
            var _a = this.state, editingAnchorEl = _a.editingAnchorEl, editingColumn = _a.editingColumn, editingOriValue = _a.editingOriValue;
            var EditComponent = editingColumn && columns[editingColumn].editComponent || null;
            return React.createElement(Popover, { anchorEl: editingAnchorEl, open: !!editingAnchorEl, onClose: this.handleCloseEditing, anchorOrigin: this.getEditingPopoverOrigin() },
                React.createElement("div", { className: classes.editingWrap }, EditComponent && React.createElement(EditComponent, { value: editingOriValue, onRequestValueChange: this.handleSubmitEditing })));
        };
        class_2.prototype.renderCellDisplay = function (item, columnIndex) {
            var column = columns[columnIndex];
            var Display = column.displayComponent || TextDisplay;
            return React.createElement(Display, { value: item[column.field] });
        };
        class_2.prototype.render = function () {
            var _this = this;
            var _a = this.props, classes = _a.classes, title = _a.title, selection = _a.selection, actions = _a.actions;
            var _b = this.state, order = _b.order, orderBy = _b.orderBy, page = _b.page, rowsPerPage = _b.rowsPerPage;
            var data = this.getSortedData();
            var emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
            var showPagination = data.length > rowsPerPage;
            var numSelected = selection == null ? null : selection.length;
            return (React.createElement(Paper, { className: classes.root },
                React.createElement(EnhancedTableToolbar, { numSelected: numSelected, title: title, actions: actions }),
                data.length > 0 && React.createElement("div", { className: classes.tableWrapper },
                    React.createElement(Table, null,
                        React.createElement(EnhancedTableHead, { numSelected: numSelected, order: order, orderBy: orderBy, onSelectAllClick: this.handleSelectAllClick, onRequestSort: this.handleRequestSort, rowCount: data.length }),
                        React.createElement(TableBody, null,
                            data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(function (n) {
                                var isSelected = _this.isSelected(getID(n));
                                return (React.createElement(TableRow, { hover: true, role: "checkbox", "aria-checked": isSelected, tabIndex: -1, key: getID(n), selected: isSelected },
                                    numSelected != null && React.createElement(TableCell, { padding: "checkbox" },
                                        React.createElement(Checkbox, { checked: isSelected, onChange: function (e) { return _this.handleRowCheckChange(getID(n)); } })),
                                    columns.map(function (column, columnIndex) { return React.createElement(TableCell, { key: column.field, padding: column.disablePadding ? "none" : undefined, numeric: column.numeric, onClick: column.editComponent ? function (e) { return _this.handleCellClick(e.currentTarget, getID(n), columnIndex, n[column.field]); } : undefined, style: column.editComponent ? { cursor: "pointer" } : undefined }, _this.renderCellDisplay(n, columnIndex)); })));
                            }),
                            emptyRows > 0 && showPagination && (React.createElement(TableRow, { style: { height: 49 * emptyRows } },
                                React.createElement(TableCell, { colSpan: 6 })))))),
                data.length == 0 && React.createElement(Typography, { variant: "caption", className: classes.emptyCaption }, "(empty)"),
                showPagination && React.createElement(TablePagination, { component: "div", count: data.length, rowsPerPage: rowsPerPage, page: page, backIconButtonProps: {
                        'aria-label': 'Previous Page',
                    }, nextIconButtonProps: {
                        'aria-label': 'Next Page',
                    }, onChangePage: this.handleChangePage, onChangeRowsPerPage: this.handleChangeRowsPerPage }),
                !showPagination && React.createElement("div", { style: { height: 8 } }),
                this.renderEditingPopover()));
        };
        return class_2;
    }(React.PureComponent));
    return withStyles(styles)(EnhancedTable);
}
//# sourceMappingURL=EnhancedTable.js.map