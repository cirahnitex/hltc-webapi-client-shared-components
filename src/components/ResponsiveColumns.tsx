import React, {CSSProperties} from "react";
import "./ResponsiveColumn.css";

function useWindowSize() {
    const isClient = typeof window === 'object';

    function getSize() {
        return {
            width: isClient ? window.innerWidth : undefined,
            height: isClient ? window.innerHeight : undefined
        };
    }

    const [windowSize, setWindowSize] = React.useState(getSize);

    React.useEffect(() => {
        if (!isClient) {
            return;
        }

        function handleResize() {
            setWindowSize(getSize());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [getSize, isClient]); // Empty array ensures that effect is only run on mount and unmount

    return windowSize;
}

function numTotalColumns(windowWidth:number) {
    if(windowWidth >= 840) return 12;
    if(windowWidth >= 600) return 8;
    return 4;
}

function responsiveSpacingSize(windowWidth:number) {
    if(windowWidth >= 720) return 24;
    return 16;
}

function responsiveItemWidth(windowWidth:number, numColumns:number) {
    const totalColumns = numTotalColumns(windowWidth);
    const spacing = responsiveSpacingSize(windowWidth);

    if(numColumns > totalColumns) numColumns = totalColumns;

    const EPSILON = 1;

    const columnWidth = (windowWidth - spacing * (totalColumns + 1)) / totalColumns - EPSILON;

    return columnWidth * numColumns + spacing * (numColumns - 1);
}

interface ContainerProps {
    children: React.ReactFragment;
    className?: string;
    style?: CSSProperties;
    key?: number|string;
}

export function ResponsiveColumnContainer({className, ...others}:ContainerProps) {
    let combinedClassName = `lMyTMsT24aJwkm00-container`;
    if(className) combinedClassName += " " + className;
    return <div className={combinedClassName} {...others}/>
}

interface ItemProps extends ContainerProps{
    columns: number;
}

export function ResponsiveColumnItem({columns, className, ...others}:ItemProps) {
    const {width} = useWindowSize();
    const el = React.useRef<HTMLDivElement>(null);
    React.useEffect(()=>{
        if(width == null) return;
        if(el.current == null) return;
        console.log(responsiveItemWidth(width, columns));
        el.current.style.width = responsiveItemWidth(width, columns) + 'px';
    }, [columns, width]);
    let combinedClassName = `lMyTMsT24aJwkm00-item`;
    if(className) combinedClassName += " " + className;
    return <div className={combinedClassName} ref={el} {...others}/>
}
