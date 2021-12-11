import React, { useState, useEffect } from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import ContactButton from '../../components/contactForm/ContactButton'
import { useParams } from 'react-router-dom';
import { IHotelModel } from '../../models/hotel/Hotel.model';
import { getHotel } from '../../controllers/hotel/Hotel';

import './hotel.scss';

interface IHotelProps {
	
}

export function Hotel({...props}: IHotelProps): JSX.Element {
	const [hotel, setHotel] = useState<IHotelModel | undefined>(undefined);
	const { id } = useParams();


	useEffect(() => {
		getHotel(id ?? "0").then(res => {
			return (res.json());
		}).then(res => {
			setHotel(res);
		});
	}, [hotel, id]);

	return (
		<Container className="hotel-page">
			<Row>
				<Col md={8} xs={12} className="hotel-image">
					<Image src={hotel?.CoverUrl} />
				</Col>
				<Col md={4} xs={12}>
					<Container className="hotel-description">
						<div className="hotel-title" >
							<h2>{hotel?.Title}</h2>
						</div>
						<p>{hotel?.Excerpt}</p>
						<Row>
							<Col sm={1}> <span><i className="fas fa-money-bill"></i> </span></Col>
							<Col sm={11}>{hotel?.StartingPrice} nok</Col>
						</Row>
						<Row>
							<Col sm={1}> <span><i className="fas fa-map-marker-alt"></i> </span></Col>
							<Col sm={11}>{hotel?.Location}</Col>
						</Row>
						<Row className="hotel-description-map" >
							<iframe src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyD3iSV4drDu0_N3a3kEIri1ZEy7ODs59GU&q=${hotel?.Location}`} width="600" height="450" allowFullScreen loading="lazy" />
						</Row>
					</Container>
				</Col>
			</Row>
			<Row className="hotel-content-container">
				<div dangerouslySetInnerHTML={{ __html: hotel?.Content ?? "" }} ></div>
			</Row>
			<ContactButton hotelID={id} hotelName={hotel?.Title} />
		</Container>
	)
}
