import React, { } from 'react'
import { Container, Tab, Row, Col, Nav } from 'react-bootstrap'
import Button from '../../components/button/Button';
import { Disconnect } from '../../controllers/user/User';

import './admin.scss';
import Contacts from './Contacts/Contacts';
import Hotels from './Hotels/Hotels';

interface IAdminProps {

}

export default function Admin({ ...props }: IAdminProps): JSX.Element {
	return (
		<Container className="admin">
			<h1>Admin</h1>
			<div className="admin-tabs">
				<Tab.Container defaultActiveKey="Hotels">
					<Row>
						<Col sm={3} className="admin-tabs-nav">
							<Nav variant="pills" className="flex-column">
								<Nav.Item>
									<Nav.Link eventKey="hotels">Hotels</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey="contact">Contact Forms</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey="hotelContact">Hotel Inquires</Nav.Link>
								</Nav.Item>
								<Nav.Item className="admin-tabs-disconnect">
									<Button text="Logg ut" onClick={() => {Disconnect()}} />
								</Nav.Item>
							</Nav>
						</Col>
						<Col sm={9} className="admin-tabs-container">
							<Tab.Content>
								<Tab.Pane eventKey="hotels">
									<Hotels/>
								</Tab.Pane>
								<Tab.Pane eventKey="contact">
									<Contacts/>
								</Tab.Pane>
								<Tab.Pane eventKey="hotelContact">
									<Contacts hotel/>
								</Tab.Pane>
							</Tab.Content>
						</Col>
					</Row>
				</Tab.Container>
			</div>
		</Container>
	)
}
