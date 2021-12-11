import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap';
import HotelCard from '../../components/hotelCard/HotelCard';
import Pagination from '../../components/pagination/Pagination';
import { GetHotelCount, GetSearch } from '../../controllers/search/Search';

import { IHotelModel } from '../../models/hotel/Hotel.model';

import './browse.scss';

interface Props {
	
}

export function Browse({...props}: Props): JSX.Element {
	const [results, setResults] = useState<IHotelModel[]>([]);
	const [count, setCount] = useState<number>(1);
	const [pageNumber, setPageNumber] = useState<number>(0);

	const url = window.location.search;
	const params = new URLSearchParams(url);
	const query : string = ((params.get('search')) ? params.get('search') : '') as string;

	const renderBrowse = () => {
		let result = results.map((hotel: IHotelModel) => {
			return (
				<HotelCard key={hotel.id} data={hotel} />
			);
		});
		return (result);
	}

	useEffect(() => {
		GetHotelCount(query).then((count: number) => {
			setCount(count / 10);
		});
		GetSearch(query, pageNumber, 10).then(res => {
			setResults(res);
		});
	}, [results.length, count, pageNumber, query]);
	return (
		<Container className="browse-page">
			<Row>
				<h2>Finn et hotel i Bergen</h2>
			</Row>
			{params.get('search') &&
			<Row>
				<p>Søk: {query}</p>
			</Row>}
			<Row className="justify-content-center">
				{renderBrowse()}
			</Row>
			<Row className="justify-content-center">
				<Pagination page={pageNumber} totalPages={count} onChange={(page: number) => {setPageNumber(page);}} />
			</Row>
		</Container>
	)
}
