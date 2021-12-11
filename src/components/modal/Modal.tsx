import React, { ReactElement, ReactChildren, useState, useEffect } from 'react'
import { Button } from '../button/Button';
import { InBody } from '../../utils/renderInBody';
import './modal.scss';
import FocusTrap from 'focus-trap-react';


export interface IModalProps {
	id: string,
    children: any,
    title: string,
    show: boolean,
    closable?: boolean,
	hideFooter?: boolean,
    closeOnClickOutside?: boolean,
    size?: 'small' | 'medium' | 'large' | 'fullscreen',
    variant?: "dialog" | "confirmation" | "alert" | "information",
    ariaDetailCloseTopButton?: string,
	confirmText?: string,
	cancelText?: string,
    renderFooter?(): ReactChildren | ReactElement,
    renderHeader?(): ReactChildren | ReactElement,
    onClose?(): void,
    onConfirm?(): void,
}


export const Modal: React.FC<IModalProps> = ({
    closeOnClickOutside = true,
    variant = "dialog",
    ...props
}) => {
    const [show, setShow] = useState(props.show);

    useEffect(() => {
        setShow(props.show)
    }, [props, show])

    let renderFooter = () => {
        switch (variant) {
            case "alert":
                return (
                    <Button className={`content-modal-default-button-close`} status="primary" text="Lukk" size="full" onClick={(props.onClose) ? props.onClose : onCloseDefault} aria-label="Knapp for å lukke modalen" />
                )
            case "confirmation":
                return (
                    <>
                        <Button className="content-modal-default-button-confirm" status="primary" text={props.confirmText ?? "Send"} size="full"  onClick={(props.onConfirm) ? props.onConfirm : undefined} aria-label="Konfirmasjon knapp" />
                        <Button className={`content-modal-default-button-close`} status="secondary" text={props.cancelText ?? "Avbryt"} size="full" onClick={(props.onClose) ? props.onClose : onCloseDefault} aria-label="Avbryt Knapp" />
                    </>
                )
            default:
                break;
        }
        return (<></>);
    }

    function renderHeader() {
        return (
            <span>{props.title}</span>
        );
    }

    let renderContent = () => {
        const classNames = [`content-modal`];
        classNames.push(`content-modal-size--${props.size}`)
        classNames.push(`content-modal-variant--${variant}`)

        let outsideClick : any = ((props.onClose) ? props.onClose : onCloseDefault);
        const modalRole = (variant === "alert") ? "alertdialog" : "dialog";
        const ariaDetailCloseTopButton = (props.ariaDetailCloseTopButton) ? props.ariaDetailCloseTopButton : "Knapp for å lukke modalen";

        if (!closeOnClickOutside) {
            outsideClick = null;
        }

        return (
            <div id={props.id ? `content-modal-${props.id}` : undefined} className={classNames.join(' ')} onKeyDown={onEscapePressed} role={modalRole}>
                <div className={`content-modal-backdrop`} onMouseDown={outsideClick} />
                <FocusTrap active={show}>
                    <div className={`content-modal-container`}>
                        <div className={`content-modal-header`}>
                            {(props.renderHeader) ? props.renderHeader() : renderHeader()}

                        </div>
                        <div className={`content-modal-body`}>
                            {props.children}
                        </div>
                        {!props.hideFooter && <div className={`content-modal-footer`}>
                            {(props.renderFooter) ? props.renderFooter() : renderFooter()}
                        </div>}
                        {props.closable && <button aria-label={ariaDetailCloseTopButton} className={`content-modal-close-icon`} onKeyPress={onKeyDownClose} onClick={(props.onClose) ? props.onClose : onCloseDefault}></button>}
                    </div>
                </FocusTrap>
            </div>
        );
    }

    let onEscapePressed = (e : any) => {
        let closeFunc = (props.onClose) ? props.onClose : onCloseDefault;
        if (e.key === "Escape")
            closeFunc();
    }

    let onKeyDownClose = (e : any) => {
        let closeFunc = (props.onClose) ? props.onClose : onCloseDefault;
        if (e.key === " " || e.key === "Enter")
            closeFunc();
    }

    let onCloseDefault = () => {
        setShow(false);

    }

    if (!show)
        return (null);
    return (
        <InBody>
            {renderContent()}
        </InBody>
    )
}
