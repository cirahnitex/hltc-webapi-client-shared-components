import * as React from 'react';
interface Props {
    label?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
declare const EmailInput: (props: Props) => JSX.Element;
declare function validateEmail(email: string): RegExpMatchArray | null;
export default EmailInput;
export { validateEmail };
