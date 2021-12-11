import React, { useEffect, useState, useContext } from 'react'
import { Col, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import { getMessages, getHotelMessages, setMessageProcessed } from '../../../controllers/contact/Contact'
import { GetAllHotels } from '../../../controllers/search/Search';
import { IHotelModel } from '../../../models/hotel/Hotel.model';
import { IMessageModel } from '../../../models/messages/Message.model'
import { userContext } from '../../../models/user/UserContext';

import './contacts.scss';


interface IContactsProps {
	hotel?: boolean;
}

export default function Contacts({...props}: IContactsProps): JSX.Element {
	const context = useContext(userContext);
	const [contacts, setContacts] = useState<IMessageModel[]>([]);
	const [hotels, setHotels] = useState<IHotelModel[]>([]);
	const [hotelID, setHotelID] = useState<number>(0);

	useEffect(() => {
		if (props.hotel) {
			GetAllHotels().then((hotels) => {
				setHotels(hotels);
				setHotelID(hotels[0].id);
			});
		}
	}, [hotels.length, props.hotel]);

	useEffect(() => {
		let response = (!props.hotel) ? getMessages(context.user.jwt) : getHotelMessages(context.user.jwt, hotelID);
		response.then(res => {
			return (res.json());
		}).then((data: IMessageModel[]) => {
			setContacts(data);
		}).catch(err => {
			console.error(err);
		})
	}, [contacts.length, context.user.jwt, hotelID, hotels.length, props.hotel]);

	return (
		<div className="admin-contacts" >
			{props.hotel &&
				<div className="admin-contacts-header">
					<DropdownButton id="hotel-dropdown" title={hotels.find((hotel) => {return(hotel.id === hotelID)})?.Title ?? 'Loading...'}>
						{hotels.map((hotel: IHotelModel) => {
							return (
								<Dropdown.Item key={hotel.id} onClick={() => setHotelID(hotel.id)}>{hotel.Title}</Dropdown.Item>
							);
						})}
					</DropdownButton>
				</div>
			}
			<div className="admin-contacts-body">
				{
					contacts.map((contact: IMessageModel) => {
						return (
							<Row className="admin-contacts__item" key={contact.id}>
								<Col md="10" sm="12" >
									<div className="admin-contacts__item-email">
										<span>Mail: </span>
										<a href={`mailto:${contact.Mail}`}>{contact.Mail}</a>
									</div>
									<div className="admin-contacts__item-message">{contact.Content}</div>
								</Col>
								<Col md="2" sm="12" className="admin_contacts_second-col" >
									<div className="admin-contacts__is-processed">
										<span>Processed: </span>
										<Form.Check 
											type="checkbox"
											defaultChecked={contact.Processed}
											onChange={() => {
												setMessageProcessed(contact.id, context.user.jwt, !contact.Processed);
												contact.Processed = !contact.Processed;
											}}
										/> 
									</div>
									<div className="admin-contacts__item-date">{contact.created_at?.slice(0, 10).replaceAll('-', '/')}</div>
								</Col>
							</Row>
						)
					})
				}
			</div>
		</div>
	)
}
