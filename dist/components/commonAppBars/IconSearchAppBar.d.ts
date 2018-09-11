import * as React from 'react';
interface Props {
    classes: Record<string, string>;
    icon: React.ReactElement<any>;
    onIconClick: () => any;
    title: string;
    searchValue?: string;
    onSearchValueChange?: (x: string) => any;
}
declare const _default: React.ComponentType<import("@material-ui/core").Overwrite<Pick<Props, "title" | "icon" | "classes" | "onIconClick" | "searchValue" | "onSearchValueChange">, import("@material-ui/core/styles/withStyles").StyledComponentProps<"grow" | "search" | "searchIcon" | "inputRoot" | "inputInput">>>;
export default _default;
