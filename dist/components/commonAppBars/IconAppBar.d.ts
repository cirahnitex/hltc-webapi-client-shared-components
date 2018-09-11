import * as React from 'react';
import { Theme } from '@material-ui/core/styles';
import { CSSProperties } from "@material-ui/core/styles/withStyles";
declare const styles: (theme: Theme) => {
    root: CSSProperties;
    grow: CSSProperties;
    menuButton: CSSProperties;
    title: CSSProperties;
};
interface Props {
    classes: Record<keyof ReturnType<typeof styles>, string>;
    icon: React.ReactElement<any>;
    onIconClick: () => any;
    title: string;
    children?: React.ReactFragment;
}
declare const _default: React.ComponentType<import("@material-ui/core").Overwrite<Pick<Props, "title" | "icon" | "children" | "classes" | "onIconClick">, import("@material-ui/core/styles/withStyles").StyledComponentProps<"title" | "root" | "grow" | "menuButton">>>;
export default _default;
