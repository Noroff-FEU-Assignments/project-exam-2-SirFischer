import React, { } from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './footer.scss';

interface IFooterProps {
	
}

export default function Footer({...props}: IFooterProps): JSX.Element {
	return (
		<footer>
			<Container>
				<Row className="justify-content-center">
					<Col md={4} xs={12}>
						<p className="footer-link" >Linker</p>
						<ul className="footer-list">
							<li><Link to="/">Hjem</Link></li>
							<li><Link to="/browse">Let etter hotel</Link></li>
							<li><Link to="/login">Administrasjon Login</Link></li>
						</ul>
					</Col>
					<Col md={4} xs={12}>
						<p className="footer-link" >Kontakt informasjon</p>
						<div className="footer-contact-info">
							<p>Copyright holidaze 2021</p>
							<p>Marek Fischer</p>
							<p>tel: 92068938</p>
						</div>
					</Col>
					<Col md={4} xs={12}>
						<p className="footer-link" >Sosialemedier</p>
						<Image src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.andyhooke.co.uk%2Fwp-content%2Fuploads%2F2018%2F02%2FScreen-Shot-2018-02-21-at-15.png&f=1&nofb=1" />
					</Col>
				</Row>
			</Container>
		</footer>
	)
}
