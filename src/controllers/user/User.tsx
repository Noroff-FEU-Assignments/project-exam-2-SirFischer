import { IUserData, IUserLogin } from "../../models/user/User";
import { apiUrl, localStoragePrefix } from "../../variables";


export function GetUser() : IUserData | null
{
	const user = localStorage.getItem(`${localStoragePrefix}-user`);
	if (user)
	{
		return (JSON.parse(user));
	}
	return (null);
}

export function Disconnect()
{
	localStorage.removeItem(`${localStoragePrefix}-user`);
	window.location.href = '/';
}

export async function Authenticate(user: IUserLogin) {
	let options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			identifier: user.email,
			password: user.password,
		}),
	}
	let response = await fetch(`${apiUrl}/auth/local`, options);
	let json = await response.json();
	
	if (json.error)
	{
		return (null);
	}
	else
	{
		let userData : IUserData = {
			jwt: json.jwt,
			email: json.user.email,
			id: json.user.id,
			name: json.user.name,
		}
		localStorage.setItem(`${localStoragePrefix}-user`, JSON.stringify(userData));
		return (userData);
	}
}