import React, { useState } from 'react'
import { Container, Form, Row, Button, Alert } from 'react-bootstrap';
import { Authenticate } from '../../controllers/user/User';

import './login.scss';

interface ILoginProps {

}

export function Login({ ...props }: ILoginProps): JSX.Element {
	const [mail, setMail] = useState('');
	const [password, setPassword] = useState('');
	const [loginFeedback, setLoginFeedback] = useState('');
	const [loginStatus, setLoginStatus] = useState<'success' | 'danger'>('danger');

	const login = (event : any) => {
		event.preventDefault();
		let result = Authenticate({email: mail, password: password})
		result.then((data) => {
			if (data !== null) {
				setLoginFeedback('Du er nå logget inn!');
				setLoginStatus('success');
				setTimeout( () => {window.location.href = '/'}, 1000);
			}
			else {
				setLoginFeedback('E-post eller passord er feil!');
				setLoginStatus('danger');
			}
		}).catch((error : any) => {
			setLoginFeedback(error);
			setLoginStatus('danger');
		})
	}

	return (
		<Container>
			<Row className="justify-content-md-center">
				<Form onSubmit={login}>
					<Form.Group controlId="LoginEmail" >
						<Form.Label>E-post</Form.Label>
						<Form.Control 
							className="login_email-input"
							type="email"
							value={mail}
							placeholder="Enter email"
							onChange={(event) => {setMail(event.target.value);}}
						/>
					</Form.Group>
					<Form.Group controlId="LoginPassword">
						<Form.Label>Passord</Form.Label>
						<Form.Control
							className="login_password-input"
							type="password"
							value={password}
							placeholder="Password"
							onChange={(event) => {setPassword(event.target.value);}}
						/>
					</Form.Group>
					{loginFeedback !== '' &&
					<Alert variant={loginStatus} className="login-status">
						<Alert.Heading>{loginFeedback}</Alert.Heading>
					</Alert>}
					<Button variant="primary" type="submit" className="login-button">
						Logg inn
					</Button>
				</Form>
			</Row>
		</Container>
	)
}
