import React, { useState, useEffect, useContext } from 'react'
import { Accordion } from 'react-bootstrap'
import HotelEditor from '../../../components/admin/HotelEditor';
import Button from '../../../components/button/Button';
import { createHotel } from '../../../controllers/hotel/Hotel';
import { GetAllHotels } from '../../../controllers/search/Search';
import { IHotelModel } from '../../../models/hotel/Hotel.model';
import { userContext } from '../../../models/user/UserContext';

import './hotels.scss';

interface IHotelsProps {
	
}

export default function Hotels({...props}: IHotelsProps): JSX.Element {
	const context = useContext(userContext);

	const [hotels, setHotels] = useState<IHotelModel[]>([]);

	const onHotelCreate = () => {
		let newHotel : IHotelModel = {
			id: -1,
			Title: "New hotel",
			Excerpt: "New hotel excerpt",
			Content: "Content",
			CoverUrl: "",
			StartingPrice: 0,
			Location: "",
		};
		createHotel(newHotel, context.user.jwt).then(() => {
			GetAllHotels().then((hotels) => {
				setHotels(hotels);
			});
		})
	};

	useEffect(() => {
		let results = GetAllHotels();
		results.then((data : IHotelModel[]) => {
				setHotels(data);
			}
		);
	}, [hotels.length])

	let hotelList = hotels.map((hotel: IHotelModel, index) => {
		return (
			<Accordion.Item eventKey={`${index}`} key={hotel.Title + "_" + hotel.id}>
				<Accordion.Header>{hotel.Title}</Accordion.Header>
				<Accordion.Body>
					<HotelEditor data={hotel} />
				</Accordion.Body>
			</Accordion.Item>
		)
	});

	return (
		<div className="admin-hotel-editor" >
			<div className="admin-hotel-editor-create-btn" >
				<Button text="Nytt hotell" onClick={onHotelCreate}/>
			</div>
			<Accordion>
				{hotelList}
			</Accordion>
		</div>
	)
}
