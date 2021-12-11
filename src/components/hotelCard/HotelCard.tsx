import React, { ReactElement } from 'react'
import { Card } from 'react-bootstrap';
import { IHotelModel } from '../../models/hotel/Hotel.model';

import './hotelCard.scss';

interface IHotelCardProps {
	data: IHotelModel,
}

export default function HotelCard({data, ...props}: IHotelCardProps): ReactElement {
	return (
		
		<Card className="hotel-card" key={data.id} >
			<a href={`/hotel/${data.id}`}>
				<Card.Img className="hotel-card_image" variant="top" src={data.CoverUrl}  />
				<Card.Body>
					<Card.Title>{data.Title}</Card.Title>
					<Card.Text>
						<span className="hotel-card_excerpt">{data.Excerpt}</span>
						<span className="hotel-card_location text-muted"><i className="fas fa-map-marker-alt"></i>{data.Location}</span>
						<span className="hotel-card_price text-muted">fra {data.StartingPrice} nok</span>
					</Card.Text>
				</Card.Body>
			</a>
		</Card>
		
	)
}
