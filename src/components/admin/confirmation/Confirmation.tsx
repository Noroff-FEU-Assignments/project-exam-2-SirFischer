import React, {  } from 'react'
import { Modal } from '../../modal/Modal'

interface IConfirmationProps {
	show: boolean,
	hotelName: string,
	onConfirm: () => void,
	onCancel: () => void
}

export default function Confirmation({...props}: IConfirmationProps): JSX.Element {
	return (
		<Modal
			id="hotel-deletion-confirmation"
			show={props.show}
			title={`Deleting ${props.hotelName}`}
			variant="confirmation"
			onConfirm={props.onConfirm}
			onClose={props.onCancel}
			confirmText="Delete"
			cancelText="Cancel"
		>
			<h2>Are you sure?</h2>
			<p>This action cannot be undone.</p>
		</Modal>
	)
}
