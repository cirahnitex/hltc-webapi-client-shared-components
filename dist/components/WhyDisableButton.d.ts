/// <reference types="react" />
import { Props as DebounceBtnProps } from "./DebounceButton";
interface Props extends DebounceBtnProps {
    disableReason: string | null;
    tooltipPlacement?: 'bottom-end' | 'bottom-start' | 'bottom' | 'left-end' | 'left-start' | 'left' | 'right-end' | 'right-start' | 'right' | 'top-end' | 'top-start' | 'top';
}
declare const WhyDisableButton: (props: Props) => JSX.Element;
export default WhyDisableButton;
