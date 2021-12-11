import React, { useState } from 'react';
import { Header } from './components/header/Header';
import Footer from './components/footer/Footer';

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Home } from './pages/home/Home';
import { Hotel } from './pages/hotel/Hotel';
import { Browse } from './pages/browse/Browse';

import "./app.scss";
import { Login } from './pages/login/Login';
import { IUserData } from './models/user/User';

import { userContext } from './models/user/UserContext';
import { GetUser } from './controllers/user/User';
import Admin from './pages/admin/Admin';


function App() {
	const [user, setUser] = useState<IUserData | null>(GetUser());
	return (
		<div className="App">
			<userContext.Provider value={{user, setUser}}>
				<BrowserRouter>
					<div className="Container">
						<Header />
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/browse" element={<Browse />} />
							<Route path="/hotel/:id" element={<Hotel />} />
							<Route path="/login" element={<Login />} />
							<Route path="/admin" element={<Admin/>} />
						</Routes>
					</div>
					<Footer />
				</BrowserRouter>
			</userContext.Provider>
		</div>
	);
}

export default App;
