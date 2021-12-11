import { useState } from 'react'
import { sendMessage } from '../../controllers/contact/Contact';
import { IMessageModel } from '../../models/messages/Message.model';
import { InBody } from '../../utils/renderInBody'
import Button from '../button/Button'
import { Modal } from '../modal/Modal';

import './contactButton.scss'
import ContactModal from './ContactModal';

interface IContactButtonProps {
	hotelID?: string,
	hotelName?: string,
}

export default function ContactButton({...props}: IContactButtonProps): JSX.Element {

	const [showContactForm, setShowContactForm] = useState(false);
	const [showHotelContactForm, setShowHotelContactForm] = useState(false);
	const [showFeedback, setShowFeedback] = useState(false);

	const handleSend = (data : IMessageModel) => {
		sendMessage(data).then((data) => {
			if(data.status === 200) {
				setShowFeedback(true);
				setShowContactForm(false);
				setShowHotelContactForm(false);
			}
			else {
				alert('Something went wrong. Please try again later.');
			}
		})
		setShowContactForm(false);
		setShowHotelContactForm(false);
		setShowFeedback(true);
	}

	return (
		<InBody>
			<div className="contact-buttons-container">
				<div className="contact-buttons">
					<Button onClick={() => {setShowContactForm(true);}} >Lurer du på noe?</Button>
					{props.hotelID && <Button onClick={() => {setShowHotelContactForm(true);}} text={"Et spørsmål til " + props.hotelName + "?"}></Button>}
				</div>
			</div>
			<ContactModal
				show={showContactForm}
				onClose={() => {setShowContactForm(false);}}
				isHotel={false}
				onSend={handleSend}
			/>
			<ContactModal
				show={showHotelContactForm}
				onClose={() => {setShowHotelContactForm(false);}}
				isHotel={true}
				hotelID={props.hotelID}
				hotelName={props.hotelName}
				onSend={handleSend}
			/>
			<Modal
				id="feedback-modal"
				title="Takk for din melding!"
				show={showFeedback}
				size="small"
				variant="alert"
				closable
				onClose={() => {setShowFeedback(false);}}
			>
				<p>Melding sendt.</p>
				<p>Mange takk!</p>
			</Modal>
		</InBody>
	)
}
