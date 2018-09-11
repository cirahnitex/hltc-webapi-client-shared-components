import * as React from 'react';
declare type FieldConfig<ItemType> = {
    field: keyof ItemType & string;
    numeric?: boolean;
    disablePadding?: boolean;
    label?: string;
    noSorting?: boolean;
    compareFunction?: ((a: ItemType, b: ItemType) => number);
    editable?: boolean;
};
interface EnhancedTableProps<ItemType, IDType> {
    title: string;
    items: ItemType[];
    selection?: IDType[];
    onRequestSelectionChange?: (selection: IDType[]) => any;
    actions?: React.ReactFragment;
    onItemEdit?: (id: IDType, field: string, value: string) => any;
}
export default function createEnhancedTableComponent<ItemType>(getID: (item: ItemType) => number, ...columns: FieldConfig<ItemType>[]): React.ComponentType<EnhancedTableProps<ItemType, number>>;
export default function createEnhancedTableComponent<ItemType>(getID: (item: ItemType) => string, ...columns: FieldConfig<ItemType>[]): React.ComponentType<EnhancedTableProps<ItemType, string>>;
export {};
