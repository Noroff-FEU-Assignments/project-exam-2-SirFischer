import React from 'react';
import './button.scss';

export type TButtonAppearance = "filled" | "outline" | "ghost";
export type TButtonSize = "small" | "medium" | "large" | "xlarge" | "full";
export type TButtonStatus = "primary" | "secondary"/* | "warning" | "danger" */;
export type TButtonType = "button" | "submit" | "reset";

export interface IButtonProps {
	id?: string,
	className?: string,
    text?: string,
    size?: TButtonSize,
    status?: TButtonStatus,
    appearance?: TButtonAppearance,
    type?: TButtonType,
    onClick?(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void
};

export const Button: React.FC<IButtonProps> = ({
    text,
    status = 'primary',
    appearance = 'filled',
	size = 'medium',
    type = "button",
    onClick = undefined,
    ...props
  }) : JSX.Element => {

    const classNames = ["component-button"];

	if (props.className)
		classNames.push(props.className);
    classNames.push(`component-button--${status}`)
    classNames.push(`component-button--size-${size}`)
    classNames.push(`component-button--appearance-${appearance}`)

    return (
        <button id={props.id ? `component-button-${props.id}` : undefined} className={classNames.join(' ')} onClick={onClick} type={type}>
            {text != null && text !=="" && 
                <span id={props.id ? `component-button-text-${props.id}` : undefined} className={`component-button-text`}>
                    {text}
                </span>
            }
            {props.children}
        </button>
    );
};

export default Button;