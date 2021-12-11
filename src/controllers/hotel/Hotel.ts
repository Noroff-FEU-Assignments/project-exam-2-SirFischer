import { IHotelModel } from "../../models/hotel/Hotel.model";
import { apiUrl } from "../../variables";

export async function updateHotel(hotel: IHotelModel, token: string)
{
	return await fetch(`${apiUrl}/hotels/${hotel.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`
		},
		body: JSON.stringify(hotel)
	});
}

export async function getHotel(id: string)
{
	return await fetch(`${apiUrl}/hotels/${id}`);
}

export async function createHotel(hotel: IHotelModel, token: string)
{
	return await fetch(`${apiUrl}/hotels`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`
		},
		body: JSON.stringify(hotel)
	});
}

export async function deleteHotel(id: number, token: string)
{
	return await fetch(`${apiUrl}/hotels/${id}`, {
		method: "DELETE",
		headers: {
			"Authorization": `Bearer ${token}`
		}
	});
}