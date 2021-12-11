import React, { ReactElement } from 'react'
import { Pagination as PaginationType } from 'react-bootstrap';

import './pagination.scss';

interface IPaginationProps {
	page: number;
	totalPages: number;
	onChange: (page: number) => void;
}

export default function Pagination({...props}: IPaginationProps): ReactElement {
	let items = [];
	for (let i = 0; i < props.totalPages; i++) {
		items.push(
			<PaginationType.Item key={i} active={i === props.page} onClick={() => props.onChange(i)}>
				{i + 1}
			</PaginationType.Item>
		);
	}
	return (
		<PaginationType className="pagination" >{items}</PaginationType>
	)
}
