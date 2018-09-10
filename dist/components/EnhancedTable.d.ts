import * as React from 'react';
declare type ColumnData<ItemType> = {
    key: keyof ItemType & string;
    numeric?: boolean;
    disablePadding?: boolean;
    label?: string;
    noSorting?: boolean;
    compareFunction?: ((a: ItemType, b: ItemType) => number);
    editable?: boolean;
}[];
interface EnhancedTableProps<ItemType extends {
    id: string | number;
}> {
    title: string;
    items: ItemType[];
    selection?: ItemType["id"][];
    onRequestSelectionChange?: (selection: ItemType["id"][]) => void;
    actions?: React.ReactFragment;
}
export default function createEnhancedTableComponent<ItemType extends {
    id: string | number;
}>(columnData: ColumnData<ItemType>): EnhancedTableProps<ItemType>;
export {};
