import { IMessageModel } from "../../models/messages/Message.model";
import { apiUrl } from "../../variables";

export async function sendMessage(message: IMessageModel)
{
	return await fetch(`${apiUrl}/messages`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(message)
	});
}

export async function getMessages(token: string)
{
	return await fetch(`${apiUrl}/messages?HotelID=-1`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`
		}
	});
}

export async function getHotelMessages(token: string, hotelId: number)
{
	return await fetch(`${apiUrl}/messages?HotelID=${hotelId}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`
		}
	});
}

export async function setMessageProcessed(messageId: string, token: string, processed: boolean)
{
	return await fetch(`${apiUrl}/messages/${messageId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`
		},
		body: JSON.stringify({
			Processed: processed
		})
	});
}