import React, { useEffect, useState } from 'react'
import { Col } from 'react-bootstrap';
import { GetNHotelsByPrice } from '../../controllers/search/Search';
import { IHotelModel } from '../../models/hotel/Hotel.model'
import HotelCard from '../hotelCard/HotelCard';

import './collection.scss';

interface ICollectionProps {

}

export function Collection({...props}: ICollectionProps): JSX.Element {

	const [hotels, setHotels] = useState<IHotelModel[]>([]);

	useEffect(() => {
		GetNHotelsByPrice(4).then(res => {
			setHotels(res);
		})
	}, [hotels.length]);

	const classNames = ['collection'];

	return (
		<div className={classNames.join(' ')}>
			<span className="collection-title">Billigste i byen</span>
			<div className="collection-container">
				{hotels.map((hotel: IHotelModel) => {
					return (
						<Col key={hotel.id} xs={12} sm={6} md={6} lg={4} xl={3} >
							<HotelCard data={hotel} />
						</Col>
					)
				})}
			</div>
		</div>
	)
}
