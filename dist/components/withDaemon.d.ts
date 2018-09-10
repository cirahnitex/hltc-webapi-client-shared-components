import * as React from 'react';
declare type ComponentConstructor<TProps> = React.ComponentClass<TProps> | React.StatelessComponent<TProps>;
export declare function withDaemon<Props>(Comp: ComponentConstructor<Props>, daemonTask: () => void, interval: number): {
    new (props: Readonly<Props>): {
        refreshDaemon: number;
        componentWillMount(): void;
        componentWillUnmount(): void;
        render(): JSX.Element;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Props>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<Props>;
        state: Readonly<{}>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    new (props: Props, context?: any): {
        refreshDaemon: number;
        componentWillMount(): void;
        componentWillUnmount(): void;
        render(): JSX.Element;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Props>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<Props>;
        state: Readonly<{}>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
};
export {};
