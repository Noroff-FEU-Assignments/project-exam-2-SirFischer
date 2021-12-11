import { apiUrl } from "../../variables";
import { IHotelModel } from "../../models/hotel/Hotel.model";

export const GetSuggestions = async (query: string): Promise<any[]> => {
	let response = await fetch(`${apiUrl}/hotels?Title_contains=${query}`);
	let json = await response.json();
	let result = json.map((item: IHotelModel) => {
		return ({
			text: item.Title,
		})
	})
	return (result);
}

export const GetSearch = async (query: string, page: number, pageSize: number): Promise<IHotelModel[]> => {
	let response = await fetch(`${apiUrl}/hotels?Title_contains=${query}&_start=${page * pageSize}&_limit=${pageSize}`);
	let json = await response.json();
	return (json);
}

export const GetHotelCount = async (query: string): Promise<number> => {
	let response = await fetch(`${apiUrl}/hotels/count?Title_contains=${query}`);
	let json = await response.json();
	return (json);
}

export const GetAllHotels = async (): Promise<IHotelModel[]> => {
	let response = await fetch(`${apiUrl}/hotels`);
	let json = await response.json();
	return (json);
}

export const GetNHotelsByPrice = async (n: number): Promise<IHotelModel[]> => {
	let response = await fetch(`${apiUrl}/hotels?_sort=StartingPrice:ASC&_limit=${n}`);
	let json = await response.json();
	return (json);
}

export const SearchRedirect = (query: string) : void => {
	window.location.href = `/browse?search=${query}`;
}