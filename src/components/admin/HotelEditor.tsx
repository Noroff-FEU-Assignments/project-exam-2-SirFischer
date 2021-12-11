import React, { useState, useContext, useRef } from 'react'
import { Col, Form, Row, Button } from 'react-bootstrap'
import { updateHotel, deleteHotel } from '../../controllers/hotel/Hotel';
import { IHotelModel } from '../../models/hotel/Hotel.model';
import { userContext } from '../../models/user/UserContext';
import Confirmation from './confirmation/Confirmation';
import { Editor } from '@tinymce/tinymce-react';

import './hotelEditor.scss';

interface IHotelEditorProps {
	data: IHotelModel
}

export default function HotelEditor({...props}: IHotelEditorProps): JSX.Element {

	const context = useContext(userContext);
	const editorRef = useRef<any>(null);

	const [title, setTitle] = useState(props.data.Title);
	const [excerpt, setExcerpt] = useState(props.data.Excerpt);
	const [startingPrice, setStartingPrice] = useState(props.data.StartingPrice);
	const [cover, setCover] = useState(props.data.CoverUrl);
	const [location, setLocation] = useState(props.data.Location);

	const [showConfirmation, setShowConfirmation] = useState(false);



	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const hotel: IHotelModel = {
			id: props.data.id,
			Title: title,
			Excerpt: excerpt,
			StartingPrice: startingPrice,
			CoverUrl: cover,
			Location: location,
			Content: editorRef?.current.getContent() ?? props.data.Content,
		}
		updateHotel(hotel, context.user.jwt).then(() => {
			alert('Hotel updated');
		});
	}

	const onDelete = () => {
		if (!props.data.id)
			return;
		deleteHotel(props.data.id, context.user.jwt).then(() => {
			window.location.href = '/admin';
		});
	}

	return (
		<>
			<Form onSubmit={onSubmit}>
				<Form.Group as={Row} controlId={`${props.data.id}-hotelTitle`} className="mb-3">
					<Form.Label column sm={2} >Title</Form.Label>
					<Col sm={{ span: 10 }}>
						<Form.Control type="text" placeholder="Title" defaultValue={props.data.Title} onChange={(e) => {setTitle(e.target.value);}} />
					</Col>
				</Form.Group>
				<Form.Group as={Row} controlId={`${props.data.id}-hotelExcerpt`} className="mb-3">
					<Form.Label column sm={2} >Excerpt</Form.Label>
					<Col sm={{ span: 10 }}>
						<Form.Control type="text" placeholder="Excerpt" defaultValue={props.data.Excerpt} onChange={(e) => {setExcerpt(e.target.value);}} />
					</Col>
				</Form.Group>
				<Form.Group as={Row} controlId={`${props.data.id}-hotelImageUrl`} className="mb-3">
					<Form.Label column sm={2} >Cover URL</Form.Label>
					<Col sm={{ span: 10 }}>
						<Form.Control type="text" placeholder="Image URL" defaultValue={props.data.CoverUrl} onChange={(e) => {setCover(e.target.value);}} />
					</Col>
				</Form.Group>
				<Row>
					<Col sm={{ span: 6 }}>
						<Form.Group as={Row} controlId={`${props.data.id}-hotelStartingPrice`} className="mb-3">
							<Form.Label column sm={4} >Starting Price</Form.Label>
							<Col sm={{span: 8}}>
								<Form.Control type="number" defaultValue={props.data.StartingPrice} onChange={(e) => {setStartingPrice(Number(e.target.value));}} />
							</Col>
						</Form.Group>
					</Col>
					<Col sm={{ span: 6 }}>
						<Form.Group as={Row} controlId={`${props.data.id}-hotelLocation`} className="mb-3">
							<Form.Label column sm={4} >Location</Form.Label>
							<Col sm={{span: 8}}>
								<Form.Control type="text" defaultValue={props.data.Location} onChange={(e) => {setLocation(e.target.value);}} />
							</Col>
						</Form.Group>
					</Col>
				</Row>
				<Row className="admin-editor-content-editor">
					<Editor
						onInit={(evt, editor) => editorRef.current = editor}
						initialValue={props.data.Content}
						apiKey="5xdf9eo84yuvrqb4vyqvn2cis8912fsd4donxrobk4wj6rrx"
						init={{
						height: 500,
						menubar: false,
						plugins: [
							'advlist autolink lists link image charmap print preview anchor',
							'searchreplace visualblocks code fullscreen',
							'insertdatetime media table paste code help wordcount'
						],
						toolbar: 'undo redo | formatselect | ' +
						'bold italic backcolor | alignleft aligncenter ' +
						'alignright alignjustify | bullist numlist outdent indent | ' +
						'removeformat | help',
						content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
						}}
					/>
				</Row>
				<Form.Group as={Row} className="mb-3">
					<Col sm={{ span: 12}}>
						<Button type="submit" className="hotel-editor_save" >Save</Button>
						<Button type="button" className="hotel-editor_delete" onClick={() => {setShowConfirmation(true)}} >Slett</Button>
					</Col>
				</Form.Group>
			</Form>
			<Confirmation show={showConfirmation} hotelName={props.data.Title} onConfirm={onDelete} onCancel={() => {setShowConfirmation(false)}} />
		</>
	)
}
