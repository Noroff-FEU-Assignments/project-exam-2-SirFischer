import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import { IMessageModel } from '../../models/messages/Message.model';
import Button from '../button/Button';
import { Modal } from '../modal/Modal';


import './contactButton.scss'

interface IContactModalProps {
	show: boolean,
	onClose: () => void,
	onSend: (data: IMessageModel) => void,
	isHotel: boolean,
	hotelID?: string,
	hotelName?: string,
}

export default function ContactModal({...props}: IContactModalProps): JSX.Element {

	const [message, setMessage] = useState('');
	const [mail, setMail] = useState('');

	return (
		<Modal
			id="generic_contact"
			title={props.isHotel ? `Et Spørsmål til ${props.hotelName}?`  : "Lurer du på noe?"}
			show={props.show}
			onClose={props.onClose}
			variant="confirmation"
			size="small"
			closable
			hideFooter
		>
			<Form onSubmit={(e : any) => {e.preventDefault(); props.onSend({
				id: '',
				HotelID: props.hotelID,
				Content: message,
				Mail: mail,
			})}} >
				<Form.Group className="mb-3" controlId="messageContent">
					<Form.Label>Melding</Form.Label>
					<Form.Control as="textarea" rows={3} value={message} onChange={(e : any) => {setMessage(e.target.value)}} required />
				</Form.Group>
				<Form.Group className="mb-3" controlId="mailForm">
					<Form.Label>E-post</Form.Label>
					<Form.Control type="email" placeholder="name@example.com" value={mail}  onChange={(e : any) => {setMail(e.target.value)}} required/>
				</Form.Group>
				<Form.Group className="content-modal-footer" >
						<Button className="content-modal-default-button-confirm" status="primary" text="Send" size="full" type="submit" aria-label="Send knapp" />
						<Button className={`content-modal-default-button-close`} status="secondary" text="Avbryt" size="full" onClick={props.onClose} aria-label="Avbryt Knapp" />
				</Form.Group>
			</Form>
		</Modal>
	)
}
